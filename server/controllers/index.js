
// export the relevant public controller functions
module.exports.CatController = require('./CatController.js');
module.exports.DogController = require('./DogController.js');

module.exports.notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

