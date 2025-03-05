const { Client } = require('pg');
const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const storeDB = require('./store-db'); // impoterat hela filen

// Läs in JSON-filen och parsar datan
function insertStoresFromJSON() {
    const filePath = path.join(__dirname, 'stores.json');

    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading stores.json:', err);
            return;
        }

        try {
            const stores = JSON.parse(data); // Parse JSON into an array

            if (!Array.isArray(stores)) {
                throw new Error('Parsed JSON is not an array.');
            }

            for (const store of stores) {
                if (store.name) {
                    const insertValues = [
                        store.name,
                        store.url || null, // Handle missing URLs
                        store.district || null // Handle missing districts
                    ];
                    await storeDB.insertRecord(insertValues);
                } else {
                    console.warn('Skipping store due to missing name:', store);
                }
            }
            console.log('All stores inserted successfully.');
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });
}



storeDB.dropTable();
storeDB.createTable();
// Kör funktionen för att lägga in butiker från stores.json
insertStoresFromJSON();

app.get('/all', async (req, res) => {
    try {
        const dbres = await client.query('SELECT * FROM stores;');
        console.log('All stores:', dbres.rows);
        res.json(dbres.rows);
    } catch (err) {
        console.error('Error selecting records', err.stack);
    }
});

app.use('/', express.static('public'));

// Configure the client to connect to your containerized PostgreSQL
const client = new Client({
    host: 'localhost', port: 5432,
    user: 'postgres', password: '12345'
});
// Connect to the database and start the server listening on port 3000
const startServer = async () => {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database ');
    } catch (err) {
        console.error('Connection error', err.stack);
    }
    app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
    });
}
startServer();

