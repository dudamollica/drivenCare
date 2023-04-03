import db from "../config/database.js";

async function findByEmail(email) {
  return await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}

async function signUp({ name, email, password: hashPass }) {
  await db.query(
    `INSERT INTO users (name, email, password)
    VALUES ($1,$2,$3)`,
    [name, email, password]
  );
}

async function createSession({ token, userId }) {
  await db.query(
    `INSERT INTO "patientSessions" (token, "userId")
      VALUES ($1,$2)`,
    [token, userId]
  );
}

async function findSessionByToken(token) {
  return await db.query(`SELECT * FROM "patientSessions" WHERE token=$1`, [token]);
}

async function findSessionById(id) {
  return await db.query(`SELECT * FROM users WHERE id=$1`, [id]);
}

export default {
  findByEmail,
  signUp,
  createSession,
  findSessionByToken,
  findSessionById
};
