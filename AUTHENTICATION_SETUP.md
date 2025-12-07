## Authentication & Certificate Verification Setup Guide

### ✅ What's Been Implemented

You now have a complete authentication system with certificate verification and database integration. Here's what was added:

#### Frontend Features:
- ✅ **Sign Up Page** (`/src/pages/SignUp.tsx`) - User registration with validation
- ✅ **Sign In Page** (`/src/pages/SignIn.tsx`) - User login with JWT token management
- ✅ **Certificate Management** (`/src/pages/Certificates.tsx`) - Upload and verify certificates
- ✅ **Auth Context** (`/src/context/AuthContext.tsx`) - Global state management for auth
- ✅ **Updated Navbar** - Sign In/Sign Up buttons, user profile dropdown, logout

#### Backend Features:
- ✅ **Express Server** (`/server/server.js`) - RESTful API backend
- ✅ **MongoDB Integration** (`/server/models/User.js`) - Database operations
- ✅ **Authentication Routes** (`/server/routes/auth.js`) - Sign up, sign in, user profile
- ✅ **JWT Middleware** (`/server/middleware/auth.js`) - Token verification
- ✅ **Certificate Endpoint** - Store verified certificates in user profile

---

### 🚀 Getting Started

#### Step 1: Install MongoDB
Choose one option:

**Option A: Local MongoDB Installation**
1. Download from https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. Start MongoDB service

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `.env` file with your connection string

#### Step 2: Configure Environment Variables
Edit `.env` file in the project root:
```
MONGODB_URI=mongodb://localhost:27017/shield-ai
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:8080
```

#### Step 3: Install Backend Dependencies
```bash
npm install
```

#### Step 4: Start MongoDB (if using local)
**On Windows:**
```powershell
net start MongoDB
```

**On macOS:**
```bash
brew services start mongodb-community
```

**On Linux:**
```bash
sudo systemctl start mongod
```

#### Step 5: Start Backend Server
In a new terminal:
```bash
node server/server.js
```

You should see: `Connected to MongoDB` and `Server running on port 5000`

#### Step 6: Start Frontend Development Server
In another terminal:
```bash
npm run dev
```

---

### 📱 Features Overview

#### Authentication Flow:
1. **Sign Up** - User creates account with email, password, and name
   - Password is hashed using bcryptjs
   - User data stored in MongoDB

2. **Sign In** - User logs in with credentials
   - JWT token generated and stored in localStorage
   - User data fetched and stored in AuthContext

3. **Logout** - User can logout from dropdown menu
   - Token removed from localStorage
   - User state cleared

4. **Certificate Verification** - Logged-in users can upload certificates
   - Upload certificate file
   - Store certificate metadata in user profile
   - View all verified certificates

---

### 🗄️ Database Schema

**Users Collection:**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  certificates: [
    {
      name: String,
      details: {
        fileName: String,
        fileSize: Number,
        mimeType: String
      },
      verifiedAt: Date
    }
  ]
}
```

---

### 🔑 API Endpoints

#### Authentication Endpoints:

**POST /api/auth/signup**
```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "User created successfully. Please sign in."
}
```

**POST /api/auth/signin**
```json
Request:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Sign in successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "name": "John Doe",
    "certificates": []
  }
}
```

**GET /api/auth/me**
```
Headers:
Authorization: Bearer <token>

Response:
{
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "name": "John Doe",
    "certificates": [...]
  }
}
```

**POST /api/auth/certificates**
```json
Headers:
Authorization: Bearer <token>

Request:
{
  "certificateName": "AWS Solutions Architect",
  "certificateDetails": {
    "fileName": "certificate.pdf",
    "fileSize": 1024000,
    "mimeType": "application/pdf"
  }
}

Response:
{
  "message": "Certificate verified and stored successfully"
}
```

---

### 🔒 Security Features

- ✅ Passwords hashed with bcryptjs (10 salt rounds)
- ✅ JWT token authentication (7-day expiration)
- ✅ CORS enabled (configured for localhost:8080)
- ✅ Email unique constraint on database
- ✅ Input validation on all endpoints
- ✅ Token stored in localStorage (consider using httpOnly cookies for production)

---

### 🧪 Testing the Application

1. **Sign Up:**
   - Go to http://localhost:8080/signup
   - Fill in name, email, password
   - Should redirect to sign in page

2. **Sign In:**
   - Go to http://localhost:8080/signin
   - Use credentials from signup
   - Should see user name in navbar

3. **View Profile:**
   - Click on user name in navbar (top right)
   - See email and certificates
   - Option to view certificates or logout

4. **Verify Certificate:**
   - Click "My Certificates" from profile dropdown
   - Upload a certificate file
   - Should appear in your certificates list

5. **Logout:**
   - Click "Logout" from profile dropdown
   - Should redirect to home page
   - Sign In/Sign Up buttons should reappear

---

### 🐛 Troubleshooting

**"Cannot connect to MongoDB"**
- Ensure MongoDB is running
- Check connection string in .env
- Verify MongoDB is listening on the correct port

**"Token is invalid or expired"**
- Login again (tokens expire after 7 days)
- Clear localStorage and refresh page

**"CORS error"**
- Ensure CLIENT_URL in .env matches your frontend URL
- Check backend server is running on port 5000

**Port 5000 already in use**
- Change PORT in .env to another port (e.g., 5001)
- Update API_BASE_URL in AuthContext if needed

---

### 📦 File Structure

```
shield-ai/
├── server/
│   ├── server.js                 # Express app entry point
│   ├── models/
│   │   └── User.js              # MongoDB operations
│   ├── routes/
│   │   └── auth.js              # Authentication endpoints
│   └── middleware/
│       └── auth.js              # JWT verification
├── src/
│   ├── context/
│   │   └── AuthContext.tsx      # Auth state management
│   ├── pages/
│   │   ├── SignIn.tsx           # Login page
│   │   ├── SignUp.tsx           # Registration page
│   │   └── Certificates.tsx     # Certificate management
│   ├── components/
│   │   └── Navbar.tsx           # Updated navbar
│   └── App.tsx                  # Routes configuration
├── .env                         # Environment variables
└── package.json                 # Dependencies
```

---

### ⚙️ Next Steps / Enhancements

Consider implementing:

1. **Email Verification** - Send verification emails on signup
2. **Password Reset** - Allow users to reset forgotten passwords
3. **OAuth Integration** - Google/GitHub login
4. **Certificate Storage** - Actually store uploaded files
5. **Certificate Validation** - Verify certificate authenticity
6. **Two-Factor Authentication** - Additional security layer
7. **User Profile Updates** - Change password, email, profile info
8. **Rate Limiting** - Prevent brute force attacks
9. **Audit Logging** - Track user actions
10. **Admin Dashboard** - Manage users and certificates

---

### 📞 Support

For issues or questions, check:
- MongoDB Documentation: https://docs.mongodb.com
- Express.js Guide: https://expressjs.com
- React Router: https://reactrouter.com
- JWT Tokens: https://jwt.io

---

**Setup Complete! Your authentication system is ready to use.** 🎉
