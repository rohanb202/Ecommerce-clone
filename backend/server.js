import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";

dotenv.config();
const app = express();
connectDb();

//parse json data in req.body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

//if any of the upper routes don't work below code fires off
app.use((req, res, next) => {
  const error = new Error(`Not found- ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server on ${PORT} in ${process.env.NODE_ENV} mode`);
});
