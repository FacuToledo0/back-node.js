const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const productosRoutes = require('./routes/productosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);

app.listen(3001, () => console.log('Backend corriendo en http://localhost:3001'));
