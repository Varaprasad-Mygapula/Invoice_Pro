// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 5000;

// const cors = require('cors');

// app.use(cors()); // Enable CORS for all routes

// // ...rest of your server setup
// app.use(bodyParser.json({ limit: '50mb' }));
// // MongoDB connection
// mongoose.connect('mongodb+srv://varaprasad:9ikphhpxTi8ZtJ8l@cluster0.ka5xp3a.mongodb.net/Cluster0?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const invoiceSchema = new mongoose.Schema({
//   billFrom: {
//     name: String,
//     email: String,
//     address: String,
//   },
//   billTo: {
//     name: String,
//     email: String,
//     address: String,
//   },
//   invoiceNumber: Number,
//   dateOfIssue: String,
//   items: [
//     {
//       name: String,
//       description: String,
//       price: Number,
//       quantity: Number,
//     },
//   ],
//   notes: String,
//   currency: String,
//   subTotal: Number,
//   taxRate: Number,
//   taxAmount: Number,
//   discountRate: Number,
//   discountAmount: Number,
//   total: Number,
//   // You can add more fields as needed
// });

// const Invoice = mongoose.model('Invoice', invoiceSchema);

// app.use(bodyParser.json());

// // Define a route to handle saving the invoice data
// app.post('/invoice', (req, res) => {

//   const invoiceData = req.body.invoiceData;
//   console.log('Received invoice data:', invoiceData) // Access the invoice data correctly
//   const invoice = new Invoice(invoiceData);

//   invoice.save()
//     .then(() => {
//       res.status(200).send('Invoice data saved successfully.');
//     })
//     .catch((error) => {
//       res.status(500).send('Failed to save invoice data: ' + error);
//     });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // Replace with the actual URL of your frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cors());

app.use("/api", (req, res, next) => {
  res.send("FSD AN BATCH");
});
app.use("/prasad", (req, res, next) => {
  res.send("My name is Prasad");
});
app.use("/prav", (req, res, next) => {
  res.send("My name is Praveen");
});

mongoose
  .connect(
    "mongodb+srv://varaprasad:9ikphhpxTi8ZtJ8l@cluster0.ka5xp3a.mongodb.net/Cluster0?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
    console.log("Connected to Database & Listening to localhost 5000");
  })
  .catch((err) => console.log(err));

const invoiceDetailsSchema = new mongoose.Schema({
  billFrom: {
    type: String,
    required: true,
  },
  billFromAddress: {
    type: String,
    required: true,
  },
  billFromEmail: {
    type: String,
    required: true,
  },
  billTo: {
    type: String,
    required: true,
  },
  billToAddress: {
    type: String,
    required: true,
  },
  billToEmail: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  currentDate: String,
  dueDate: {
    type: String,
    required: true,
  },
  discountAmount: {
    type: String,
    required: true,
  },
  discountRate: {
    type: String,
    required: true,
  },
  invoiceNumber: {
    type: Number,
    required: true,
  },
  isOpen: Boolean,
  items: [
    {
      id: Number,
      name: String,
      description: String,
      price: String,
      quantity: Number,
    },
  ],
  notes: String,
  subTotal: {
    type: String,
    required: true,
  },
  taxAmount: {
    type: String,
    required: true,
  },
  taxRate: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
});

const InvoiceDetails = mongoose.model("InvoiceDetails", invoiceDetailsSchema);

const invoiceParser = bodyParser.json();
app.use(bodyParser.json());

app.post("/invoice", invoiceParser, async (req, res) => {
  const invoiceData = req.body;
  console.log("Received invoice data:", invoiceData);
  const invoice = new InvoiceDetails(invoiceData);
  console.log(invoice);

  invoice
    .save()
    .then(() => {
      res.status(200).send("Invoice data saved successfully.");
    })
    .catch((error) => {
      res.status(500).send("Failed to save invoice data: " + error);
    });
});
