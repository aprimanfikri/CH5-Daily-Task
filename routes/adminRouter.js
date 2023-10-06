const router = require("express").Router();
const uploader = require("../middlewares/uploader");
const Admin = require("../controllers/adminController");

router.get("/create", Admin.createPage);
router.get("/dashboard", Admin.dashboardPage);
router.post("/create/product", uploader.single("image"), Admin.createProduct);

module.exports = router;
