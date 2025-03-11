const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

class StoreModel {
    constructor() {
        this.client = new Client({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: '12345',
            database: 'postgres'
        });

        this.client.connect()
            .then(() => console.log('Connected to PostgreSQL'))
            .catch(err => console.error(' Database connection error:', err.stack));
    }

    //  Drop the stores table
    async dropTable() {
        const query = `DROP TABLE IF EXISTS stores;`;
        try {
            await this.client.query(query);
            console.log('Table "stores" dropped successfully.');
        } catch (err) {
            console.error('Error dropping table:', err.stack);
        }
    }

    // Create the stores table
    async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS stores (
                id SERIAL PRIMARY KEY,
                store_name VARCHAR(100),
                url VARCHAR(250),
                district VARCHAR(50)
            );
        `;
        try {
            await this.client.query(query);
            console.log('Table "stores" created or already exists.');
        } catch (err) {
            console.error('Error creating table:', err.stack);
        }
    }

    // Insert stores from stores.json
    async insertStoresFromJSON() {
        const filePath = path.join(__dirname, 'stores.json');

        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const stores = JSON.parse(data);

            if (!Array.isArray(stores)) {
                throw new Error('Parsed JSON is not an array.');
            }

            for (const store of stores) {
                if (store.name) {
                    const query = `INSERT INTO stores (store_name, url, district) VALUES ($1, $2, $3) RETURNING *;`;
                    const values = [
                        store.name,
                        store.url || null,  // Handle missing URLs
                        store.district || null // Handle missing districts
                    ];
                    await this.client.query(query, values);
                }
            }
            console.log('All stores inserted successfully.');
        } catch (err) {
            console.error('Error inserting stores from JSON:', err);
        }
    }

    //  Get all stores
    async getAllStores(query = 'SELECT * FROM stores') {
        try {
            const res = await this.client.query(query);
            return res.rows;
        } catch (err) {
            console.error(' Error fetching stores:', err.stack);
            throw err;
        }
    }

    // Insert a new store
    async insertStore(name, url, district) {
        const query = 'INSERT INTO stores (store_name, url, district) VALUES ($1, $2, $3) RETURNING *;';
        try {
            const res = await this.client.query(query, [name, url, district]);
            return res.rows[0];
        } catch (err) {
            console.error('Error inserting store:', err.stack);
            throw err;
        }
    }

    // Update store
    async updateStore(id, name, url, district) {
        const query = `UPDATE stores SET store_name = $1, url = $2, district = $3 WHERE id = $4 RETURNING *;`;
        try {
            const res = await this.client.query(query, [name, url, district, id]);
            return res.rows[0];
        } catch (err) {
            console.error('Error updating store:', err.stack);
            throw err;
        }
    }

    // Delete store
    async deleteStore(id) {
        const query = `DELETE FROM stores WHERE id = $1;`;
        try {
            await this.client.query(query, [id]);
            console.log(' Store deleted:', id);
        } catch (err) {
            console.error(' Error deleting store:', err.stack);
            throw err;
        }
    }

    // Close the database connection
    async closeConnection() {
        await this.client.end();
        console.log('Database connection closed');
    }
}

module.exports = new StoreModel();
