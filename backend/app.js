const express = require('express');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');
const seedRoutes = require('./routes/seedRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api', apiRoutes);
app.use('/api', seedRoutes);

module.exports = app;
