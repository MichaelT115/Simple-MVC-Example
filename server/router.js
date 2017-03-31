// import the controllers
// This only specifies the folder name, which means it will automatically pull the index.js file
const controllers = require('./controllers');

// function to attach routes
const router = (app) => {
  // when someone goes to the /page1 page, call controllers.page1
  // For example, www.webpage.com/page1, it will route to controllers.page1
  app.get('/page1', controllers.CatController.catListPage);
  app.get('/page2', controllers.CatController.catFormPage);
  app.get('/page3', controllers.DogController.dogFormPage);
  app.get('/page4', controllers.DogController.dogListPage);
  app.get('/getName', controllers.CatController.getName);
  app.get('/findByName', controllers.CatController.searchName);
  app.get('/findDogByName', controllers.DogController.searchDogName);

  // whenever someone goes to the site without a path (AKA the home page), call controllers.index
  // For example www.webpage.com
  app.get('/', controllers.CatController.catHomePage);

  // catch for any other GET request. The * means anything
  app.get('/*', controllers.notFound);

  // When someone POSTS to /setName, call controllers.setName
  // For example, a form submission to www.webpage.com/setName
  app.post('/setName', controllers.CatController.setName);
  app.post('/setDog', controllers.DogController.setDogName);  // Create a Dog entry in the database

  // When someone POSTS to /updateLast, call controllers.updateLast
  app.post('/updateLast', controllers.CatController.updateLast);
  app.post('/ageDog', controllers.DogController.ageDogName);
};

// export the router function
module.exports = router;
