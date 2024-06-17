const express = require("express");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Seller = require("../models/seller");
const { auth, sellerAuth } = require("../middleware/auth");

const sellerRouter = express.Router();

sellerRouter.post('/api/seller/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingEmail = await Seller.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ msg: 'Seller with the same email already exists' });
        }

        const hashedPassword = await bcryptjs.hash(password, 8);
        let seller = new Seller({
            email,
            password: hashedPassword,
            name,
        });

        seller = await seller.save();
        res.json({ seller });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

sellerRouter.post('/api/seller/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const seller = await Seller.findOne({ email });
        if (!seller) {
            return res.status(400).json({ msg: "Seller not found with this email" });
        }

        const isMatch = await bcryptjs.compare(password, seller.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect Password" });
        }

        const token = jwt.sign({ id: seller._id }, "passwordKey");
        res.json({ token, ...seller._doc });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

sellerRouter.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        const verified = jwt.verify(token, "passwordKey");
        if (!verified) return res.json(false);

        const seller = await Seller.findById(verified.id);
        if (!seller) return res.json(false);
        res.json(true);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// get seller data
sellerRouter.get("/", auth, sellerAuth, async (req, res) => {
    const seller = await Seller.findById(req.user);
    res.json({ ...seller._doc, token: req.token });
});

//sign out 
sellerRouter.post('/api/seller/signout', auth, sellerAuth, async (req, res) => {
    try {
        res.clearCookie('x-auth-token');
        res.json({ msg: 'Seller successfully signed out' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = sellerRouter;
