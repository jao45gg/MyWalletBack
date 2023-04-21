import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import userSchema from "../schemas/user.schema.js";
import userSignInSchema from "../schemas/userSignIn.schema.js";
import { signUp, signIn } from "../controllers/user.controller.js";

const usersRouter = Router();

usersRouter.post("/signUp", validateSchema(userSchema), signUp);
usersRouter.post("/signIn", validateSchema(userSignInSchema), signIn);

export default usersRouter;