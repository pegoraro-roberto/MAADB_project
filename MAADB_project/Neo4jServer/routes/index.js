const express = require("express");
const router = express.Router();
const { driver } = require("../databases/databases.js");
const forumController = require("../controllers/forumController");
const userController = require("../controllers/userController");

router.post('/q1', async (req, res, next) => {
  try {
    const results = await forumController.q1(req, res);
    return res.json(results);
  } catch (error) {
    return res;
  }
});

router.post('/q2', async (req, res, next) => {
  try {
    const results = await userController.q2(req, res);
    return res.json(results);
  } catch (error) {
    return res;
  }
});

router.post('/q3', async (req, res, next) => {
  try {
    const results = await userController.q3(req, res);
    return res.json(results);
  } catch (error) {
    return res;
  }
});

router.post('/q4', async (req, res, next) => {
  try {
    const results = await userController.q4(req, res);
    return res.json(results);
  } catch (error) {
    return res;
  }
});

router.post('/q5', async (req, res, next) => {
  try {
    const results = await userController.q5(req, res);
    return res.json(results);
  } catch (error) {
    return res;
  }
});

router.post('/q6', async (req, res, next) => {
  try {
    const results = await userController.q6(req, res);
    return res.json(results);
  } catch (error) {
    return res;
  }
});

module.exports = router;
