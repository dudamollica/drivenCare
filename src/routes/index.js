import { Router } from "express";
import patientRouter from "./patientRoutes.js";
import doctorRouter from "./doctorRoutes.js"

const routes = Router()
routes.use("/patient", patientRouter)
routes.use("/doctor", doctorRouter)

export default routes;