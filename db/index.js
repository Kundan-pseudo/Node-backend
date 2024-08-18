const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://kundan-pseudo:nCGDBo3cydbPg8zY@cluster0.ic1fl7j.mongodb.net/PujaDB?retryWrites=true&w=majority"
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  rating: Number,
  image: String,
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: { type: Date, default: () => Date.now() },
  orderDetails: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: Number,
    },
  ],
  status: String,
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: { type: Date, default: () => Date.now() },
  cartDetails: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: Number,
    },
  ],
});

const userModel = mongoose.model("users", userSchema);
const productModel = mongoose.model("products", productSchema);
const orderModel = mongoose.model("orders", orderSchema);
const cartModel = mongoose.model("carts", cartSchema);

module.exports = { userModel, productModel, orderModel, cartModel };
