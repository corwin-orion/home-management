import { User } from "@/constants/Types";
import { auth, db } from "@/private/FirebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export async function getUser(): Promise<User | null> {
  // Get the current user from Firebase Auth
  const user = auth.currentUser;

  // If there is no user, return null
  if (!user) return null;

  // Get the user document from Firestore
  const userDoc = await getDoc(doc(db, `users/${user.uid}`));

  // If the user document doesn't exist, return null
  if (!userDoc.exists()) return null;

  // Return the user data
  return { id: user.uid, ...userDoc.data() } as User;
}