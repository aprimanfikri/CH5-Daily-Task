const express = require("express");
const router = express.Router();

const Auth = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");

router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.get("/check", authenticate, Auth.check);

module.exports = router;
