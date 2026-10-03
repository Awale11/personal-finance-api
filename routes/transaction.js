import express from "express";
import { protect } from "../middlewares/auth.js";
import { createTransaction, deleteTransaction, getTransaction, getTransactions, monthlySummary, updateTransaction } from "../controllers/transaction.js";
import { validateZod } from "../middlewares/validateZod.js";
import { transactionSchema } from "../schemas/transactionSchema.js";

const router = express.Router();

/**
 * @swagger
 * /transaction/monthly-summary:
 *   get:
 *     summary: Get monthly transaction summary
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly transaction summary
 *       401:
 *         description: Unauthorized
 */
// GET/monthly-summary
router.get('/monthly-summary', protect, monthlySummary);
/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - type
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 example: Lunch
 *               amount:
 *                 type: number
 *                 example: 25
 *               type:
 *                 type: string
 *                 enum:
 *                   - income
 *                   - expense
 *                 example: expense
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-10-03"
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       401:
 *         description: Unauthorized
 */
// for post
router.post('/', protect, createTransaction);
/**
 * @swagger
 * /transaction:
 *   get:
 *     summary: Get all user transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 *       401:
 *         description: Unauthorized
 */
// for get all transactions
router.get('/', protect, getTransactions);
/**
 * @swagger
 * /transaction/{id}:
 *   get:
 *     summary: Get one transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction details
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 */
// // for get one transaction
router.get('/:id', protect, getTransaction);
/**
 * @swagger
 * /transaction/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 */
// // for put edit transaction
router.put('/:id', protect, updateTransaction);
/**
 * @swagger
 * /transaction/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 */
 // for delete remove transaction
router.delete('/:id', protect, deleteTransaction);


// for zod validation
router.post('/', protect, validateZod(transactionSchema), createTransaction)

export default router;