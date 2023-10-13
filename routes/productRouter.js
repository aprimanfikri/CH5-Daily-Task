const router = require("express").Router();
const upload = require("../middlewares/uploader");

const Product = require("../controllers/productController");
const authentication = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkOwner");

router.route("/").get(authentication, checkRole, Product.findProducts);

router
  .route("/:id")
  .get(Product.findProductById)
  .put(upload.single("image"), Product.updateProduct)
  .delete(Product.deleteProduct);

router
  .route("/:shopId/shop")
  .post(
    authentication,
    checkRole("Owner"),
    checkOwnership,
    upload.single("image"),
    Product.createProduct
  );

module.exports = router;
