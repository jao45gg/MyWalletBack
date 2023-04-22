import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function newTransaction(req, res) {

    try {

        let { value, description } = req.body;
        const { type } = req.params;
        const user = await db.collection("users").findOne({ _id: res.locals.session.idUser });

        value = Number(value);
        if (type !== "input" && type !== "output") return res.status(422).send("Invalid type of transaction!");
        if (type === "input") {
            const num = value + user.balance;
            await db.collection("users").updateOne({ _id: res.locals.session.idUser }, {
                $set: {
                    _id: user._id, name: user.name,
                    email: user.email, password: user.password, balance: num
                }
            });
        }
        if (type === "output") {
            const num = user.balance - value;
            await db.collection("users").updateOne({ _id: res.locals.session.idUser }, {
                $set: {
                    _id: user._id, name: user.name,
                    email: user.email, password: user.password, balance: num
                }
            });
        }

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