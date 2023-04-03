import { Router } from "express";
import userControllers from "../controllers/userControllers.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { userSchema } from "../schemas/userSchema.js";

const userRouter = Router();
userRouter.post("/signup", validateSchema(userSchema), userControllers.signup);
userRouter.post("/signin", userControllers.signin);

export default userRouter;
