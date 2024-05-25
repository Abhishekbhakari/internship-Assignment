const axios = require('axios');
const Product = require('../models/productModel');

exports.initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        console.log(response.data); // Log the response data
        await Product.deleteMany({});
        await Product.insertMany(response.data);
        res.status(200).send('Database initialized successfully');
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).send('Error initializing database');
    }
};
