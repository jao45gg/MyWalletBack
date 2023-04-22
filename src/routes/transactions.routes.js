import { Router } from "express";
import transactionSchema from "../schemas/transaction.schema.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import authValidation from "../middlewares/auth.middleware.js";
import { getTransactions, newTransaction } from "../controllers/transactions.controller.js";

const transactionsRouter = Router();
transactionsRouter.use(authValidation);

transactionsRouter.post("/newTransaction/:type", validateSchema(transactionSchema), newTransaction);
transactionsRouter.get("/transactions", getTransactions);

export default transactionsRouter;