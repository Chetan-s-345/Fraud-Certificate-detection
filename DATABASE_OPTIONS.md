# Database Setup - Firebase vs Supabase (Easy Solutions)

## Quick Comparison

| Feature | Firebase Auth + Firestore | Supabase |
|---------|--------------------------|----------|
| **Setup Time** | 5-10 minutes | 5-10 minutes |
| **Free Tier** | Generous (100K reads/month) | Very Generous (500K req/month) |
| **Login Tracking** | ✅ Easy | ✅ Easy |
| **Logout Tracking** | ✅ Easy | ✅ Easy |
| **Database** | Firestore (NoSQL) | PostgreSQL (SQL) |
| **Best For** | Beginners | SQL developers |
| **Cost at Scale** | Cheaper | Slightly cheaper |

---

## Option 1: Firebase Auth + Firestore (RECOMMENDED - EASIEST)

### Why Firebase?
✅ No server setup needed  
✅ Built-in authentication  
✅ Real-time database  
✅ Automatic data backup  
✅ Free tier covers most apps  

### Step-by-Step Setup

#### 1. Create Firebase Project
1. Go to: https://console.firebase.google.com/
2. Click "Add project"
3. Enter name: `shield-ai`
4. Click "Continue"
5. Disable Google Analytics (for now)
6. Click "Create project"
7. Wait for project to be created

#### 2. Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable providers:
   - **Email/Password**: Click "Email/Password" → Enable → Save
   - **Google**: Click "Google" → Enable → Save (needs OAuth)
4. Copy your **Web API Key** from Project Settings

#### 3. Create Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Start in **Test mode** (for development)
4. Choose region closest to you
5. Click "Enable"

#### 4. Set Up Collections
1. Create collection: `users`
2. Create collection: `login_logs`

#### 5. Install Firebase Package
```bash
cd "c:\Users\cheta\OneDrive\Desktop\Buildathon\shield-ai"
npm install firebase
```

#### 6. Create Firebase Config File
Create file: `src/config/firebase.ts`

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
```

**Get these values from:**
- Firebase Console → Project Settings → General tab

#### 7. Replace AuthContext with Firebase
Create file: `src/context/FirebaseAuthContext.tsx`

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';

const FirebaseAuthContext = createContext();

export const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Sign Up
  const signup = async (email, password, name) => {
    try {
      setLoading(true);
      setError(null);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        email,
        name,
        createdAt: serverTimestamp(),
      });

      // Log signup
      await addDoc(collection(db, 'login_logs'), {
        uid: userCredential.user.uid,
        email,
        action: 'signup',
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
      });

      return userCredential.user;
    } catch (err) {
      const errorMessage = err.message || 'Signup failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Sign In
  const signin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Log login
      await addDoc(collection(db, 'login_logs'), {
        uid: userCredential.user.uid,
        email,
        action: 'login',
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
      });

      return userCredential.user;
    } catch (err) {
      const errorMessage = err.message || 'Sign in failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const logout = async () => {
    try {
      setLoading(true);
      
      // Log logout
      if (user) {
        await addDoc(collection(db, 'login_logs'), {
          uid: user.uid,
          email: user.email,
          action: 'logout',
          timestamp: serverTimestamp(),
          userAgent: navigator.userAgent,
        });
      }

      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <FirebaseAuthContext.Provider value={{
      user,
      loading,
      error,
      signup,
      signin,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (!context) {
    throw new Error('useFirebaseAuth must be used within FirebaseAuthProvider');
  }
  return context;
};
```

#### 8. Update App.tsx
Replace `AuthProvider` with `FirebaseAuthProvider`

#### 9. View Login Logs in Firebase Console
1. Go to Firestore Database
2. Collection: `login_logs`
3. See all login, signup, logout events with timestamps

---

## Option 2: Supabase (PostgreSQL)

### Why Supabase?
✅ PostgreSQL database (industry standard)  
✅ Built-in authentication  
✅ Real-time capabilities  
✅ Simple dashboard  
✅ Great free tier  

### Step-by-Step Setup

