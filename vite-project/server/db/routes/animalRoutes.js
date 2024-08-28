const express = require('express');
const createAnimal = require('../animalsCrud');
const Animal = require('../models/animal');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const animals = await Animal.find();
    console.log('GETing animals');
    res.send(animals);
  } catch (error) {
    console.error('Error getting animals:', error);
    res.status(500).send({ error: 'Failed to get animals' });
  }
});

router.post('/', async (req, res) => {
  try {
    const animal = req.body;
    const newAnimal = await createAnimal(animal);
    return res.status(201).send(newAnimal);
  } catch (error) {
    console.error('Error creating animal', error);
    res.status(500).send({ error: 'Failed to create animal' });
  }
});

module.exports = router;
