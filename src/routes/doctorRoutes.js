import { Router } from "express";
import doctorControllers from "../controllers/doctorControllers.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { doctorSchema } from "../schemas/userSchema.js";
import { validateAccount } from "../middlewares/accountTypeMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const doctorRouter = Router();

doctorRouter.post("/signup", validateSchema(doctorSchema), doctorControllers.signUp);

doctorRouter.post("/signin", doctorControllers.signIn);

doctorRouter.post("/confirm", authMiddleware.authValidation, validateAccount("doctor"), doctorControllers.confirmAppointments);

doctorRouter.post("/cancel", authMiddleware.authValidation, validateAccount("doctor"), doctorControllers.cancelAppointments);

doctorRouter.get(
    "/appointments",
    authMiddleware.authValidation,
    validateAccount("doctor"),
    doctorControllers.getAppointments
  );

export default doctorRouter;