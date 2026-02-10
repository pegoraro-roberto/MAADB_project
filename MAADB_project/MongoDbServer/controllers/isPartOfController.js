const parts = require('../models/place_isPartOf_place');

//query per ottenere le città di una nazione
function getCityFromCountry(body) {
  return new Promise(async (resolve, reject) => {
    let res = await parts.aggregate([
      {
        $match: {
          Place2Id: body.placeId
        }
      },
      {
        $project: {
          _id: 0,
          Place1Id: 1
        }
      }
    ]);
    resolve(res);
  });
}

module.exports.getCityFromCountry = getCityFromCountry;
