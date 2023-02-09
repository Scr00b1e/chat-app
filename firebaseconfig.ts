// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBv6WYE4GDBMA7lggS9UHda8D1sn_Kib_s",
    authDomain: "chat-app-92c18.firebaseapp.com",
    projectId: "chat-app-92c18",
    storageBucket: "chat-app-92c18.appspot.com",
    messagingSenderId: "52247947926",
    appId: "1:52247947926:web:7d268e18c94633ce0670b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

export { auth }