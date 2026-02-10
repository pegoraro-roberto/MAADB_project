const mongoose = require('mongoose');

const places = new mongoose.Schema({
    id: {type: Number},
    name: {type: String},
    url: {type: String},
    type: {type: String},
  }
);

// setting the virtual property
places.set('toObject', {getters: true, virtuals: true});

// exporting the model
module.exports = mongoose.model('places', places);
