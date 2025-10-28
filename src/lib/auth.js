import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const verifyToken = (token) => {
  if (!token) throw new Error("No token provided");

  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded; // decoded payload
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
