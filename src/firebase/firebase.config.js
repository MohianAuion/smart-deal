// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi5PgjoA2sesbwJqRG6Y9hwS9ub4gYZqQ",
  authDomain: "smart-deal-app.firebaseapp.com",
  projectId: "smart-deal-app",
  storageBucket: "smart-deal-app.firebasestorage.app",
  messagingSenderId: "224491783014",
  appId: "1:224491783014:web:741e120bd63f0487977ea7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);