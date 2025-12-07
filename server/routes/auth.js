import express from "express";
import {
  createUser,
  findUserByEmail,
  findUserByGoogleId,
  comparePassword,
  findUserById,
  addCertificate,
  logActivity,
  updateUserLastLogin,
  getActivities,
  getUserActivities,
  getAllUsers,
  updateUserGoogleId,
} from "../models/User.js";
import { generateToken, verifyToken, verifyGoogleToken } from "../middleware/auth.js";

const router = express.Router();

// Sign Up
router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Email, password, and name are required" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    await createUser({ email, password, name });

    return res
      .status(201)
      .json({ message: "User created successfully. Please sign in." });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error during signup" });
  }
});

// Sign In
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id.toString(), user.email);
    await updateUserLastLogin(user._id.toString());
    await logActivity(user._id.toString(), "user_login", "User logged in");

    return res.status(200).json({
      message: "Sign in successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        certificates: user.certificates || [],
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Server error during signin" });
  }
});

// Google Sign In
router.post("/google-signin", async (req, res) => {
  try {
    const { tokenId, credential } = req.body;

    // Verify Google token
    const decodedToken = await verifyGoogleToken(credential || tokenId);

    if (!decodedToken) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    const { email, name, picture, sub: googleId } = decodedToken;

    // Check if user exists
    let user = await findUserByGoogleId(googleId);

    if (!user) {
      // Create new user
      user = await findUserByEmail(email);
      if (!user) {
        await createUser({
          email,
          name,
          googleId,
          loginMethod: "google",
          profilePicture: picture,
        });
        user = await findUserByEmail(email);
      } else {
        // Link Google ID to existing user
        await updateUserGoogleId(user._id.toString(), googleId, picture);
        user = await findUserById(user._id.toString());
      }
    }

    const token = generateToken(user._id.toString(), user.email);
    await updateUserLastLogin(user._id.toString());
    await logActivity(user._id.toString(), "google_login", "User logged in with Google");

    return res.status(200).json({
      message: "Google sign in successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
        certificates: user.certificates || [],
      },
    });
  } catch (error) {
    console.error("Google signin error:", error);
    return res.status(500).json({ message: "Server error during Google signin" });
  }
});

// Get Current User
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await findUserById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        certificates: user.certificates || [],
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Add Certificate Verification
router.post("/certificates", verifyToken, async (req, res) => {
  try {
    const { certificateName, certificateDetails } = req.body;

    if (!certificateName) {
      return res
        .status(400)
        .json({ message: "Certificate name is required" });
    }

    await addCertificate(req.userId, {
      name: certificateName,
      details: certificateDetails,
    });

    return res.status(201).json({
      message: "Certificate verified and stored successfully",
    });
  } catch (error) {
    console.error("Certificate error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Admin: Get all activities
router.get("/admin/activities", verifyToken, async (req, res) => {
  try {
    const activities = await getActivities();
    return res.status(200).json({ activities });
  } catch (error) {
    console.error("Get activities error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Admin: Get user activities
router.get("/admin/user-activities/:userId", verifyToken, async (req, res) => {
  try {
    const activities = await getUserActivities(req.params.userId);
    return res.status(200).json({ activities });
  } catch (error) {
    console.error("Get user activities error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Admin: Get all users
router.get("/admin/users", verifyToken, async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
