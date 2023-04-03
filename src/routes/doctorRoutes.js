import { Router } from "express";
import doctorControllers from "../controllers/doctorControllers.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { doctorSchema } from "../schemas/userSchema.js";

const doctorRouter = Router();

doctorRouter.post("/signup", validateSchema(doctorSchema), doctorControllers.signUp);
doctorRouter.post("/signin", doctorControllers.signIn);

export default doctorRouter;