import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js"
import { getDocs, collection, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js"
import { SignUp, closeSignUp, reload, LogIn, closeLogIn, reloadLogIn} from './app/SignUp.js';
import { auth, db } from './app/firebase.js';

import './app/dbDocuments.js';

document.addEventListener('BeforeFormSubmit', function(event) {
    var x = document.getElementById("name").value;
    document.getElementById("name").value=x.replace(/[^a-zA-Z0-9 ]/g, "");
});

let signupbtn = document.getElementById("register");
let closebtn = document.getElementById("closesignup");

let loginbtn = document.getElementById("login");
let closebtnlogin = document.getElementById("closelogin2");


loginbtn.addEventListener("click", () => {
    LogIn();
});

closebtnlogin.addEventListener("click", () => {
    closeLogIn();
});



signupbtn.addEventListener("click", () => {
    SignUp();
});

closebtn.addEventListener("click", () => {
    reload();
    closeSignUp();
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
    } else {
    }
});