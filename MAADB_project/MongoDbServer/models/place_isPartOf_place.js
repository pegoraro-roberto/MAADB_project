const mongoose = require('mongoose');

const place_isPartOf_place = new mongoose.Schema({
    Place1Id: {type: Number},
    Place2Id: {type: Number},
  }
);

// setting the virtual property
place_isPartOf_place.set('toObject', {getters: true, virtuals: true});

// exporting the model
module.exports = mongoose.model('place_isPartOf_place', place_isPartOf_place);
