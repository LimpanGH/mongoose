# Moongoose Workshop

Ni ska nu bygga ett REST-api med hjälp av ExpressJS, MongoDB och Mongoose.

## Prerequisites

Innan ni startar behöver ni:

- MongoDB-instans t.ex. via MongoDb Cloud
- NodeJS installerat
- VSCode

## Stackens komponenter

Ni använder er av följande komponenter:

- __Node.JS__ är en runtime som kör er kod
- __MongoDB__ är databasen där ni lagrar data som postas in via api:et
- __Mongoose__ är ett npm-paket ni använder för att ansluta och skicka frågor till databasen.

## Sätta upp miljön

1. Skapa en katalog och öppna den med VSCode, starta terminalen och skriv:

> ```npm init -y```

2. Stega igenom guiden för att sätta upp npm
3. Installera *nodemon*:

> ```npm i nodemon --save-dev```

## Sätta upp Express.js

1. Installera express

> ```npm i express```

2. Skapa index.js och lägg in grundkoden för en express-server:

```javascript
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello World!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

3. Lägg till start-script i package.json

```json
"dev": "nodemon index.js"
```

4. Testa starta appen och surfa till <http://localhost:3000>

>```npm run dev```

## Skapa en router

Vi ska nu lägga till CRUD-operationer för entiteten *animal*. För att kunna separera logiken i appen skapar vi en egen router för animal.

1. Skapa routes/animal.js

```javascript
const express = require("express");
const router = express.Router();

// GET /animals
router.get("/", async (request, response) => {
  const animals = await findAnimals();
  response.json(animals);
});

module.exports = router;
```

2. Importera animal-routern i index.js och registrera i express-appen

```javascript
const animalsRouter = require("./routes/animals");
```

...

```javascript
app.use('/animal', animalRouter)
```

## Sätta upp anslutning till Mongoose

1. Installera mongoose

>```npm i mongoose```

2. Skapa en anslutning till Mongoose i index.js. Se till att URI:n matchar din databas. Databasnamnet står sist, i exemplet är det *zoo*:

```javascript
import { connect } from 'mongoose';
connect("mongodb+srv://cluster0.x4lmd.mongodb.net/zoo", {
    user: "username",
    pass: "password",
})
```

## Skapa interface och schema för animal

1. Lägg till en mapp 'db' som innehåller all databas-logik
2. I db, lägg till en mapp 'models' som innehåller modeller för alla entiteter (collections)
3. Skapa db/models/animal.js och lägg in schema och model för animal:

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    type: String,
    name: String,
    isMammal: Boolean,
    numberOfLegs: Number,
});

const AnimalModel = mongoose.model("Animal", animalSchema);

module.exports = AnimalModel;
```

## Skapa en addAnimal-funktion

Nu när vi har modellen är vi redo att skapa funktionen som lägger till ett animal i databasen

1. Skapa db/animalCrud.js och lägg till en createAnimal-fuktion som använder sig av Animal-modellen vi har skapat

```javascript
const AnimalModel = require("./models/animal");

const createAnimal = async (animal) => {
  const newAnimal = new AnimalModel(animal);
  return newAnimal.save();
};
```

## Skapa en route for POST /animal

1. I routes/animal.js lägger vi till en ny route för POST som anropar createAnimal från db/animalCrud.js och returnerar det skapade djuret:

```javascript
// POST /animal
router.post("/", async (request, response) => {
  const createdAnimal = await createAnimal(request.body);
  response.status(201).json(createdAnimal);
});
```

## Testa koden

Använd en Rest-klient t.ex. Thunder Client för att testa post-endpointen

> ```POST /animal```

```json
{
 "name": "Bo",
 "type": "Ko",
 "isMammal": true,
 "numberOfLegs": 2
}
```

## Fler endpoints

Nu har vi gått igenom hur man sätter upp alla komponenter och skapar en POST-endpoint. Nu återstår att skapa ytterligare endpoints:

```GET /animal/:id```

```GET /animal```

```PUT /animal```

```DELETE /animal```

Ta hjälp av föreläsningsanteckningarna och Mongoose-dokumentationen för queries (<https://mongoosejs.com/docs/queries.html>).

## Refaktorering - förslag

När ni gjort endpoints för alla CRUD-operationer och koden fungerar är det dags för förbättringar och refaktorisering. Här kommer förslag på saker att göra:

- Bryt ut konfigurerbara värden (t.ex. Connection URI) i en .env-fil och läs in med hjälp av dotenv (<https://www.npmjs.com/package/dotenv>)
- Lägg till validering av input-data. Använd t.ex. express-validator (<https://express-validator.github.io/docs/>).
- Se till att rätt statuskoder returneras beroende på metod och utfall.

## Svårare uppgift

I ditt MongoDb-kluster i [Atlas](https://cloud.mongodb.com) skapades automatiskt en testdatabas som heter `sample_mflix` med en collection `movies`. `movies` har två dokument `imdb` och `tomatoes` som har betyg för alla filmer.

- Skapa ett API med en endpoint som plockar ut de 100 filmer med högst betyg (IMDB eller Rotten Tomatoes)
- Skapa även en endpoint som plockar ut de 50 filmer med högst betyg i en specifik genre.
- Skapa en endpoint som plockar ut de 25 filmer med högst betyg för ett specifikt år.
- Gör en frontend som använder dessa endpoint och visar filmerna med dess namn och poster.
- Använd paginering så att alla 100 filmer inte visas samtidigt utan 10 filmer visas åt gången och man får bläddre mellan sidorna.
