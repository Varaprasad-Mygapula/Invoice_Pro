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
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://varaprasad:9ikphhpxTi8ZtJ8l@cluster0.ka5xp3a.mongodb.net/Cluster0?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(port);
    console.log("Connected to Database & Listening to localhost 5000");
  })
  .catch((err) => console.log(err));
app.get("/getinvoice", async (req, res, next) => {
  let recorddata;
  try {
    recorddata = await InvoiceDetails.find(); //db.collectionname.find()
  } catch (err) {
    console.log(err);
  }
  if (!recorddata) {
    return res.status(404).json({ message: "No invoice found" });
  }
  return res.status(200).json({ recorddata });
});

const invoiceDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  billFrom: { type: String, required: true },
  billFromAddress: { type: String, required: true },
  billFromEmail: { type: String, required: true },
  billTo: { type: String, required: true },
  billToAddress: { type: String, required: true },
  billToEmail: { type: String, required: true },
  currency: { type: String, required: true },
  currentDate: String,
  dueDate: { type: String, required: true },
  discountAmount: { type: String, required: true },
  discountRate: { type: String, required: true },
  invoiceNumber: { type: Number, required: true },
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
  subTotal: { type: String, required: true },
  taxAmount: { type: String, required: true },
  taxRate: { type: String, required: true },
  total: { type: String, required: true },
});

const InvoiceDetails = mongoose.model("InvoiceDetails", invoiceDetailsSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.find({ username: username, password: password });

    // Check if the user exists
    if (user.length == 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// const token = jwt.sign({ userId: "someUserId" }, "your-secret-key", {
//   expiresIn: "1h",
// });
// const authenticateToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   console.log("Received Token:", token);

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     const decodedToken = jwt.verify(token, "your-secret-key");
//     req.userId = decodedToken.userId;
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ error: "Token expired" });
//     }
//     console.error(error);
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

// Remove token-related logic
const authenticateToken = (req, res, next) => {
  // No token check, simply call next()
  next();
};

app.post("/invoice", authenticateToken, async (req, res) => {
  const { userId } = req;
  const invoiceData = req.body;

  // Associate the invoice data with the userId when saving to the database
  const invoice = new InvoiceDetails({ ...invoiceData, userId });

  invoice
    .save()
    .then(() => {
      res.status(200).send("Invoice data saved successfully.");
    })
    .catch((error) => {
      res.status(500).send("Failed to save invoice data: " + error);
    });
});

app.get("/invoices", authenticateToken, async (req, res) => {
  const { userId } = req;

  try {
    // Retrieve invoices for the authenticated user
    const invoices = await InvoiceDetails.find({ userId });
    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
