const { Router } = require("express");
const {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
} = require("../controler/productControler");
const {
  sanitizeAndValidateProduct,
  sanitizeAndValidateUpdateProduct,
} = require("../util/validator");
const { validateAdminToken } = require("../util/jwtToken");

const router = Router();

router.get("/:productId", getProduct);
router.get("/", getAllProduct);
router.post("/", validateAdminToken, sanitizeAndValidateProduct, addProduct);
router.patch(
  "/:productId",
  validateAdminToken,
  sanitizeAndValidateUpdateProduct,
  updateProduct
);
router.delete("/:produtId", validateAdminToken, deleteProduct);
module.exports = router;
