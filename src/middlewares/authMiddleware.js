import doctorRepositories from "../repositories/doctorRepositories.js";
import patientRepositories from "../repositories/patientRepositories.js";

async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("No token");

  try {
    const {rows: [patientSession]} = await patientRepositories.findSessionByToken(token);
    const {rows: [doctorSession]} = await doctorRepositories.findSessionByToken(token);

    if (!patientSession && !doctorSession) {
      return res.status(401).send("Session not found");
    } else if (!patientSession) {
      const {rows: [user]} = await doctorRepositories.findSessionById(doctorSession.userId);
      if(!user) return res.status(401).send("User not found")
    } else {
      const {rows: [user]} = await patientRepositories.findSessionById(patientSession.userId);
      if(!user) return res.status(401).send("User not found")
    }

    res.locals.user = user;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export default {
  authValidation,
};
