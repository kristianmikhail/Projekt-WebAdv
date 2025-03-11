// const { Client } = require('pg');
// // Configure the client to connect to your containerized PostgreSQL
// const client = new Client({
//     host: 'localhost', // since the container's port is mapped to localhost
//     port: 5432,
//     user: 'postgres', // default user
//     password: '12345', // password set in the container command
//     database: 'postgres', // default database
// });

// async function connectDB() {
//     try {
//         await client.connect();
//         console.log('Connected to PostgreSQL database with async/await');
//     } catch (err) {
//         console.error('Connection error', err.stack);
//     }
// }
// connectDB(); // should be called before any other function

// async function selectRecords() {
//     const selectQuery = 'SELECT * FROM stores;';
//     try {
//         const res = await client.query(selectQuery);
//         console.log('All stores:', res.rows);
//     } catch (err) {
//         console.error('Error selecting records', err.stack);
//     }
// }
// // selectRecords()

// function createTable() {
//     const createTableQuery =
//         `
//         CREATE TABLE IF NOT EXISTS stores (
//         id SERIAL PRIMARY KEY,
//         store_name VARCHAR(100),
//         url VARCHAR(250),
//         district VARCHAR(50)
//         );
//         `;
//     client.query(createTableQuery) // try await would also work with async
//         .then(() => console.log('Table "stores" created or already exists'))
//         .catch(err => console.error('Error creating table', err.stack));
// }
// // createTable();

// async function insertRecord(insertValues) {
//     const insertQuery = `
//         INSERT INTO stores (store_name, url, district)
//         VALUES ($1, $2, $3)
//         RETURNING *;
//     `;
//     try {
//         const res = await client.query(insertQuery, insertValues);
//         console.log('Inserted record:', res.rows[0]);
//     } catch (err) {
//         console.error('Error inserting record', err.stack);
//     }
// }

// async function dropTable() {
//     const dropTableQuery = 'DROP TABLE IF EXISTS stores;';
//     try {
//         await client.query(dropTableQuery);
//         console.log('Table "stores" dropped successfully.');
//     } catch (err) {
//         console.error('Error dropping table', err.stack);
//     }
// }

// // gamla insert funktion 

// // function insertRecord(insertValues) {
// //     const insertQuery =
// //         `
// //             INSERT INTO stores (store_name, url, district)
// //             VALUES ($1, $2, $3)
// //             RETURNING *;
// //             `;
// //     client.query(insertQuery, insertValues)
// //         .then(res => console.log('Inserted record:', res.rows[0]))
// //         .catch(err => console.error('Error inserting record', err.stack));
// // }

// // const insertValues = ['Nike', 'http/www.nike.se', 'söder'];
// // insertRecord(insertValues);

// async function getIDByDistrict(district) {
//     const selectQuery = 'SELECT id FROM stores WHERE district = $1;';
//     try {
//         const res = await client.query(selectQuery, [district]);
//         return res.rows[0].id
//     } catch (err) {
//         console.error('Error getting ID', err.stack);
//     }
// }
// // getIDByDistrict('söder').then((id) => {
// //     console.log('ID:', id);
// // })

// function updateRecord(updateValues) {
//     const updateQuery =
//         `
//     UPDATE stores
//     SET store_name = $1, url = $2, district = $3
//     WHERE id = $4
//     RETURNING *;
//     `;
//     client.query(updateQuery, updateValues)
//         .then(res => console.log('Updated record:', res.rows[0]))
//         .catch(err => console.error('Error updating record', err.stack));
// }
// // getIDByDistrict('söder').then((id) => {
// //     console.log('ID:', id);
// //     updateRecord(['adidas', 'http/www.adidas.se', 'norr', id])
// // })

// function deleteRecord(id) {
//     // id is the primary key of the record to delete
//     const deleteQuery = 'DELETE FROM stores WHERE id = $1;';
//     client.query(deleteQuery, [id])
//         .then(() => console.log('Record deleted with then()'))
//         .catch(err => console.error('Error deleting record', err.stack));
// }
// // deleteRecord(2);

// function disconnectDB() {
//     client.end()
//         .then(() => console.log('Disconnected from database with then()'))
//         .catch(err => console.error('Error disconnecting', err.stack));
// }
// // disconnectDB(); // should be called after all other functions

// module.exports = {
//     insertRecord,
//     selectRecords,
//     createTable,
//     getIDByDistrict,
//     updateRecord,
//     deleteRecord,
//     disconnectDB,
//     dropTable
// };
