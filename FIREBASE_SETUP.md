# Firebase Setup Guide - Step by Step

## What is Firebase?
Firebase is Google's backend-as-a-service that handles:
- **Authentication** (login/signup)
- **Database** (Firestore)
- **Real-time sync** (instant updates)
- **No server needed** (we can remove Node.js backend)

## Setup (5 Minutes)

### Step 1: Create Firebase Project

1. Go to: https://console.firebase.google.com/
2. Click **"Add project"**
3. Enter name: `shield-ai`
4. Click **"Continue"**
5. Choose: **Disable Google Analytics** (for now)
6. Click **"Create project"**
7. ⏳ Wait 1-2 minutes for project creation

### Step 2: Get Your Firebase Credentials

1. In Firebase Console, click ⚙️ **Settings** (top left)
2. Go to **"Project settings"**
3. Click **"Your apps"** or **"General"** tab
4. Click **"Web"** (or click the **`</>`** icon)
5. Register app with name: `shield-ai-web`
6. Copy the config object:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "shield-ai-xxxxx.firebaseapp.com",
  projectId: "shield-ai-xxxxx",
  storageBucket: "shield-ai-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

### Step 3: Enable Authentication

1. Go to **"Build"** → **"Authentication"** (left sidebar)
2. Click **"Get started"**
3. Under **"Sign-in method"**, enable:
   - **Email/Password**: Click it → Enable → Save
4. ✅ Now users can sign up with email

(Optional) **Enable Google Sign-In:**
- Click **"Google"** in Sign-in method list
- Enable it
- Click "Save"

### Step 4: Create Firestore Database

1. Go to **"Build"** → **"Firestore Database"** (left sidebar)
2. Click **"Create database"**
3. Choose **"Start in test mode"** (development)
4. Choose region **closest to you**
5. Click **"Enable"**
6. ✅ Database created!

### Step 5: Create Collections

1. In Firestore Console, click **"Start collection"**
2. Create collection: **`users`**
   - First document: Auto (can leave empty for now)
   - Click "Save"

3. Create another collection: **`login_logs`**
   - First document: Auto (can leave empty for now)
   - Click "Save"

### Step 6: Update Firebase Config in Your App

1. Open file: `src/config/firebase.ts`
2. Replace with your credentials from Step 2:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
```

3. Save the file

### Step 7: Test Your App

1. **Start the frontend dev server:**
```bash
cd "c:\Users\cheta\OneDrive\Desktop\Buildathon\shield-ai"
npm run dev
```

2. **Go to**: http://localhost:8080

3. **Test Sign Up:**
   - Enter email: `test@gmail.com`
   - Password: `password123`
   - Name: `Test User`
   - Click "Sign Up"
   - Should see success message ✅

4. **Check Firebase Console:**
   - Go to Authentication tab
   - Should see `test@gmail.com` in Users list
   - Go to Firestore → `users` collection
   - Should see new user document
   - Go to Firestore → `login_logs` collection
   - Should see signup entry

5. **Test Sign In:**
   - Go to Sign In page
   - Enter same email and password
   - Should sign in successfully ✅
   - Check `login_logs` for new login entry

6. **Test Logout:**
   - Click Sign Out
   - Check `login_logs` for logout entry ✅

---

## Viewing Login/Logout Logs

### In Firebase Console:

1. Go to **"Firestore Database"**
2. Click **`login_logs`** collection
3. You should see:

```
Document 1:
- uid: "ABC123..."
- email: "test@gmail.com"
- action: "signup"
- timestamp: December 7, 2025, 10:30 AM

Document 2:
- uid: "ABC123..."
- email: "test@gmail.com"
- action: "login"
- timestamp: December 7, 2025, 10:35 AM

Document 3:
- uid: "ABC123..."
- email: "test@gmail.com"
- action: "logout"
- timestamp: December 7, 2025, 10:40 AM
```

---

## What Gets Logged?

Every action creates a document in `login_logs`:

| Action | Logged When |
|--------|------------|
| **signup** | User creates new account |
| **login** | User signs in |
| **logout** | User clicks Sign Out |

Each log includes:
- `uid` - User ID from Firebase
- `email` - User's email
- `action` - What they did
- `timestamp` - When it happened
- `userAgent` - Browser/device info

---

## Email Validation ✅

Your app already accepts:
- ✅ test@gmail.com
- ✅ user@outlook.com
- ✅ anything@yourdomain.com
- ✅ any valid email format

No changes needed!

---

## Troubleshooting

### Problem: "Firebase not initialized"
**Solution:** Make sure you updated `src/config/firebase.ts` with your credentials

### Problem: "Sign up not working"
**Solution:** 
- Check browser console for errors (F12)
- Make sure authentication is enabled in Firebase Console
- Check that your apiKey is correct

### Problem: "Can't see login logs in Firestore"
**Solution:**
- Go to Firestore Database
- Make sure `login_logs` collection exists
- Check that logs aren't in a different collection
- Refresh the page (Ctrl+R)

### Problem: "Permission denied error"
**Solution:**
- Go to Firestore Database
- Click `login_logs` collection
- Edit Security Rules
- Replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
⚠️ This is for testing only! Secure it later for production.

---

## Next Steps

1. ✅ Create Firebase Project
2. ✅ Get credentials
3. ✅ Enable Authentication
4. ✅ Create Firestore Database
5. ✅ Update `src/config/firebase.ts`
6. ✅ Test signup/signin/logout
7. ✅ View logs in Firestore Console

---

## Optional: Add Google Sign-In

1. In Firebase Console → Authentication → Google
2. Enable Google Sign-In
3. Use `GoogleLogin` button in SignIn.tsx (already setup!)
4. Users can now sign in with Google account

---

## Production Notes

**Before deploying to production:**
1. Change Firestore to Production mode (more secure)
2. Add proper Security Rules
3. Enable backup and recovery
4. Set up billing alerts
5. Never share your `apiKey` publicly

But for development/testing, current setup is fine! 🎉

---

## Support

- **Firebase Docs**: https://firebase.google.com/docs
- **Firestore Guide**: https://firebase.google.com/docs/firestore
- **Authentication**: https://firebase.google.com/docs/auth

**You're all set!** 🚀 Your app now tracks all logins/logouts in real-time! ✨
