// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0yjSFxgA2ZtZB8IEzt9fFOEbatmdFm3A",
    authDomain: "chat-app-1197d.firebaseapp.com",
    projectId: "chat-app-1197d",
    storageBucket: "chat-app-1197d.appspot.com",
    messagingSenderId: "266281699117",
    appId: "1:266281699117:web:562dbfdcb4069348a535a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()

export { auth, db }