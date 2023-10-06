const router = require("express").Router();

const Product = require("./productRouter");
const Admin = require("./adminRouter");

router.use("/api/v1/products", Product);
router.use("/admin", Admin);

module.exports = router;
