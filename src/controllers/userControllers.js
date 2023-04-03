import userServices from "../services/userServices.js";

async function signup(req, res) {
  const { name, email, password } = req.body;
  try {
    await userServices.create(name, email, password);
    return res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function signin(req, res) {
  const { name, email, password } = req.body;
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export default {
  signup,
  signin,
};
