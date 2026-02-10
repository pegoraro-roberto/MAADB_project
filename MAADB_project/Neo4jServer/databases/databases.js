const neo4j = require("neo4j-driver");
const NEO4J_URI = "neo4j://127.0.0.1:7687";
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "AbruzzoloStruzz0!";
const NEO4J_DATABASE = "neo4j";
require("dotenv").config();

if (!NEO4J_URI || !NEO4J_USER || !NEO4J_PASSWORD) {
  throw new Error("Variabili .env Neo4j mancanti (NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD).");
}

const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
);

// Piccolo check di connessione all’avvio (analogo al log mongoose)
async function verifyConnection() {
  try {
    await driver.verifyConnectivity();
    console.log("connection to neo4j worked!");
  } catch (err) {
    console.log("connection to neo4j did not work!", err);
  }
}
verifyConnection();

//Helper: crea session per ogni chiamata
function getSession(accessMode = neo4j.session.READ) {
  return driver.session({
    database: NEO4J_DATABASE || undefined,
    defaultAccessMode: accessMode,
  });
}

// Helper: execute read/write con session lifecycle corretto
async function runRead(cypher, params = {}) {
  const session = getSession(neo4j.session.READ);
  try {
    return await session.executeRead((tx) => tx.run(cypher, params));
  } finally {
    await session.close();
  }
}

async function runWrite(cypher, params = {}) {
  const session = getSession(neo4j.session.WRITE);
  try {
    return await session.executeWrite((tx) => tx.run(cypher, params));
  } finally {
    await session.close();
  }
}

// Chiusura pulita
async function closeDriver() {
  await driver.close();
}

module.exports = {
  driver,
  runRead,
  runWrite,
  closeDriver,
};
