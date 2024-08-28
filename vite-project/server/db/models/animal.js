const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  age: { type: Number, required: true },
});

const Animal = mongoose.model('animal', animalSchema);

module.exports = Animal;
