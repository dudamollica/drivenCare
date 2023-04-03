import bcrypt from "bcrypt";
import patientRepositories from "../repositories/patientRepositories.js";
import { v4 as uuidV4 } from "uuid";
import appointmentRepositories from "../repositories/appointmentRepositories.js";
import doctorRepositories from "../repositories/doctorRepositories.js";

async function signUp({ name, email, password }) {
  const { rowCount } = await patientRepositories.findByEmail(email);
  if (rowCount) throw new Error("Internal Error");

  const hashPass = await bcrypt.hash(password, 10);
  await patientRepositories.signUp({ name, email, password: hashPass });
}

async function signIn({ email, password }) {
  const { rows: users } = await patientRepositories.findByEmail(email);
  if (users.length === 0) throw new Error("Email or Password incorrect");

  const [user] = users;
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Email or Password incorrect");

  const token = uuidV4();
  await patientRepositories.createSession({ token, userId: user.id });
  return token;
}

async function scheduleAppointment({ patientId, doctorId, date, hour }) {
  const {
    rows: [appointment],
  } = await appointmentRepositories.findAppointment({ doctorId, date, hour });
  if (appointment) throw new Error("Unavailable");
  await appointmentRepositories.create({ patientId, doctorId, date, hour });
}

async function findAvailableTimes(req, res) {}

async function findDoctor({ name, specialty, location }) {
  if (name) {
    const { rows, rowCount } = await doctorRepositories.findByName(name);
    if (!rowCount) throw new Error("Not found");
    return rows;
  } else if (specialty) {
    const { rows, rowCount } = await doctorRepositories.findBySpecialty(
      specialty
    );
    if (!rowCount) throw new Error("Not found");
    return rows;
  } else {
    const { rows, rowCount } = await doctorRepositories.findByLocation(
      location
    );
    if (!rowCount) throw new Error("Not found");
    return rows;
  }
}

async function getAppointments(patientId) {
  const { rows, rowCount } =
    await appointmentRepositories.findPatientAppointments(patientId);
  if (!rowCount) throw new Error("Not found");
  return rows;
}

export default {
  signUp,
  signIn,
  scheduleAppointment,
  findAvailableTimes,
  findDoctor,
  getAppointments,
};
