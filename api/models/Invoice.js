const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  // Agrega más campos según tus necesidades
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
