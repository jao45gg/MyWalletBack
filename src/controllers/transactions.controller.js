import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function newTransaction(req, res) {

    try {

        const { value, description } = req.body;
        const { type } = req.params;

        if (type !== "input" && type !== "output") return res.status(422).send("Invalid type of transaction!");

        await db.collection("transactions").insertOne({ value, description, date: dayjs().format("DD/MM"), type });
        res.sendStatus(201);

    } catch (err) {

        res.status(500).send(err.message);

    }

}