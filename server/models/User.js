import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { useMockDB } from "./mockDB.js";

let db;
let client;
let useMock = false;

export const connectDB = async () => {
  try {
    client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    
    console.log(`🔄 Connecting to MongoDB: ${process.env.MONGODB_URI}`);
    await client.connect();
    
    db = client.db();
    console.log("✅ Connected to MongoDB successfully");
    useMock = false;
    return db;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(`   URI: ${process.env.MONGODB_URI}`);
    console.error(`   Message: ${error.message}`);
    
    // Use mock database for testing
    if (error.message.includes("ECONNREFUSED")) {
      console.warn("\n⚠️  Using IN-MEMORY MOCK DATABASE for testing");
      console.warn("   ⚠️  DATA WILL NOT PERSIST AFTER SERVER RESTART!");
      console.warn("\n💡 To fix:");
      console.warn("   1. Install MongoDB: See MONGODB_SETUP.md");
      console.warn("   2. Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas");
      console.warn("   3. Start MongoDB and update .env with correct URI");
      console.warn("   4. Restart the server\n");
      
      const mockClient = useMockDB();
      db = mockClient.db();
      useMock = true;
      return db;
    }
    
    throw error;
  }
};

export const getDB = () => db;
export const isMockDB = () => useMock;

// Create collections
export const createUserCollections = async () => {
  const collections = await db.listCollections().toArray();
  const userCollectionExists = collections.some((col) => col.name === "users");
  const activityCollectionExists = collections.some(
    (col) => col.name === "activities"
  );

  if (!userCollectionExists) {
    await db.createCollection("users");
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
  }

  if (!activityCollectionExists) {
    await db.createCollection("activities");
    await db
      .collection("activities")
      .createIndex({ userId: 1, timestamp: -1 });
  }
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const createUser = async (userData) => {
  const hashedPassword = userData.password
    ? await hashPassword(userData.password)
    : null;

  const user = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    certificates: [],
    loginMethod: userData.loginMethod || "email",
    googleId: userData.googleId || null,
    lastLogin: new Date(),
  };

  const result = await db.collection("users").insertOne(user);
  logActivity(result.insertedId.toString(), "user_created", "User registered");
  return result;
};

export const findUserByEmail = async (email) => {
  return await db.collection("users").findOne({ email });
};

export const findUserByGoogleId = async (googleId) => {
  return await db.collection("users").findOne({ googleId });
};

export const findUserById = async (id) => {
  return await db.collection("users").findOne({ _id: new ObjectId(id) });
};

export const updateUserLastLogin = async (userId) => {
  await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $set: { lastLogin: new Date() } }
  );
};

export const addCertificate = async (userId, certificateData) => {
  const result = await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    {
      $push: {
        certificates: {
          ...certificateData,
          verifiedAt: new Date(),
        },
      },
    }
  );

  logActivity(
    userId,
    "certificate_added",
    `Certificate added: ${certificateData.name}`
  );
  return result;
};

export const getUserCertificates = async (userId) => {
  const user = await findUserById(userId);
  return user?.certificates || [];
};

// Activity Logging
export const logActivity = async (userId, action, details) => {
  try {
    let userIdValue = userId;
    // Handle ObjectId conversion for mock DB
    if (useMock) {
      userIdValue = userId;
    } else {
      userIdValue = typeof userId === 'string' ? new ObjectId(userId) : userId;
    }
    
    const activity = {
      userId: userIdValue,
      action,
      details,
      timestamp: new Date(),
      ipAddress: null,
    };
    
    await db.collection("activities").insertOne(activity);
  } catch (error) {
    console.error("Error logging activity:", error.message);
    // Don't throw - activities are non-critical
  }
};

export const getActivities = async (limit = 100) => {
  const activities = await db
    .collection("activities")
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $sort: { timestamp: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          userId: 1,
          action: 1,
          details: 1,
          timestamp: 1,
          "user.name": 1,
          "user.email": 1,
        },
      },
    ])
    .toArray();

  return activities;
};

export const getUserActivities = async (userId, limit = 50) => {
  try {
    let userIdValue = userId;
    if (!useMock) {
      userIdValue = typeof userId === 'string' ? new ObjectId(userId) : userId;
    }
    
    const activities = await db
      .collection("activities")
      .find({ userId: userIdValue })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();

    return activities;
  } catch (error) {
    console.error("Error getting user activities:", error.message);
    return [];
  }
};

export const getAllUsers = async () => {
  const users = await db
    .collection("users")
    .find({})
    .project({ password: 0 })
    .toArray();

  return users;
};

export const updateUserGoogleId = async (userId, googleId, profilePicture) => {
  try {
    let userIdValue = userId;
    if (!useMock) {
      userIdValue = typeof userId === 'string' ? new ObjectId(userId) : userId;
    }
    
    const result = await db.collection("users").updateOne(
      { _id: userIdValue },
      {
        $set: {
          googleId,
          loginMethod: "google",
          profilePicture: profilePicture || null,
        },
      }
    );
    return result;
  } catch (error) {
    console.error("Error updating user Google ID:", error.message);
    return { modifiedCount: 0 };
  }
};
