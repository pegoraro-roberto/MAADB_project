const mongoose = require('mongoose');

const tagClass = new mongoose.Schema({
    id: {type: Number},
    name: {type: String},
    url: {type: String},
  }
);

// setting the virtual property
tagClass.set('toObject', {getters: true, virtuals: true});

// exporting the model
module.exports = mongoose.model('tagClass', tagClass);
