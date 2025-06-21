const express = require('express');
const app = express(); // Corrected
const cors = require('cors');

app.use(cors());
app.use(express.json());

const sampleModel = require('./models/ProductData');

app.get('/', (req, res) => {
    res.status(200).send("Welcome to root URL of Server");
});

// GET
app.get('/getproduct', async (req, res) => {
    try {
        const products = await sampleModel.find(); // ✅ Gets all products
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST
app.post('/addproduct', async (req, res) => {
    try {
        const data = new sampleModel(req.body);
        await data.save();
        res.status(201).send({ status: "Product is added" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// PUT
app.put('/updateproduct/:id', async (req, res) => {
    try {
        await sampleModel.updateOne({ _id: req.params.id }, req.body);
        res.send({ status: "Product is updated" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// DELETE
app.delete('/deleteproduct/:id', async (req, res) => {
    let id = req.params.id;
    try {
        const result = await sampleModel.deleteOne({ _id: id });
        console.log(result); // Optional: log result

        if (result.deletedCount === 0) {
            return res.status(404).send({ status: "Product not found" });
        }

        res.send({ status: "Product is deleted" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


app.listen(3003, () => {
    console.log("Server is up and running at 3003!!!");
});
