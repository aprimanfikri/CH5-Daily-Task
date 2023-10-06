const router = require("express").Router();
const upload = require("../middlewares/uploader");

const Product = require("../controllers/productController");

router
  .route("/")
  .get(Product.findProducts)
  .post(upload.single("image"), Product.createProduct);
router
  .route("/:id")
  .get(Product.findProductById)
  .put(upload.single("image"), Product.updateProduct)
  .delete(Product.deleteProduct);

module.exports = router;
