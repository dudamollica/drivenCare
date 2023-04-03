import { Router } from "express";
import patientControllers from "../controllers/patientControllers.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js"
import { patientSchema } from "../schemas/userSchema.js";

const patientRouter = Router();
patientRouter.post("/signup", validateSchema(patientSchema), patientControllers.signUp);
patientRouter.post("/signin", patientControllers.signIn);
patientRouter.post("/appointment", authMiddleware.authValidation, patientControllers.scheduleAppointment);

export default patientRouter;