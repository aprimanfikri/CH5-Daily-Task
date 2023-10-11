const router = require("express").Router();
const upload = require("../middlewares/uploader");

const Product = require("../controllers/productController");
const authentication = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router
  .route("/")
  .get(authentication, checkRole("Owner"), Product.findProducts)
  .post(upload.single("image"), Product.createProduct);
router
  .route("/:id")
  .get(Product.findProductById)
  .put(upload.single("image"), Product.updateProduct)
  .delete(Product.deleteProduct);

module.exports = router;
