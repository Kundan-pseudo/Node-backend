const express = require("express");
const bodyParser = require("body-parser");
const { userRoutes, productRoutes, cartRoutes } = require("./routes");
const exceptionHandlers = require("./exception/handler");

const app = express();

// Middleware
app.use(bodyParser.json({}));

// routes
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

// Exception Handler
app.use(exceptionHandlers);

app.listen(8000, () => {
  console.log("Server started at 8000");
});
