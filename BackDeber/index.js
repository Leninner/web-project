const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/clients', require('./routes/client.route'));
app.use('/api/sellers', require('./routes/seller.route'));
app.use('/api/favorites', require('./routes/favorite.routes'));
app.use('/api/offers', require('./routes/offer.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/transactions', require('./routes/transaction.routes'));


const PORT = process.env.PORT || 2500;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
