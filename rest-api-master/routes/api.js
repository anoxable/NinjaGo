const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')
// get a list of ninjas from the db
router.get('/ninjas', function (req, res, next) {
  Ninja.aggregate([
    {
      $geoNear: {
        near: {
          'type': 'Point',
          'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: 'dis'
      }
    }
  ]).then(function (ninjas) {
    res.send(ninjas)
  })
})

// add a new ninja to the db
router.post('/ninjas', function (req, res, next) {
  Ninja.create(req.body).then(function (ninja) {
    res.send(ninja)
  }).catch(next)
})

// update a ninja in the db
router.put('/ninjas/:id', function (req, res, next) {
  // find ninja in ninja database by matching _id: with '/ninjas/:id' , and updating it with the req.body data that was sent,
  // if you pas { new: true } as the 3rd parametar in findByIdAndUpdate it will return and updated version in the callback function
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    // then we find will find that updated ninja again and send it in response
    Ninja.findOne({ _id: req.params.id }).then(function (ninja) {
      res.send(ninja)
    })
  })
})

// delete ninja from the db
router.delete('/ninjas/:id', function (req, res, next) {
  // find ninja in ninja database by id (match _id to '/ninjas/:id' that was typed .then get back deleted ninja a send it back to the user)
  Ninja.findByIdAndRemove({ _id: req.params.id }).then(function (ninja) {
    res.send(ninja)
  })
})

module.exports = router
