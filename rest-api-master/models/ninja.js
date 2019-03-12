const mongoose = require('mongoose')

const Schema = mongoose.Schema

const GeoSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
})

const NinjaSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  rank: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
  // add in geo location
})
// create database ninja with Ninja schema
const Ninja = mongoose.model('ninja', NinjaSchema)

module.exports = Ninja
