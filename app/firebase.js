import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js"
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsx7RUXWqaoYpXe7K-0iJjIwqHh9P34h4",
    authDomain: "patioinmobiliario-mx.firebaseapp.com",
    projectId: "patioinmobiliario-mx",
    storageBucket: "patioinmobiliario-mx.appspot.com",
    messagingSenderId: "51755270215",
    appId: "1:51755270215:web:ebeb92c533fb87a727f162",
    measurementId: "G-P86VNZXV49"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);