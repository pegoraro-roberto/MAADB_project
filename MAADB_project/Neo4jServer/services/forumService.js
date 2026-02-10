// services/personService.js
const { runRead } = require("../databases/databases.js");
const neo4j = require("neo4j-driver");

async function bestCreator(id) {

  const query =
    "MATCH (f:Forum {id: $id}) \n" +
    "CALL(f) { \n" +
    "WITH f \n" +
    "MATCH (f)-[:forum_containerOf_post]->(p:Post) \n" +
    "MATCH (p)-[:post_hasCreator_person]->(u:Person) \n" +
    "RETURN u, count(p) AS postCount \n" +
    "} \n" +
    "CALL(f) { \n" +
    "WITH f \n" +
    "MATCH (f)-[:forum_containerOf_post]->(p:Post) \n" +
    "MATCH (c:Comment)-[:comment_replyOf_post|comment_replyOf_comment*1..]->(p) \n" +
    "MATCH (c)-[:comment_hasCreator_person]->(u1:Person) \n" +
    "RETURN u1, count(DISTINCT c) AS commentCount \n" +
    "}\n" +
    "WITH u," +
    "coalesce(postCount, 0) AS postCount, " +
    "coalesce(commentCount, 0) AS commentCount \n" +
    "RETURN DISTINCT u.id AS personId," +
    "u.firstName AS firstName, " +
    "u.lastName AS lastName, " +
    "postCount," +
    "commentCount," +
    "(postCount + commentCount) AS totalContributions \n" +
    "ORDER BY totalContributions DESC, commentCount DESC, postCount DESC, personId \n" +
    "LIMIT 1;"
  ;

  const params = { id: Number(id) };

  const res = await runRead(query, params);

  //rimappiamo il risultato in modo che sia più leggibile e che i valori numerici siano tali
  return res.records.map((r) => ({
    personId: neo4j.integer.toNumber(r.get("personId")),
    firstName: r.get("firstName"),
    lastName: r.get("lastName"),
    postCount: neo4j.integer.toNumber(r.get("postCount")),
    commentCount: neo4j.integer.toNumber(r.get("commentCount")),
    totalContributions: neo4j.integer.toNumber(r.get("totalContributions")),
  }));
}

module.exports = { bestCreator };
