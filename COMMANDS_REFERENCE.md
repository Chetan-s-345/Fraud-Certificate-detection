# 🚀 Quick Command Reference

## 📖 READ THESE FIRST

**Start here with the simplest guide:**
```
📄 QUICK_START.md ← Begin here! (5 min setup)
```

**Then explore:**
```
📄 README_AUTH_SYSTEM.md ← Complete system overview
📄 AUTHENTICATION_SETUP.md ← Detailed instructions
📄 ARCHITECTURE_DIAGRAMS.md ← System design diagrams
📄 IMPLEMENTATION_SUMMARY.md ← Features list
📄 VERIFICATION_CHECKLIST.md ← What's implemented
```

---

## ⚡ Quick Commands

### Start MongoDB (if using local)
```powershell
net start MongoDB
```

### Start Backend Server
```powershell
cd "c:\Users\cheta\OneDrive\Desktop\Buildathon\shield-ai"
node server/server.js
```

### Start Frontend (new terminal)
```powershell
cd "c:\Users\cheta\OneDrive\Desktop\Buildathon\shield-ai"
npm run dev
```

### Start Both Together
```powershell
npm run dev:all
```
(requires concurrently package)

---

## 🌐 URLs to Visit

| Page | URL | Status |
|------|-----|--------|
| Home | http://localhost:8080 | ✅ Ready |
| Sign In | http://localhost:8080/signin | ✅ Ready |
| Sign Up | http://localhost:8080/signup | ✅ Ready |
| Certificates | http://localhost:8080/certificates | ✅ Ready |
| Backend API | http://localhost:5000 | ✅ Ready |
| Health Check | http://localhost:5000/health | ✅ Ready |

---

## 🔌 API Endpoints

### Authentication
```
POST   http://localhost:5000/api/auth/signup
POST   http://localhost:5000/api/auth/signin
GET    http://localhost:5000/api/auth/me
POST   http://localhost:5000/api/auth/certificates
```

---

## 🗂️ Important Files

### Frontend Components
- `src/pages/SignIn.tsx` - Login page
- `src/pages/SignUp.tsx` - Registration page
- `src/pages/Certificates.tsx` - Certificate management
- `src/context/AuthContext.tsx` - Auth state
- `src/components/Navbar.tsx` - Navigation bar
- `src/App.tsx` - Routes

### Backend Code
- `server/server.js` - Express app
- `server/models/User.js` - Database
- `server/routes/auth.js` - API endpoints
- `server/middleware/auth.js` - JWT

### Configuration
- `.env` - Backend config
- `.env.local` - Frontend config

---

## 📊 Architecture Overview

```
User Browser (React)
        ↓
    Navbar with Sign In/Up
        ↓
    Express Backend (Port 5000)
        ↓
    MongoDB Database
```

---

## ✅ What Works Now

- ✅ User registration
- ✅ User login
- ✅ JWT authentication
- ✅ User logout
- ✅ Certificate upload
- ✅ Data persistence
- ✅ Session management
- ✅ Error handling

---

## 🧪 Quick Test Scenario

1. Go to http://localhost:8080/signup
2. Create account with test email
3. Go to http://localhost:8080/signin
4. Login with same credentials
5. Should see your name in top right
6. Click name → "My Certificates"
7. Upload a test file
8. Should appear in list
9. Click name → "Logout"
10. Should see "Sign In" button again

---

## 🆘 If Something Doesn't Work

| Issue | Check |
|-------|-------|
| Can't connect to MongoDB | Is MongoDB service running? |
| Port 5000 in use | Change PORT in .env |
| CORS error | Check .env CLIENT_URL |
| Can't login | Check .env MONGODB_URI |
| Token expired | Login again |

---

## 📁 File Structure at a Glance

```
shield-ai/
├── src/                           # Frontend
│   ├── pages/
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   └── Certificates.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── components/
│   │   └── Navbar.tsx
│   └── App.tsx
│
├── server/                         # Backend
│   ├── server.js
│   ├── models/User.js
│   ├── routes/auth.js
│   └── middleware/auth.js
│
├── .env                           # Config
├── package.json                   # Dependencies
│
└── Docs/
    ├── QUICK_START.md             ← START HERE
    ├── README_AUTH_SYSTEM.md
    ├── AUTHENTICATION_SETUP.md
    └── ... more docs
```

---

## 🔐 Security Summary

- Passwords hashed with bcryptjs
- JWT tokens generated (7-day expiration)
- Tokens stored in localStorage
- Protected API endpoints
- Input validation
- Email uniqueness enforced
- CORS enabled

---

## 🎯 Next: Getting Started

**Choose one:**

### Option 1: Using Local MongoDB
```powershell
# Step 1: Download and install MongoDB
# Visit: https://www.mongodb.com/try/download/community

# Step 2: Start MongoDB
net start MongoDB

# Step 3: Start backend
node server/server.js

# Step 4: Start frontend (new terminal)
npm run dev

# Step 5: Visit http://localhost:8080
```

### Option 2: Using MongoDB Atlas (Cloud)
```powershell
# Step 1: Create account at https://www.mongodb.com/cloud/atlas

# Step 2: Copy connection string to .env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/shield-ai

# Step 3: Start backend
node server/server.js

# Step 4: Start frontend
npm run dev

# Step 5: Visit http://localhost:8080
```

---

## 📞 Help

- See **QUICK_START.md** for 5-minute setup
- See **AUTHENTICATION_SETUP.md** for detailed guide
- See **ARCHITECTURE_DIAGRAMS.md** to understand flow
- See **README_AUTH_SYSTEM.md** for everything

---

## ✨ You're All Set!

Your complete authentication system with database integration is ready to use.

**Start with:**
```
📄 QUICK_START.md
```

**Then run:**
```powershell
node server/server.js
```

**Then open:**
```
http://localhost:8080
```

---

**Happy Coding! 🚀**
