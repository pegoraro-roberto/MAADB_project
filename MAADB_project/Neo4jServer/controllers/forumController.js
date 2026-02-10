const forumService = require("../services/forumService");

async function q1(req, res, next) {
  try {
    const id  = req.body.forum;  // evita crash se forum manca

    if (!id) return res.status(400).json({ error: "Missing forum id" });

    return await forumService.bestCreator(id);
  } catch (err) {
    return res.status(500).json({ error: err.message ?? "Error" });
  }
}

module.exports.q1 = q1 ;