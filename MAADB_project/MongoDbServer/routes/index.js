var express = require('express');
var router = express.Router();
const controllerTag = require("../controllers/controllerTag");
const controllerIsPartOf = require("../controllers/isPartOfController");
const controllerHasType = require("../controllers/hasTypeController");
const controllerTagClass = require("../controllers/tagClassController");

router.post('/q2pt1', async (req, res, next) => {
  try {
    const results = await controllerIsPartOf.getCityFromCountry(req.body);
    res.json(results);
  } catch (error) {
    res.status(500).json({error: error});
  }
});

router.post('/q2pt2', async (req, res, next) => {
  try {
    var results = await controllerHasType.getTagClass(req.body);
    results = await controllerTagClass.getNameById(results);
    res.json(results);
  } catch (error) {
    res.status(500).json({error: error});
  }
});


router.post('/q3', async (req, res, next) => {
  try {
    const results = await controllerTag.getName(req.body);
    res.json(results);
  } catch (error) {
    res.status(500).json({error: error});
  }
});

module.exports = router;
