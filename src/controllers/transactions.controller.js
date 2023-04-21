import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function newTransaction(req, res) {

    try {

        const { value, description } = req.body;
        const { type } = req.params;

        if (type !== "input" && type !== "output") return res.status(422).send("Invalid type of transaction!");

        await db.collection("transactions").insertOne({ value, description, date: dayjs().format("DD/MM"), type, sortDate: Date.now(), idUser: res.locals.session.idUser });
        res.sendStatus(201);

    } catch (err) {

        res.status(500).send(err.message);

    }

}

export async function getTransactions(req, res) {

    try {

        const idUser = res.locals.session.idUser;
        const transactions = await db.collection("transactions").find({ idUser }).toArray();

        transactions.sort((a, b) => {
            if (a.sortDate > b.sortDate) return 1;
            if (a.sortDate < b.sortDate) return -1;
            return 0;
        })

        res.send(transactions);

    } catch (err) {

        res.status(500).send(err.message);

    }

}