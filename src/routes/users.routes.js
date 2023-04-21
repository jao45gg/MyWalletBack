import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import userSchema from "../schemas/user.schema.js";
import userSignInSchema from "../schemas/userSignIn.schema.js";
import { signUp, signIn, logOut } from "../controllers/user.controller.js";
import authValidation from "../middlewares/auth.middleware.js";

const usersRouter = Router();

usersRouter.post("/signUp", validateSchema(userSchema), signUp);
usersRouter.post("/signIn", validateSchema(userSignInSchema), signIn);
usersRouter.delete("/logOut", authValidation, logOut);

export default usersRouter;