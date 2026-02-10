const mongoose = require('mongoose');

const Organisation = new mongoose.Schema({
    id: {type: Number},
    type: {type: String},
    name: {type: String},
    url: {type: String},
  }
);

// setting the virtual property
Organisation.set('toObject', {getters: true, virtuals: true});

// exporting the model
module.exports = mongoose.model('Organisation', Organisation);
