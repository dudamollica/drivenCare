import db from "../config/database.js";

async function create({ patientId, doctorId, date, hour }) {
  await db.query(
    `INSERT INTO appointments ("patientId", "doctorId", date, hour) 
  VALUES ($1,$2,$3,$4)`,
    [patientId, doctorId, date, hour]
  );
}

async function findAppointment({ doctorId, date, hour }) {
  await db.query(
    `SELECT * FROM appointments WHERE "doctorId"=$1 AND date=$2 AND hour=$3`,
    [doctorId, date, hour]
  );
}

async function findPatientAppointments(patientId) {
  await db.query(
    `SELECT appointments.*, doctors.name as "doctor", doctors.specialty, doctors.location
   FROM appointments WHERE "patientId"=$1
   JOIN doctors 
   ON appointments."doctorId"= doctors.id`,
    [patientId]
  );
}

async function findDoctorAppointments(doctorId) {
  await db.query(
    `SELECT appointments.*, users.name as "patient"
  FROM appointments WHERE "doctorId"=$1
  JOIN users
  ON appointments."patientId"= users.id`,
    [doctorId]
  );
}

async function confirmAppointments(id) {
  await db.query(`UPDATE appointments set confirm=true WHERE id=$1`, [id]);
}

async function cancelAppointments(id) {
  await db.query(`UPDATE appointments set cancel=true WHERE id=$1`, [id]);
}

export default {
  create,
  findAppointment,
  findPatientAppointments,
  findDoctorAppointments,
  cancelAppointments,
  confirmAppointments,
};
