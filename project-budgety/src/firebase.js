import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
	apiKey: "AIzaSyA2GFQWKkDM0rU2gvN6Zx6InYvBMMO6jXc",
	authDomain: "budgety-bb3bd.firebaseapp.com",
	projectId: "budgety-bb3bd",
	storageBucket: "budgety-bb3bd.appspot.com",
	messagingSenderId: "871124414660",
	appId: "1:871124414660:web:2750a2af15d23ba60ad991",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

export const authentication = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