#### 1. Create Supabase Project
1. Go to: https://app.supabase.com/
2. Click "New Project"
3. Enter project name: `shield-ai`
4. Set password (save it!)
5. Choose region
6. Click "Create new project"
7. Wait for setup (2-3 minutes)

#### 2. Get Connection Details
1. Go to "Settings" → "API"
2. Copy:
   - **Project URL**
   - **anon public key**

#### 3. Create Tables
Go to "SQL Editor" and run:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Login logs table
CREATE TABLE login_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  email TEXT NOT NULL,
  action TEXT NOT NULL, -- 'login', 'logout', 'signup'
  timestamp TIMESTAMP DEFAULT NOW(),
  user_agent TEXT
);

-- Create index for faster queries
CREATE INDEX idx_login_logs_user ON login_logs(user_id);
CREATE INDEX idx_login_logs_action ON login_logs(action);
```

#### 4. Enable RLS (Row Level Security)
1. Go to "Authentication" → "Policies"
2. Enable RLS on both tables
3. Add policy allowing users to see their own data

#### 5. Install Supabase Package
```bash
npm install @supabase/supabase-js
```

#### 6. Create Supabase Config
Create file: `src/config/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'YOUR_PROJECT_URL';
const SUPABASE_KEY = 'YOUR_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
```

#### 7. Create Supabase Auth Context
Create file: `src/context/SupabaseAuthContext.tsx`

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/config/supabase';

const SupabaseAuthContext = createContext();

export const SupabaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const signup = async (email, password, name) => {
    try {
      setLoading(true);
      setError(null);

      // Sign up with Supabase Auth
      const { data: { user }, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) throw signupError;

      // Create user record
      const { error: insertError } = await supabase
        .from('users')
        .insert([{ id: user.id, email, name }]);

      if (insertError) throw insertError;

      // Log signup
      await supabase.from('login_logs').insert([{
        user_id: user.id,
        email,
        action: 'signup',
        user_agent: navigator.userAgent,
      }]);

      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      // Log login
      await supabase.from('login_logs').insert([{
        user_id: user.id,
        email,
        action: 'login',
        user_agent: navigator.userAgent,
      }]);

      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      // Log logout before signing out
      if (user) {
        await supabase.from('login_logs').insert([{
          user_id: user.id,
          email: user.email,
          action: 'logout',
          user_agent: navigator.userAgent,
        }]);
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SupabaseAuthContext.Provider value={{
      user,
      loading,
      error,
      signup,
      signin,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const context = useContext(SupabaseAuthContext);
  if (!context) {
    throw new Error('useSupabaseAuth must be used within SupabaseAuthProvider');
  }
  return context;
};
```

#### 8. View Login Logs
1. Go to Supabase Dashboard
2. Go to "SQL Editor"
3. Run: `SELECT * FROM login_logs ORDER BY timestamp DESC;`
4. Or go to "Table Editor" → `login_logs` table

---

## My Recommendation: **Firebase** ✅

**Why?**
- Simplest setup (no backend needed)
- Better for beginners
- Firestore is easier to query
- Good free tier
- Less to maintain

---

## Installation Steps (Firebase)

```bash
# 1. Navigate to project
cd "c:\Users\cheta\OneDrive\Desktop\Buildathon\shield-ai"

# 2. Install Firebase
npm install firebase

# 3. Create config/firebase.ts with your credentials

# 4. Update App.tsx to use FirebaseAuthProvider

# 5. Done! Test signup and check Firestore for login logs
```

---

## Testing Login/Logout Tracking

### Firebase:
1. Go to Firebase Console
2. Firestore Database → `login_logs`
3. Sign up/login on your app
4. Refresh Firestore → See new entries!

### Supabase:
1. Go to Supabase Dashboard
2. Table Editor → `login_logs`
3. Sign up/login on your app
4. Refresh → See new entries with timestamp!

---

## Next Steps

1. **Choose one**: Firebase (easier) or Supabase (more control)
2. **Get credentials** from their console
3. **Install package**: `npm install firebase` or `npm install @supabase/supabase-js`
4. **Create config file** with credentials
5. **Update AuthContext** to use the service
6. **Test**: Sign up and check database

Need help with any step? I can set up either option for you!
