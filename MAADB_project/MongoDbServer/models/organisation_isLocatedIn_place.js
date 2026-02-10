const mongoose = require('mongoose');

const Organisation_isLocatedIn_place = new mongoose.Schema({
    OrganisationId: {type: Number},
    PlaceId: {type: Number},
  }
);

// setting the virtual property
Organisation_isLocatedIn_place.set('toObject', {getters: true, virtuals: true});

// exporting the model
module.exports = mongoose.model('Organisation_isLocatedIn_place', Organisation_isLocatedIn_place);
