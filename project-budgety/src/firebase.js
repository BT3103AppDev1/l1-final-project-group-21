// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2GFQWKkDM0rU2gvN6Zx6InYvBMMO6jXc",
  authDomain: "budgety-bb3bd.firebaseapp.com",
  projectId: "budgety-bb3bd",
  storageBucket: "budgety-bb3bd.appspot.com",
  messagingSenderId: "871124414660",
  appId: "1:871124414660:web:2750a2af15d23ba60ad991"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;