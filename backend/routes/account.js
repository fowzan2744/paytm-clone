// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


const router = express.Router();
 

router.get("/balance", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Decode and verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({ balance: account.balance });

  } catch (error) {
    console.error("Error decoding token or fetching balance:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.put("/deposit", authMiddleware, async (req, res) => {
    const { amount } = req.body;

    if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({
            message: "Invalid deposit amount. Must be a positive number."
        });
    }

    try {
        const result = await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: amount } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        return res.status(200).json({
            message: "Deposit successful"
        });
    } catch (err) {
        console.error("Deposit error:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.put("/withdraw", authMiddleware, async (req, res) => {
    const { amount } = req.body;

    if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({
            message: "Invalid withdraw amount. Must be a positive number."
        });
    }

    try {
        // Find the user's account
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        // Check if balance is sufficient
        if (account.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        // Proceed with withdrawal (subtract amount)
        const withdrawAmount = -1.0 * amount;

        const result = await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: withdrawAmount } }
        );

        if (result.modifiedCount === 0) {
            return res.status(500).json({
                message: "Failed to update account balance"
            });
        }

        return res.status(200).json({
            message: "Withdraw successful"
        });
    } catch (err) {
        console.error("Withdraw error:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;