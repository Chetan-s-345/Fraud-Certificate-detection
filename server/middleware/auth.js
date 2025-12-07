import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyGoogleToken = async (token) => {
  try {
    const decoded = jwtDecode(token);
    // Check if token is not expired
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Google token verification error:", error);
    return null;
  }
};
