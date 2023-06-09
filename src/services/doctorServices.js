import bcrypt from "bcrypt";
import doctorRepositories from "../repositories/doctorRepositories.js";
import { v4 as uuidV4 } from "uuid";

async function signUp({ name, email, password, specialty, location }) {
  const { rowCount } = await doctorRepositories.findByEmail(email);
  if (rowCount) throw new Error("Internal Error");

  const hashPass = await bcrypt.hash(password, 10);
  await doctorRepositories.signUp({
    name,
    email,
    password: hashPass,
    specialty,
    location,
  });
}

async function signIn({ email, password }) {
  const { rows: users } = await doctorRepositories.findByEmail(email);
  if (users.length === 0) throw new Error("Email or Password incorrect");

  const [user] = users;
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Email or Password incorrect");

  const token = uuidV4();
  await doctorRepositories.createSession({ token, userId: user.id });
  return token;
}

async function getAppointments(doctorId) {
  const {rows} = await appointmentRepositories.findDoctorAppointments(doctorId);
  return rows
}

async function confirmAppointments(id) {
  const {rowCount} = await appointmentRepositories.confirmAppointments(id);
  if(!rowCount) throw new Error("Not Found");
}

async function cancelAppointments(id) {
  const {rowCount} = await appointmentRepositories.cancelAppointments(id);
  if(!rowCount) throw new Error("Not Found");
}

export default {
  signUp,
  signIn,
  getAppointments,
  confirmAppointments,
  cancelAppointments
};
