import patientServices from "../services/patientServices.js";

async function signUp(req, res) {
  const { name, email, password } = req.body;
  try {
    await patientServices.signUp(name, email, password);
    return res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const token = await patientServices.signIn(email, password);
    return res.status(201).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function scheduleAppointment(req,res){
  const {id} = req.locals.user
  const {doctorId, date, hour} = req.body
  try {
    await patientServices.scheduleAppointment({patientId: id, doctorId, date, hour})
    return res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export default {
  signUp,
  signIn,
  scheduleAppointment
};
