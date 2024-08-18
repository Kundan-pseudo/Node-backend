const _ = require("lodash");
const { cartModel, productModel } = require("../db");
const { tryCatchWrapper } = require("../util/tryCatchWrapper");

const getCartItems = tryCatchWrapper(async (req, res) => {
  const userId = req.userDetails?.userID;
  const cartContent = (await cartModel.findOne({ userId: userId })) || [];
  if (_.isEmpty(cartContent))
    return res.status(200).json({ message: "Cart is Empty" });
  const cartDetails = await cartContent.cartDetails.reduce(async (acc, ele) => {
    const { productId, quantity } = ele;

    let product = await productModel.findById(productId);
    if (!product) return acc;
    product = { ...product._doc, productId, quantity };
    acc.push(product);
    return acc;
  }, []);
  return res.status(200).json(cartDetails);
});

const addCartItem = tryCatchWrapper(async (req, res) => {
  const userId = req.userDetails?.userID;
  const { productId = "", quantity = 0 } = req.body;

  const session = await cartModel.startSession();
  session.startTransaction();
  try {
    let cart = await cartModel.findOne({ userId }).session(session);
    if (_.isEmpty(cart)) {
      cart = new cartModel({
        userId: userId,
        createdAt: new Date(),
        cartDetails: [{ productId, quantity }],
      });
    } else {
      const productIndex = cart.cartDetails.findIndex(
        (ele) => ele.productId.toString() === productId
      );
      if (productIndex !== -1) {
        cart.cartDetails[productIndex].quantity += quantity;
      } else {
        cart.cartDetails.push({
          productId,
          quantity,
        });
      }
    }
    cart = await cart.save({ session });
    await session.commitTransaction();
    session.endSession();
    return res.status(200).json(cart);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});

const deleteCartItems = tryCatchWrapper(async (req, res) => {
  const userId = req.userDetails?.userID;
  console.log(req.body);
  if (_.isEmpty(req.body)) {
    await cartModel.deleteOne({ userId });
    return res.status(200).json({ message: "Your cart is empty" });
  }
  const { productId = "", quantity = 0 } = req.body;
  let cart = await cartModel.findOne({ userId });
  const productInd = cart.cartDetails.findIndex((ele) => {
    return ele.productId.toString() === productId;
  });
  if (productInd !== -1) {
    if (cart.cartDetails[productInd].quantity - quantity <= 0)
      cart.cartDetails.splice(productInd, 1);
    else cart.cartDetails[productInd].quantity -= quantity;
    const updatedcart = await cart.save();
    return res.status(200).json(updatedcart);
  }
  return res.status(200).json({ message: "product Not found" });
});

module.exports = { getCartItems, addCartItem, deleteCartItems };
