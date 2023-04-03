import bcrypt from "bcrypt";
import patientRepositories from "../repositories/patientRepositories.js";
import { v4 as uuidV4 } from "uuid";
import appointmentRepositories from "../repositories/appointmentRepositories.js";

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
  const {rows: [appointment]} = await appointmentRepositories.findAppointment({doctorId, date, hour});
  if (appointment) throw new Error("Unavailable");
  await appointmentRepositories.create({ patientId, doctorId, date, hour})
}

export default {
  signUp,
  signIn,
  scheduleAppointment,
};
