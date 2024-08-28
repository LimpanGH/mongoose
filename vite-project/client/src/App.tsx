import { useState } from 'react';
import { ReactDOM } from 'react-dom/client';

import './App.css';

function App() {
  console.log('asdf');

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new animal object
    const newAnimal = {
      name,
      species,
      age
    };

    try {
      // Send a POST request to save the new animal to MongoDB
      const response = await fetch('/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAnimal)
      });

      if (response.ok) {
        // Animal saved successfully
        console.log('Animal saved!');
        // Reset form fields
        setName('');
        setSpecies('');
        setAge('');
      } else {
        // Error saving animal
        console.error('Failed to save animal');
      }
    } catch (error) {
      console.error('Failed to save animal', error);
    }
  };

  return (
    <>
      <div>
        <h1>hej</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Species:
          <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} />
        </label>
        <label>
          Age:
          <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <button type="submit">Save Animal</button>
      </form>
    </>
  );
}

export default App;
