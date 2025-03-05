const { Client } = require('pg');
const express = require('express');
const app = express();

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

