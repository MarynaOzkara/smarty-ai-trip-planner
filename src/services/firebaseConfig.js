// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcoxzAE_tv7jLaayP8ReUoSrREHI3xDCk",
  authDomain: "smarty-ai-trip-planner-201aa.firebaseapp.com",
  projectId: "smarty-ai-trip-planner-201aa",
  storageBucket: "smarty-ai-trip-planner-201aa.firebasestorage.app",
  messagingSenderId: "273661686830",
  appId: "1:273661686830:web:013ab75de5f3cadeaa1bbf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
