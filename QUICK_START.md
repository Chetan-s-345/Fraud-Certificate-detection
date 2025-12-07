# 🚀 Quick Start - Shield AI (Current Status)

## ✅ SYSTEM IS LIVE & WORKING!

- **Website**: http://localhost:8082 ✅
- **Backend**: http://localhost:5000 ✅
- **Database**: In-memory mock DB (persists during session)
- **Admin Dashboard**: http://localhost:8082/admin ✅

---

## 🎯 Test Right Now (No Setup Needed!)

### 1. Open Website
```
http://localhost:8082
```

### 2. Sign Up
```
1. Click "Sign Up"
2. Enter:
   - Name: John Doe
   - Email: john@gmail.com (any valid email works)
   - Password: Test123456
3. Click "Sign Up"
→ Automatically logged in
```

### 3. View Admin Dashboard
```
1. After login, click "Admin" in menu OR
2. Go to: http://localhost:8082/admin
→ See your login tracked in activities
```

### 4. Sign Out & Sign In Again
```
1. Click "Sign Out"
2. Click "Sign In"
3. Enter same email and password
→ See login activity logged in admin dashboard
```

---

## 📊 Login/Logout Tracking

### What Gets Recorded?

✅ **Sign Up**: User created account
✅ **Sign In**: User logged in with timestamp
✅ **Sign Out**: User logged out
✅ **Certificates**: User uploaded file

### Where to View?

**Admin Dashboard**: http://localhost:8082/admin

Shows:
- User name and email
- Action (login/signup/logout)
- Timestamp of action
- All activities sorted by recent

---

## 📝 Email Validation

✅ **Any valid email works**, including:
- `user@gmail.com`
- `john@outlook.com`
- `admin@company.co.uk`
- `test.user+tag@domain.com`

All email formats supported!

---

## Starting the Application (If Servers Stopped)

### 1️⃣ Terminal 1: Start Backend Server
```powershell
cd "c:\Users\cheta\OneDrive\Desktop\Buildathon\shield-ai"
npm run server
```

**Expected Output:**
```
🔄 Connecting to MongoDB: mongodb://localhost:27017/shield-ai
⚠️  Using IN-MEMORY MOCK DATABASE for testing
✅ Server running on port 5000
📦 Database connected and ready
```

### 2️⃣ Terminal 2: Start Frontend
```powershell
cd "c:\Users\cheta\OneDrive\Desktop\Buildathon\shield-ai"
npm run dev
```

**Expected Output:**
```
VITE v7.2.6 ready in XXX ms

➜  Local:   http://localhost:8082/
```

Then open: http://localhost:8082

---

## User Flows

### ➡️ New User Registration
```
Home → Sign Up → Fill Form → Create Account → Redirects to Home (logged in)
```

### ➡️ Existing User Login
```
```
Home → Sign In → Enter Credentials → Success → Shows User Name in Navbar
```

### ➡️ Certificate Verification
```
User Menu → My Certificates → Upload File → Verify → Stored in DB
```

### ➡️ User Logout
```
User Menu → Logout → Clears Token → Returns to Home
```

---

## File Locations

| File | Purpose | Location |
|------|---------|----------|
| SignIn | Login page | `src/pages/SignIn.tsx` |
| SignUp | Register page | `src/pages/SignUp.tsx` |
| Certificates | Certificate mgmt | `src/pages/Certificates.tsx` |
| AuthContext | Auth state | `src/context/AuthContext.tsx` |
| Navbar | Navigation | `src/components/Navbar.tsx` |
| Backend | Express server | `server/server.js` |
| Models | DB operations | `server/models/User.js` |
| Routes | API endpoints | `server/routes/auth.js` |
| Config | Environment vars | `.env` |

---

## Key URLs

| Page | URL | Auth Required |
|------|-----|---------------|
| Home | `http://localhost:8080/` | ❌ No |
| Sign In | `http://localhost:8080/signin` | ❌ No |
| Sign Up | `http://localhost:8080/signup` | ❌ No |
| Certificates | `http://localhost:8080/certificates` | ✅ Yes |

---

## Database Info

**Database Name:** `shield-ai`

**Collections:**
- `users` - Stores user accounts and certificates

**Connection String:**
```
mongodb://localhost:27017/shield-ai
```

---

## Environment Variables

```env
# Backend
MONGODB_URI=mongodb://localhost:27017/shield-ai
JWT_SECRET=your_jwt_secret_key_here
PORT=5000

# Frontend
VITE_API_URL=http://localhost:5000
```

---

## Common Commands

```powershell
# Install dependencies
npm install

# Start backend only
node server/server.js

# Start frontend only
npm run dev

# Start both (if concurrently installed)
npm run dev:all

# Build for production
npm run build

# Check for issues
npm run lint
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection error | Start MongoDB service / Check connection string |
| Port 5000 in use | Change PORT in .env to different port |
| CORS error | Check CLIENT_URL matches frontend URL |
| Can't login | Check .env MONGODB_URI is correct |
| Page won't load | Ensure backend is running on port 5000 |
| Token expired | Login again (tokens valid 7 days) |

---

## API Endpoints

```
POST   /api/auth/signup         - Create account
POST   /api/auth/signin         - Login user
GET    /api/auth/me             - Get current user (needs token)
POST   /api/auth/certificates   - Add certificate (needs token)
```

All endpoints require:
```
Authorization: Bearer <jwt_token>
```
(Except signup and signin)

---

## Test Account Example

After signup/signin you can create:

```
Name: John Doe
Email: john@example.com
Password: password123
```

Then upload a certificate file (PDF, JPG, PNG, DOC, DOCX)

---

## Key Features ✨

✅ User registration with validation
✅ Secure password hashing
✅ JWT authentication
✅ Certificate upload & storage
✅ User profile management
✅ Logout functionality
✅ Responsive design
✅ Error handling
✅ MongoDB integration
✅ CORS enabled

---

## File Sizes & Structure

- Frontend: React + TypeScript + Tailwind
- Backend: Express.js + MongoDB
- Total Dependencies: ~170 packages
- Database: MongoDB (local or Atlas)

---

## Next Steps After Setup

1. ✅ Test sign up with new account
2. ✅ Test sign in with credentials
3. ✅ Upload test certificate
4. ✅ View profile and certificates
5. ✅ Test logout
6. ✅ Verify data in MongoDB

---

## Documentation Files

- `AUTHENTICATION_SETUP.md` - Detailed setup guide
- `IMPLEMENTATION_SUMMARY.md` - Feature overview
- `VERIFICATION_CHECKLIST.md` - What's been implemented
- `README.md` - Project overview

---

## Support & Resources

- **MongoDB Docs:** https://docs.mongodb.com
- **Express Docs:** https://expressjs.com
- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com

---

## 🎯 Status: READY TO USE

All components created. Just start MongoDB and run the frontend/backend!

**Questions?** Check the documentation files or the setup guide.

**Happy Coding! 🚀**
