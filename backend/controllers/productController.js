const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    dateOfSale: { type: Date, required: true },
    price: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

exports.insertProduct = async (req, res) => {
    const { dateOfSale, price } = req.body;
    const newProduct = new Product({ dateOfSale, price });

    try {
        await newProduct.save();
        res.status(201).send('Product inserted successfully');
    } catch (error) {
        res.status(500).send('Error inserting product');
    }
};

exports.getBarChart = async (req, res) => {
    const { month } = req.query;
    const monthIndex = new Date(`${month} 1, 2021`).getMonth() + 1;

    try {
        const priceRanges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            { range: '201-300', min: 201, max: 300 },
            { range: '301-400', min: 301, max: 400 },
            { range: '401-500', min: 401, max: 500 },
            { range: '501-600', min: 501, max: 600 },
            { range: '601-700', min: 601, max: 700 },
            { range: '701-800', min: 701, max: 800 },
            { range: '801-900', min: 801, max: 900 },
            { range: '901-above', min: 901, max: Infinity }
        ];

        const results = await Promise.all(priceRanges.map(async ({ range, min, max }) => {
            const count = await Product.countDocuments({
                $expr: { $eq: [{ $month: '$dateOfSale' }, monthIndex] },
                price: { $gte: min, $lte: max }
            });
            return { range, count };
        }));

        res.json(results);
    } catch (error) {
        res.status(500).send('Error fetching bar chart data');
    }
};
