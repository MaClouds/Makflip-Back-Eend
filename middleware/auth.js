const jwt = require('jsonwebtoken');
const User = require('../models/user_models');
const Seller = require('../models/seller');

const auth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(401).json({ msg: "No authentication token, authorization denied" });

        const verified = jwt.verify(token, "passwordKey");
        if (!verified) return res.status(401).json({ msg: "Token verification failed, authorization denied" });

        const user = await User.findById(verified.id) || await Seller.findById(verified.id);
        if (!user) return res.status(401).json({ msg: "User not found, authorization denied" });

        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const sellerAuth = (req, res, next) => {
    if (req.user.type !== "seller") {
        return res.status(403).json({ msg: "Access denied, only sellers are allowed" });
    }
    next();
};

module.exports = { auth, sellerAuth };
