const { Router } = require("express");
const {
  sanitizeAndValidateLoginInput,
  sanitizeAndValidateCreateUserInput,
} = require("../util/validator");
const {
  authenticateUserLogin,
  handleUserSignUp,
} = require("../controler/userControler");

const router = Router();

router.post("/login", sanitizeAndValidateLoginInput, authenticateUserLogin);
router.post("/sign-up", sanitizeAndValidateCreateUserInput, handleUserSignUp);

module.exports = router;
