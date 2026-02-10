const type = require('../models/tag_hasType_tagClass');

//query per ottenere le tag class dati una serie di tag
function getTagClass(body) {
  return new Promise(async (resolve, reject) => {

    const agg = await type.aggregate([
      {
        $match: {
          TagId: { $in: body.tagIds }
        }
      },
      {
        $group: {
          _id: null,
          TagClassIds: { $addToSet: "$TagClassId" } // DISTINCT
        }
      },
      {
        $project: {
          _id: 0,
          TagClassIds: 1
        }
      }
    ]);

    // agg è tipo: [] oppure [{ TagClassIds: [...] }]
    const tagClassIds = agg.length ? agg[0].TagClassIds : [];

    resolve(tagClassIds); //ritorno direttamente l'array
  });
}

module.exports.getTagClass = getTagClass;
