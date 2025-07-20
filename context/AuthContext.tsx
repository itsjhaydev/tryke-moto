// context/AuthContext.tsx

import React, { createContext, useState, useEffect, useContext } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

interface CustomUser {
  uid: string;
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  email?: string;
  role: "driver" | "passenger";
  [key: string]: any;
}

interface AuthContextType {
  user: CustomUser | null;
  setUser: React.Dispatch<React.SetStateAction<CustomUser | null>>;
  login: (userData: CustomUser) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Optional: load user info from Firestore
        setUser({ uid: firebaseUser.uid, firstName: firebaseUser.firstName, lastName: firebaseUser.lastName, phoneNumber: firebaseUser.phoneNumber || "", role: "passenger" });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (userData: CustomUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
