import db from "../config/database.js";

async function findByEmail(email) {
  return await db.query(`SELECT * FROM doctors WHERE email=$1`, [email]);
}

async function signUp({
  name,
  email,
  password: hashPass,
  specialty,
  location,
}) {
  await db.query(
    `INSERT INTO doctors (name, email, password, specialty, location)
      VALUES ($1,$2,$3, $4, $5)`,
    [name, email, password, specialty, location]
  );
}

async function createSession({ token, userId }) {
  await db.query(
    `INSERT INTO doctorSessions (token, "userId")
      VALUES ($1,$2)`,
    [token, userId]
  );
}

async function findSessionByToken(token) {
  return await db.query(`SELECT * FROM doctorSessions WHERE token=$1`, [token]);
}

async function findSessionById(id) {
  return await db.query(`SELECT * FROM doctorSessions WHERE id=$1`, [id]);
}

export default {
  findByEmail,
  signUp,
  createSession,
  findSessionByToken,
  findSessionById
};
