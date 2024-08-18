const { Router } = require("express");
const {
  getCartItems,
  addCartItem,
  deleteCartItems,
} = require("../controler/cartController");
const { validateToken } = require("../util/jwtToken");
const router = Router();

router.get("/", validateToken, getCartItems);
router.post("/add-Item", validateToken, addCartItem);
router.delete("/", validateToken, deleteCartItems);

module.exports = router;
