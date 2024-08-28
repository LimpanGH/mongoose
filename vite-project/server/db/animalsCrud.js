const Animal = require('./models/animal');

// Function to create a new animal document in the database
const createAnimal = async (animal) => {
  const newAnimal = new Animal(animal);
  return newAnimal.save();
};

// Exporting the createAnimal function so it can be used in other parts of the application
module.exports = createAnimal
