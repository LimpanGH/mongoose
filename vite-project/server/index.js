require('dotenv').config();
const animal = require('./db/models/animal'); // Adjust the path based on your file structure
// const { createAnimal } = require('./db/animalsCrud'); // Adjust the path based on your file structure
const animalRoutes = require('./db/routes/animalRoutes');

const paths = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.static(paths.join(__dirname, 'public')));

// MongoDB connection using environment variable
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1);
  }
}

connectToDatabase();

app.use('/animal', animalRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
