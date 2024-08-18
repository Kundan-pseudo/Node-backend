const z = require("zod");
const { tryCatchWrapper } = require("./tryCatchWrapper");

const userLoginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});
const createUserSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  role: z.enum(["client", "admin"]),
});
const productSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number().min(0),
  rating: z.number().min(0).max(5).optional(),
  image: z.string().url().optional(),
});
const productUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  rating: z.number().min(0).max(5).optional(),
  image: z.string().url().optional(),
});

const sanitizeAndValidateLoginInput = tryCatchWrapper(
  async (req, res, next) => {
    userLoginSchema.parse(req.body);
    next();
  }
);
const sanitizeAndValidateCreateUserInput = tryCatchWrapper(
  async (req, res, next) => {
    createUserSchema.parse(req.body);
    next();
  }
);
const sanitizeAndValidateProduct = tryCatchWrapper(async (req, res, next) => {
  productSchema.parse(req.body);
  next();
});

const sanitizeAndValidateUpdateProduct = tryCatchWrapper(
  async (req, res, next) => {
    productUpdateSchema.parse(req.body);
    next();
  }
);

module.exports = {
  sanitizeAndValidateLoginInput,
  sanitizeAndValidateCreateUserInput,
  sanitizeAndValidateProduct,
  sanitizeAndValidateUpdateProduct,
};
