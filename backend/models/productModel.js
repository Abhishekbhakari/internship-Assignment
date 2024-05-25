const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    dateOfSale: Date,
    // Add other relevant fields if needed
});

module.exports = mongoose.model('Product', productSchema);
