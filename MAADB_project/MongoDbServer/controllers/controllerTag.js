const tags = require('../models/tags');

//query per ottenere il nome del tag dato l'id
function getName(body) {
  return new Promise(async (resolve, reject) => {

    let res = await tags.aggregate([
      {
        $match: {
          id: { $in: body.tagIds }
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

module.exports.getName = getName;
