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

export async function signIn(req, res) {

    try {

        const { email, password } = req.body;

        const user = await db.collection("users").findOne({ email });
        if (!user) return res.status(404).send("Email not registred!");

        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) return res.status(401).send("Incorrect Password!");


        const token = uuid();
        await db.collection("sessions").insertOne({ token, idUser: user._id });
        res.send(token);

    } catch (err) {

        res.status(500).send(err.message);

    }

}

export async function logOut(req, res) {

    try {

        const token = res.locals.session.token;
        await db.collection("sessions").deleteOne({ token });
        res.send();

    } catch (err) {

        res.status(500).send(err.message);

    }

}