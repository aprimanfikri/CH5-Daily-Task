const router = require("express").Router();

const Product = require("./productRouter");
const Admin = require("./adminRouter");
const Auth = require("./authRouter");

router.use("/api/v1/products", Product);
router.use("/admin", Admin);
router.use("/api/v1/auth", Auth);

module.exports = router;
