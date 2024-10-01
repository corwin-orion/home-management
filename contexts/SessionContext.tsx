import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Household, User } from '@/constants/Types';
import { auth, db } from "@/private/FirebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";

// Define the context types
type SessionContextType = {
  user: User | null;
  household: Household | null;
  setUser: (user: User) => void;
  setHousehold: (household: Household) => void;
  getUser: () => Promise<User | null>;
  updateUser: (name: string, color: string) => void;
};

// Create the context
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Create a provider component
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [household, setHousehold] = useState<Household | null>(null);

  async function getUser(): Promise<User | null> {
    // Get the current user from Firebase Auth
    const user = auth.currentUser;

    // If there is no user, return null
    if (!user) {
      return null;
    }

    // Get the user document from Firestore
    const userDoc = await getDoc(doc(db, `users/${user.uid}`));

    // If the user document doesn't exist, return null
    if (!userDoc.exists()) {
      return null;
    }

    // Return the user data
    return userDoc.data() as User;
  }

  async function updateUser(name: string, color: string) {
    if (!user) return;

    try {
      // Get a reference to the user document in Firestore
      const userRef = doc(db, `users/${user.id}`);
      // Update the user document
      await updateDoc(userRef, { name, color });
      setUser({ ...user, name, color })
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  }

  return (
    <SessionContext.Provider value={{ user, household, setUser, setHousehold, getUser, updateUser }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook to use the SessionContext
export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
