import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 👈 ADD THIS

const firebaseConfig = {
  apiKey: "AIzaSyB8YvWCRymzYGPamvnb1MwvfzQKuGJGLpw",
  authDomain: "trading-dashboard-10f3e.firebaseapp.com",
  projectId: "trading-dashboard-10f3e",
  storageBucket: "trading-dashboard-10f3e.firebasestorage.app",
  messagingSenderId: "491585843780",
  appId: "1:491585843780:web:64ef714d5afd74bf748211"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); // 👈 ADD THIS