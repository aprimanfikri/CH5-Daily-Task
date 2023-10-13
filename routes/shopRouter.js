const express = require("express");

const Shop = require("../controllers/shopController");
const authentication = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkOwner");

const router = express.Router();

router
  .route("/")
  .get(authentication, checkRole("Owner"), Shop.getAll)
  .post(authentication, checkRole("Owner"), Shop.create);

router
  .route("/:id")
  .get(authentication, Shop.getOne)
  .put(authentication, checkRole("Owner"), checkOwnership, Shop.update)
  .delete(authentication, checkRole("Owner"), checkOwnership, Shop.remove);

module.exports = router;
