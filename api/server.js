const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const invoicesRouter = require('./routes/invoices');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
mongoose.connect('mongodb+srv://cesar:cesar@cluster0.wtlfm.mongodb.net/invoice-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Rutas
app.use('/invoices', invoicesRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocurrió un error en el servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
