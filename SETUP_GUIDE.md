# Shield AI - Complete Setup Guide

## Features Implemented

### 1. **Authentication System**
- ✅ Email/Password Sign Up with validation
- ✅ Email/Password Sign In with JWT tokens
- ✅ Sign Out functionality
- ✅ Google OAuth Sign In (integrated, needs configuration)
- ✅ Session management with localStorage
- ✅ Protected routes and API endpoints

### 2. **User Activity Tracking**
- ✅ Activity logging for all user actions (login, signup, certificate uploads)
- ✅ Admin dashboard to view all activities
- ✅ User management interface
- ✅ Timestamped activity records
- ✅ MongoDB activities collection

### 3. **Admin Dashboard** (NEW)
- ✅ User Activity Log - View all user actions with timestamps
- ✅ Registered Users List - See all registered users and their details
- ✅ Activity filtering and sorting
- ✅ User statistics and certificates count
- ✅ Accessible at: `/admin` (requires authentication)

### 4. **Google OAuth Integration** (NEW)
- ✅ Backend Google token verification
- ✅ Frontend Google button UI
- ✅ User creation/linking with Google ID
- ✅ Requires Google OAuth Client ID configuration

## Prerequisites

### Required Software
1. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/

2. **MongoDB** (Required for database)
   - Option A: Local MongoDB installation
     - Windows: Download from https://www.mongodb.com/try/download/community
     - Start MongoDB service: `net start MongoDB`
   - Option B: MongoDB Atlas Cloud (Recommended)
     - Create free account: https://www.mongodb.com/cloud/atlas
     - Create cluster and get connection string

3. **Git** (Optional, for version control)
   - Download: https://git-scm.com/

## Installation & Setup

### Step 1: Install Dependencies
```bash
# Navigate to project directory
cd "c:\Users\cheta\OneDrive\Desktop\Buildathon\shield-ai"

# Install all dependencies
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory:
```bash
# Backend
MONGODB_URI=mongodb://localhost:27017/shield-ai
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/shield-ai?retryWrites=true&w=majority

PORT=5000
JWT_SECRET=your_secret_key_here_change_this
CLIENT_URL=http://localhost:8080

# Google OAuth (Optional, for Google Sign In)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### Step 3: Setup Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 Credentials (Web Application)
5. Add `http://localhost:8080` to authorized redirect URIs
6. Copy Client ID and add to `.env` file as `VITE_GOOGLE_CLIENT_ID`

### Step 4: Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows Command Prompt (Admin)
net start MongoDB

# Or use MongoDB Compass GUI
```

**Option B: MongoDB Atlas** (Cloud)
- Already running, just use connection string in .env

### Step 5: Start the Application

**Terminal 1 - Backend Server**
```bash
cd "c:\Users\cheta\OneDrive\Desktop\Buildathon\shield-ai"
npm run server
# Server will run on http://localhost:5000
```

**Terminal 2 - Frontend Dev Server**
```bash
cd "c:\Users\cheta\OneDrive\Desktop\Buildathon\shield-ai"
npm run dev
# Application will run on http://localhost:8080
```

**Or run both simultaneously:**
```bash
npm run dev:all
# This starts both servers in one command (requires concurrently)
```

## Accessing Features

### 1. **Sign Up / Sign In**
- Navigate to: `http://localhost:8080/signin`
- Create a new account or login with existing credentials
- Test with email: `test@example.com` and password: `password123`

### 2. **Google Sign In** (Optional)
- Click "Sign in with Google" button on login page
- Requires Google OAuth Client ID configured
- Will create account automatically if doesn't exist

### 3. **Upload Certificates**
- After login, go to: `http://localhost:8080/certificates`
- Upload certificate files
- Verify certificate details
- All certificates stored in MongoDB

### 4. **Admin Dashboard** (NEW)
- Navigate to: `http://localhost:8080/admin`
- View all user activities with timestamps
- See registered users and their details
- Monitor login/signup events
- Track certificate uploads

## API Endpoints

### Authentication Routes
```
POST   /api/auth/signup           - Register new user
POST   /api/auth/signin           - Login with email/password
POST   /api/auth/google-signin    - Login with Google token
GET    /api/auth/me               - Get current user (requires token)
POST   /api/auth/certificates     - Upload certificate (requires token)
GET    /api/auth/admin/activities - Get all activities (requires token)
GET    /api/auth/admin/users      - Get all users (requires token)
```

