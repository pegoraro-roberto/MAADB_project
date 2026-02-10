const mongoose = require('mongoose');

const tag_hasType_tagClass = new mongoose.Schema({
    TagId: {type: Number},
    TagClassId: {type: Number},
  }
);

// setting the virtual property
tag_hasType_tagClass.set('toObject', {getters: true, virtuals: true});

// exporting the model
module.exports = mongoose.model('tag_hasType_tagClass', tag_hasType_tagClass);

