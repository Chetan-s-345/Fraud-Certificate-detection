import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  error: string | null;
  signup: (email: string, password: string, name: string) => Promise<any>;
  signin: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const FirebaseAuthContext = createContext<AuthContextType | undefined>(undefined);

export const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Sign Up with email and password
  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user document in Firestore
      await addDoc(collection(db, 'users'), {
        uid: firebaseUser.uid,
        email: email,
        name: name,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        loginMethod: 'email',
      });

      // Log signup activity
      await addDoc(collection(db, 'login_logs'), {
        uid: firebaseUser.uid,
        email: email,
        name: name,
        action: 'signup',
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
      });

      console.log('✅ User signed up successfully:', email);
      return firebaseUser;
    } catch (err: any) {
      const errorMessage = err.message || 'Signup failed';
      setError(errorMessage);
      console.error('❌ Signup error:', errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Sign In with email and password
  const signin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Log login activity
      await addDoc(collection(db, 'login_logs'), {
        uid: firebaseUser.uid,
        email: email,
        action: 'login',
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
      });

      console.log('✅ User signed in successfully:', email);
      return firebaseUser;
    } catch (err: any) {
      const errorMessage = err.message || 'Sign in failed';
      setError(errorMessage);
      console.error('❌ Sign in error:', errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const logout = async () => {
    try {
      setLoading(true);

      // Log logout activity before signing out
      if (user) {
        await addDoc(collection(db, 'login_logs'), {
          uid: user.uid,
          email: user.email,
          action: 'logout',
          timestamp: serverTimestamp(),
          userAgent: navigator.userAgent,
        });
      }

      // Sign out from Firebase
      await signOut(auth);
      setUser(null);
      console.log('✅ User signed out successfully');
    } catch (err: any) {
      const errorMessage = err.message || 'Sign out failed';
      setError(errorMessage);
      console.error('❌ Sign out error:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

// Hook to use Firebase auth
export const useAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseAuthProvider');
  }
  return context;
};

export default FirebaseAuthContext;
