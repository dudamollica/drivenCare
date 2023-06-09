import doctorServices from "../services/doctorServices.js";

async function signUp(req, res) {
  const { name, email, password, specialty, location } = req.body;
  try {
    await doctorServices.signUp(name, email, password, specialty, location);
    return res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const token = await doctorServices.signIn(email, password);
    return res.status(201).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getAppointments(req, res) {
  const { id } = req.locals.user;
  try {
    const appointments = await doctorServices.getAppointments({ doctorId: id });
    return res.status(201).send(appointments);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function confirmAppointments(req, res) {
  const { id } = req.params;
  try {
    await doctorServices.confirmAppointments(id);
    return res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function cancelAppointments(req, res) {
  const { id } = req.params;
  try {
    await doctorServices.cancelAppointments(id);
    return res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export default {
  signUp,
  signIn,
  getAppointments,
  confirmAppointments,
  cancelAppointments,
};
