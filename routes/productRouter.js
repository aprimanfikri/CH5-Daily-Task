const router = require("express").Router();
const upload = require("../middlewares/uploader");

const Product = require("../controllers/productController");
const authentication = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkOwner");

router
  .route("/")
  .get(authentication, Product.getAll)
  .post(
    authentication,
    checkRole("Owner"),
    checkOwnership,
    upload.single("image"),
    Product.create
  );

router
  .route("/:id")
  .get(Product.getOne)
  .put(upload.single("image"), Product.update)
  .delete(Product.remove);

module.exports = router;
