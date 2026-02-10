const tagClasses = require('../models/tagClass');

//query per ottenere i nomi delle tag class dati gli id
function getNameById(results) {
  return new Promise(async (resolve, reject) => {

    let res = await tagClasses.aggregate([
      {
        $match: {
          id: { $in: results }
        }
      },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1
        }
      }
    ]);
    resolve(res);
  });
}

module.exports.getNameById = getNameById;

