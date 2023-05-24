const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Obtener todas las facturas de venta
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una nueva factura de venta
router.post('/', async (req, res) => {
  const invoice = new Invoice({
    invoiceNumber: req.body.invoiceNumber,
    customerName: req.body.customerName,
    // Asigna los demás campos según los datos recibidos
  });

  try {
    const newInvoice = await invoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener una factura de venta por su número de factura
router.get('/:invoiceNumber', getInvoiceByInvoiceNumber, (req, res) => {
  res.json(res.invoice);
});

// Middleware para obtener una factura por su número de factura
async function getInvoiceByInvoiceNumber(req, res, next) {
  let invoice;
  try {
    invoice = await Invoice.findOne({ invoiceNumber: req.params.invoiceNumber });
    if (invoice == null) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.invoice = invoice;
  next();
}

// Actualizar una factura de venta por su número de factura
router.patch('/:invoiceNumber', getInvoiceByInvoiceNumber, async (req, res) => {
  if (req.body.customerName != null) {
    res.invoice.customerName = req.body.customerName;
  }
  // Actualiza los demás campos según los datos recibidos

  try {
    const updatedInvoice = await res.invoice.save();
    res.json(updatedInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una factura de venta por su número de factura
router.delete('/:invoiceNumber', getInvoiceByInvoiceNumber, async (req, res) => {
  try {
    await res.invoice.remove();
    res.json({ message: 'Factura eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
