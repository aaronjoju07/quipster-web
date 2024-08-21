// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-h7rEZIwKGPYVDeElisAvgEH6aBpxrcM",
  authDomain: "quipster-628a0.firebaseapp.com",
  projectId: "quipster-628a0",
  storageBucket: "quipster-628a0.appspot.com",
  messagingSenderId: "854968345129",
  appId: "1:854968345129:web:1f414cee84650343703238"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };