import jwt from "jsonwebtoken";

const genrateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "6h",
  });
  return token;
};

export default genrateToken;
