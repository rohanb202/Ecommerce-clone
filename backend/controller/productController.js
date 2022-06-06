import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});
export { getAllProducts, getProduct };
