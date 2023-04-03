import { Router } from "express";
import patientControllers from "../controllers/patientControllers.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { patientSchema } from "../schemas/userSchema.js";
import { appointmentSchema } from "../schemas/appointmentSchema.js";
import { validateAccount } from "../middlewares/accountTypeMiddleware.js";

const patientRouter = Router();
patientRouter.post(
  "/signup",
  validateSchema(patientSchema),
  patientControllers.signUp
);

patientRouter.post("/signin", patientControllers.signIn);

patientRouter.post(
  "/appointment",
  authMiddleware.authValidation,
  validateAccount("patient"),
  validateSchema(appointmentSchema),
  patientControllers.scheduleAppointment
);

patientRouter.get(
  "/search",
  authMiddleware.authValidation,
  validateAccount("patient"),
  patientControllers.findDoctor
);

patientRouter.get(
  "/available-times",
  authMiddleware.authValidation,
  validateAccount("patient"),
  patientControllers.findAvailableTimes
);

patientRouter.get(
  "/appointments",
  authMiddleware.authValidation,
  validateAccount("patient"),
  patientControllers.getAppointments
);

export default patientRouter;
