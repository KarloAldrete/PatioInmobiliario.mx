import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js"
import { getDocs, collection, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js"
import { SignUp, closeSignUp, reload, LogIn, closeLogIn, reloadLogIn} from './app/SignUp.js';
import { auth, db } from './app/firebase.js';
import { less, plus, press } from './app/plusButtons.js';

import './app/dbDocuments.js';
import './app/LogIn.js';
import './app/logout.js';
import './app/plusButtons.js';



let signupbtn = document.getElementById("register");
let closebtn = document.getElementById("closesignup");

let loginbtn = document.getElementById("login");
let closebtnlogin = document.getElementById("closelogin2");

document.getElementById("btn1").addEventListener("click", less);
document.getElementById("btn2").addEventListener("click", plus);
document.getElementById("address").addEventListener("focus", press);


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
        document.querySelector('.user-loggedIn').classList.toggle('active');
        document.querySelector('.user-options').classList.toggle('active');
        reload();

        if (user.uid === "fniSafWHatf9fpdK5keER4oiLyY2") {
            // document.getElementById("auth-user").innerHTML = "Karlo Aldrete";
            // document.querySelector('.img2').style.display = "block";
            // document.querySelector('.img2').style.border = "2px solid #FF2E63";
            // document.getElementById("role").innerHTML = "CEO";
            document.getElementById("auth-user").innerHTML = "Marco Acosta";
            document.querySelector('.img4').style.display = "block";
            document.querySelector('.img4').style.border = "2px solid #FF2E63";
            document.getElementById("role").innerHTML = "Inversor";
        }

        if (user.uid === "HG3hBX1MfHTnl85KsZEwYdHZkLj1") {
            document.getElementById("auth-user").innerHTML = "Adrian Rubiano";
            document.querySelector('.img1').style.display = "block";
            document.querySelector('.img2').style.border = "2px solid #FF2E63";
            document.getElementById("role").innerHTML = "Realtor";
        }

        if (user.uid === "DjE1IwsSs8YXQvJJfIFFvNHtfa82") {
            document.getElementById("auth-user").innerHTML = "Nancy Torres";
        }

        if (user.uid === "9wW7aM2GCPdqUxwoL9fldOjjECV2") {
            document.getElementById("auth-user").innerHTML = "Marco Acosta";
            document.querySelector('.img4').style.display = "block";
            document.querySelector('.img4').style.border = "2px solid #FF2E63";
            document.getElementById("role").innerHTML = "Inversor";
        }

    } else {
    }

});