import joi from "joi";

const userSignInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(3)
});

export default userSignInSchema;