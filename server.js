const express = require('express');
const storeModel = require('./model');

const app = express();
app.use(express.json()); 
app.use(express.static('public')); // Serve frontend files

// 🔥 Ensure database is set up on server start
(async () => {
    await storeModel.dropTable();  // Drop table (optional)
    await storeModel.createTable(); // Create table
    await storeModel.insertStoresFromJSON(); // Insert stores from JSON
})();

// Root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Serve index.html
});

// Get all stores
app.get('/all', async (req, res) => {
    try {
        let query = 'SELECT * FROM stores';
        const { sort } = req.query;

        if (sort === 'name') {
            query += ' ORDER BY store_name ASC';
        } else if (sort === 'district') {
            query += ' ORDER BY district ASC';
        }

        const stores = await storeModel.getAllStores(query);
        res.json(stores);
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});


// Add a new store (POST request)
app.post('/store', async (req, res) => {
    const { name, url, district } = req.body;
    if (!name) return res.status(400).json({ error: "Store name is required" });

    try {
        const newStore = await storeModel.insertStore(name, url, district);
        res.json(newStore);
    } catch (err) {
        res.status(500).json({ error: 'Failed to insert store' });
    }
});

//  Update an existing store
app.put('/store/:id', async (req, res) => {
    const { id } = req.params;
    const { name, url, district } = req.body;
    if (!name) return res.status(400).json({ error: "Store name is required" });

    try {
        const updatedStore = await storeModel.updateStore(id, name, url, district);
        res.json(updatedStore);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update store' });
    }
});

//  Delete a store
app.delete('/store/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await storeModel.deleteStore(id);
        res.json({ message: 'Store deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete store' });
    }
});


// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
