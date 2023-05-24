import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [invoices, setInvoices] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://gereraapp.seuz716.repl.co/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createInvoice = async () => {
    try {
      await axios.post('http://gereraapp.seuz716.repl.co/invoices', {
        invoiceNumber: invoiceNumber,
        customerName: customerName,
      });
      setInvoiceNumber('');
      setCustomerName('');
      fetchInvoices();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Invoices</h1>
      <div>
        <h2>Create Invoice</h2>
        <input
          type="text"
          placeholder="Invoice Number"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <button onClick={createInvoice}>Create</button>
      </div>
      <div>
        <h2>All Invoices</h2>
        {invoices.map((invoice) => (
          <div key={invoice._id}>
            <p>Invoice Number: {invoice.invoiceNumber}</p>
            <p>Customer Name: {invoice.customerName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