### Example Requests

**Sign Up**
```bash
POST /api/auth/signup
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "John Doe"
}
```

**Sign In**
```bash
POST /api/auth/signin
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}

Response: { token, user: { id, email, name, certificates } }
```

**Google Sign In**
```bash
POST /api/auth/google-signin
{
  "credential": "<Google JWT Token>"
}

Response: { token, user: { id, email, name, profilePicture, certificates } }
```

**Add Certificate**
```bash
POST /api/auth/certificates
Headers: Authorization: Bearer <token>
{
  "certificateName": "AWS Certification",
  "certificateDetails": "AWS Solutions Architect Professional"
}
```

**Get Activities**
```bash
GET /api/auth/admin/activities
Headers: Authorization: Bearer <token>

Response: { activities: [...] }
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  googleId: String (optional),
  loginMethod: "email" | "google",
  profilePicture: String (optional),
  certificates: [
    {
      name: String,
      details: String,
      uploadedAt: Date
    }
  ],
  createdAt: Date,
  lastLogin: Date
}
```

### Activities Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  action: String ("user_login" | "user_signup" | "google_login" | "certificate_added"),
  details: String,
  timestamp: Date,
  ipAddress: String (optional)
}
```

## Troubleshooting

### Issue: "MongoDB connection refused"
**Solution:**
- Ensure MongoDB is running: `net start MongoDB`
- Or update MONGODB_URI in .env to Atlas connection string
- Check MongoDB service in Services tab (Windows)

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or use different port in .env
PORT=5001
```

### Issue: "Port 8080 already in use"
**Solution:**
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Or modify Vite config to use different port
```

### Issue: "CORS error when calling API"
**Solution:**
- Ensure backend server is running on port 5000
- Check CORS settings in server/server.js
- Verify CLIENT_URL in .env matches frontend URL

### Issue: "Google Sign In not working"
**Solution:**
- Configure Google OAuth credentials
- Add VITE_GOOGLE_CLIENT_ID to .env
- Ensure authorized redirect URI includes localhost:8080
- Check browser console for detailed errors

### Issue: "Token expired"
**Solution:**
- Tokens expire after 7 days
- User needs to sign in again
- Check JWT_SECRET in .env matches between sessions

## Development Commands

```bash
# Start frontend dev server
npm run dev

# Start backend server
npm run server

# Start backend with auto-reload
npm run server:dev

# Start both simultaneously
npm run dev:all

# Build for production
npm build

# Run linting
npm run lint
```

## Project Structure

```
shield-ai/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   │   ├── Admin.tsx       # Admin dashboard (NEW)
│   │   ├── SignIn.tsx      # Login page (Updated with Google OAuth)
│   │   ├── SignUp.tsx      # Registration page
│   │   ├── Certificates.tsx # Certificate upload
│   │   └── Index.tsx       # Home page
│   ├── context/
│   │   └── AuthContext.tsx # Global auth state
│   └── App.tsx             # Main app component
├── server/
│   ├── routes/
│   │   └── auth.js         # Auth endpoints (Updated with Google OAuth)
│   ├── middleware/
│   │   └── auth.js         # JWT verification (Updated with Google token verification)
│   ├── models/
│   │   └── User.js         # Database operations (Updated with activity tracking)
│   └── server.js           # Express server
├── .env                    # Environment variables (Create this)
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS config
└── package.json           # Dependencies
```

## Recent Updates

### Version 1.1 (Latest)
- ✅ Added Admin Dashboard with activity tracking
- ✅ Implemented Google OAuth Sign In
- ✅ Added activity logging for all user actions
- ✅ Created admin API endpoints for activities and users
- ✅ Enhanced User model with activity functions
- ✅ Updated authentication middleware for Google tokens

## Next Steps

1. **Configure MongoDB** - Set up local MongoDB or MongoDB Atlas
2. **Create .env file** - Add required environment variables
3. **Setup Google OAuth** (Optional) - Configure Google credentials
4. **Start servers** - Run backend and frontend
5. **Test authentication** - Create account and test login
6. **Access admin dashboard** - Monitor user activities

## Support & Documentation

- **MongoDB Docs**: https://docs.mongodb.com/
- **Express.js Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/

## License

This project is part of the Buildathon challenge.

---

**Last Updated:** December 2025
**Status:** ✅ Ready for Testing
