import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const createNewUser = async (user) => {
  if (!user) return;
  try {
    const userRef = doc(db, "users", user.id);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return;
    }
    await setDoc(userRef, {
      firstName: user.firstName,
      email: user?.primaryEmailAddress?.emailAddress,
      plan: "free",
      lastTripGeneratedAt: null,
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
