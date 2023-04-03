import db from "../config/database.js";

async function create({ patientId, doctorId, date, hour }) {
  await db.query(
    `INSERT INTO appointments ("patientId", "doctorId", date, hour) 
  VALUES ($1,$2,$3,$4)`,
    [patientId, doctorId, date, hour]
  );
}

async function findAppointment({doctorId, date, hour}) {
  await db.query(
    `SELECT * FROM appointments WHERE doctorId=$1 AND date=$2 AND hour=$3`,
    [doctorId, date, hour]
  );
}

export default {
  create,
  findAppointment
};
