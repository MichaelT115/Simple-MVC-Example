const models = require('../models');

// Get the models
const Dog = models.Dog.DogModel;

// default fake data so that we have something to work with until we make a real Cat
const defaultData = {
  name: 'unknown',
  breed: 'unknown',
  age: -1,
};

// object for us to keep track of the last dog we made and dynamically update it sometimes
let lastAdded = new Dog(defaultData);


// Find all dogs on request.
const readAllDogs = (req, res, callback) => {
  Dog.find(callback);
};


// Find specific dog
const readDog = (req, res) => {
  const name = req.query.name;

  const callback = (err, doc) => {
    if (err) {
      return res.json({ err }); // if error, return it
    }

    // return success
    return res.json(doc);
  };

  Dog.findByName(name, callback);
};

// Handle Page 3
const hostDogForm = (req, res) => {
  res.render('page3');
};

const getDogName = (req, res) => {
  res.json({ name: lastAdded.name });
};

const setDogName = (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.breed || !req.body.age) {
    return res.status(400).json({ error: 'Field Missing.' });
  }

  // if required fields are good, then set name
  const name = `${req.body.firstname} ${req.body.lastname}`;

  // dummy JSON to insert into database
  const dogData = {
    name,
    breed: req.body.breed,
    age: req.body.age,
  };

  // create a new object of CatModel with the object to save
  const newDog = new Dog(dogData);

  // create new save promise for the database
  const savePromise = newDog.save();

  savePromise.then(() => {
    // set the lastAdded cat to our newest cat object.
    // This way we can update it dynamically
    lastAdded = newDog;
    // return success
    res.json({ name: lastAdded.name, breed: lastAdded.breed, age: lastAdded.age });
  });

  // if error, return it
  savePromise.catch(err => res.json({ err }));

  return res;
};

const searchDogName = (req, res) => {
  if (!req.query.name) {
    return res.json({ error: 'Name is required to perform a search' });
  }

  return Dog.findByName(req.query.name, (err, doc) => {
    // errs, handle them
    if (err) {
      return res.json({ err }); // if error, return it
    }

    // if no matches, let them know
    // (does not necessarily have to be an error since technically it worked correctly)
    if (!doc) {
      return res.json({ error: 'No dogs found' });
    }

    // if a match, send the match back
    return res.json({ name: doc.name, beds: doc.bedsOwned });
  });
};

const ageDogName = (req, res) => {
  if (!req.query.name) {
    return res.json({ error: 'Name is required to perform this operation.' });
  }

  return Dog.findByName(req.query.name, (err, doc) => {
    if (err) {
      return res.json({ err }); // if error, return it
    }

    if (!doc) {
      return res.json({ error: 'No dogs found' });
    }

    const dog = doc;

    dog.age += 1;

    const savePromise = dog.save();

    // if save error, just return an error for now
    savePromise.catch(error => res.json({ error }));

    // send back the name as a success for now
    return savePromise.then(() => {
      res.json({ name: dog.name, age: dog.age });
      console.log(`${dog.name} is now age ${dog.age}`);
    });
  });
};

const hostDogList = (req, res) => {
  const callback = (err, docs) => {
    if (err) {
      return res.json({ err });
    }

    // return success
    return res.render('page4', { dogs: docs });
  };

  readAllDogs(req, res, callback);
};

// export the relevant public controller functions
module.exports = {
  dogFormPage: hostDogForm,
  dogListPage: hostDogList,
  readDog,
  readAllDogs,
  getDogName,
  setDogName,
  searchDogName,
  ageDogName,
};
