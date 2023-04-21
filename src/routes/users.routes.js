import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import userSchema from "../schemas/user.schema.js";
import { signUp } from "../controllers/user.controller.js";

const usersRouter = Router();

usersRouter.post("/cadastro", validateSchema(userSchema), signUp);

export default usersRouter;