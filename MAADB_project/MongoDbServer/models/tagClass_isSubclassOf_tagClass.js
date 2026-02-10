const mongoose = require('mongoose');

const TagClass_isSubclassOf_tagClass = new mongoose.Schema({
    TagClass1Id: {type: Number},
    TagClass2Id: {type: Number},
  }
);

// setting the virtual property
TagClass_isSubclassOf_tagClass.set('toObject', {getters: true, virtuals: true});

// exporting the model
module.exports = mongoose.model('TagClass_isSubclassOf_tagClass', TagClass_isSubclassOf_tagClass);

