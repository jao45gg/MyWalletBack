import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {

    try {

        const { name, email, password } = req.body;

        const user = await db.collection("users").findOne({ email });
        if (user) return res.status(409).send("Email already registred!");

        const hash = bcrypt.hashSync(password, 10);

        await db.collection("users").insertOne({ name, email, password: hash });
        res.sendStatus(201);

    } catch (err) {

        res.status(500).send(err.message);

    }

}