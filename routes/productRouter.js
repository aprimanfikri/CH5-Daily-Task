const router = require("express").Router();

const Product = require("../controllers/productController");

router.route("/").get(Product.findProducts).post(Product.createProduct);
router
  .route("/:id")
  .get(Product.findProductById)
  .put(Product.updateProduct)
  .delete(Product.deleteProduct);

module.exports = router;
