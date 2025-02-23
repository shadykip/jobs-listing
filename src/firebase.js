// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc,collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjk5PQx61w-QFdGAGwRHdABSM2VpJ-lgA",
  authDomain: "job-listing-6630c.firebaseapp.com",
  projectId: "job-listing-6630c",
  storageBucket: "job-listing-6630c.firebasestorage.app",
  messagingSenderId: "330045581103",
  appId: "1:330045581103:web:6f54c37f89ba76951463da",
  measurementId: "G-Q9GSG2SZPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {analytics, auth,db,setDoc,doc,collection, createUserWithEmailAndPassword };