const { productModel } = require("../db");
const _ = require("lodash");
const ProductError = require("../exception/ProductError");
const { tryCatchWrapper } = require("../util/tryCatchWrapper");

const getProduct = tryCatchWrapper(async (req, res) => {
  const productId = req.params.productId;
  const productDetails = await productModel.findById(productId);
  if (_.isEmpty(productDetails))
    throw new ProductError(404, "Product Not Found");
  return res.status(200).json(productDetails);
});

const getAllProduct = tryCatchWrapper(async (req, res) => {
  const allProduct = await productModel.find({});
  if (_.isEmpty(allProduct)) throw new ProductError(404, "Products Not Found");
  return res.status(200).json(allProduct);
});

const addProduct = tryCatchWrapper(async (req, res) => {
  const { name, description, price, rating, image } = req.body;
  const newProduct = new productModel({
    name,
    description,
    price,
    rating,
    image,
  });
  await newProduct.save();
  return res
    .status(200)
    .json({ message: `${newProduct.name} added succesfully` });
});

const updateProduct = tryCatchWrapper(async (req, res) => {
  const productId = req.params.productId;
  const updatedDetails = req.body;
  const updatedProduct = await productModel.findByIdAndUpdate(
    productId,
    updatedDetails,
    { new: true }
  );
  return res.status(200).json(updatedProduct);
});
const deleteProduct = tryCatchWrapper(async (req, res) => {
  const productId = req.params.productId;
  const productDetails = await productModel
    .deleteMany()
    .where({ _id: productId });
  return res.status(200).json(productDetails);
});
module.exports = {
  getProduct,
  getAllProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
