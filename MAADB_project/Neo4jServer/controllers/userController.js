const userService = require("../services/userService");

async function q2(req, res) {
  try {
    const ids  = req.body.cityIds;  // evita crash se forum manca

    if (!ids) return res.status(400).json({ error: "Missing forum id" });

    return await userService.peopleInterestsByCity(ids);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message ?? "Error" });
  }
}
module.exports.q2 = q2;

async function q3(req, res) {
  try {
    const id  = req.body.orgId;  // evita crash se orgId manca

    if (!id) return res.status(400).json({ error: "Missing forum id" });

    return await userService.uniInterests(id);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message ?? "Error" });
  }
}
module.exports.q3 = q3;

async function q4(req, res) {
  try {
    const id  = req.body.userId;  // evita crash se userId manca

    if (!id) return res.status(400).json({ error: "Missing forum id" });

    return await userService.suggestedKnown(id);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message ?? "Error" });
  }
}
module.exports.q4 = q4;

async function q5(req, res) {
  try {
    const id  = req.body.userId;  // evita crash se userId manca

    if (!id) return res.status(400).json({ error: "Missing forum id" });

    return await userService.suggestedInterest(id);
  } catch (err) {
    return res.status(500).json({ error: err.message ?? "Error" });
  }
}
module.exports.q5 = q5;

async function q6(req, res) {
  try {
    const ids  = req.body.cityIds;  // evita crash se cityIds manca

    if (!ids) return res.status(400).json({ error: "Missing forum id" });

    return await userService.peopleAgeByCity(ids);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message ?? "Error" });
  }
}
module.exports.q6 = q6;



