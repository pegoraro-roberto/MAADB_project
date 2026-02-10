const mongoose = require('mongoose');

const tags = new mongoose.Schema({
    id: {type: Number},
    name: {type: String},
    url: {type: String},
  }
);

// setting the virtual property
tags.set('toObject', {getters: true, virtuals: true});

// exporting the model
module.exports = mongoose.model('tags', tags);
