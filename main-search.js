import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js"
import { getDocs, collection, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js"
import { SignUp, closeSignUp, reload, LogIn, closeLogIn, reloadLogIn} from './app/SignUp.js';
import { auth, db } from './app/firebase.js';
import { bedless, bedplus, bedName, garajeless, garajeplus, garajeName, bathroomless, bathroomplus, bathroomName, border} from './app/filtersButtons.js';


import './app/dbDocuments.js';
import './app/LogIn.js';
import './app/logout.js';
import './app/filtersButtons.js';



let logo = document.getElementById('patioinmb');

logo.addEventListener('click', () => {
    window.location.href = 'index.html';
});


let house_type = document.getElementById("property");
let tag = document.getElementById("tag");

house_type.addEventListener("change", function() {
    house_type.style.border = "2px solid #FF2E63";
    house_type.style.color = "#FF2E63";
});

tag.addEventListener("change", function() {
    tag.style.border = "2px solid #FF2E63";
    tag.style.color = "#FF2E63";
});



let min_price = document.getElementById("min");
let max_price = document.getElementById("max");

min_price.addEventListener("change", function() {
    min_price.style.border = "2px solid #FF2E63";
    min_price.style.color = "#FF2E63";
    
    if (min_price.value == "") {
        min_price.style.border = "2px solid transparent";
        min_price.style.color = "#8593A9";
    }
});

max_price.addEventListener("change", function() {
    max_price.style.border = "2px solid #FF2E63";
    max_price.style.color = "#FF2E63";

    if (max_price.value == "") {
        max_price.style.border = "2px solid transparent";
        max_price.style.color = "#8593A9";
    }
});




min_price.addEventListener("keydown",function(event){
    var key = event.which;
    if((key<48 || key>57) && key != 8) event.preventDefault();
});

min_price.addEventListener("keyup",function(event){
    var value = this.value.replace(/,/g,"");
    this.dataset.currentValue=parseInt(value);
    var caret = value.length-1;
    while((caret-3)>-1)
    {
        caret -= 3;
        value = value.split('');
        value.splice(caret+1,0,",");
        value = value.join('');
    }
    this.value = value;
});

max_price.addEventListener("keydown",function(event){
    var key = event.which;
    if((key<48 || key>57) && key != 8) event.preventDefault();
});

max_price.addEventListener("keyup",function(event){
    var value = this.value.replace(/,/g,"");
    this.dataset.currentValue=parseInt(value);
    var caret = value.length-1;
    while((caret-3)>-1)
    {
        caret -= 3;
        value = value.split('');
        value.splice(caret+1,0,",");
        value = value.join('');
    }
    this.value = value;
});


let bed_minus = document.getElementById("bed_minus");
let bed_plus = document.getElementById("bed_plus");

let garaje_minus = document.getElementById("garaje_minus");
let garaje_plus = document.getElementById("garaje_plus");

let bathroom_minus = document.getElementById("bathroom_minus");
let bathroom_plus = document.getElementById("bathroom_plus");

bed_minus.addEventListener("click", function() {
    bedless();
    bedName();
    border();
});

bed_plus.addEventListener("click", function() {
    bedplus();
    bedName();
    border();
});

garaje_minus.addEventListener("click", function() {
    garajeless();
    garajeName();
    border();
});

garaje_plus.addEventListener("click", function() {
    garajeplus();
    garajeName();
    border();
});

bathroom_minus.addEventListener("click", function() {
    bathroomless();
    bathroomName();
    border();
});

bathroom_plus.addEventListener("click", function() {
    bathroomplus();
    bathroomName();
    border();
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
        document.querySelector('.user-loggedIn').classList.toggle('active');
        document.querySelector('.user-options').classList.toggle('active');
        document.getElementById('create').style.display = "block";
        reload();

        if (user.uid === "fniSafWHatf9fpdK5keER4oiLyY2") {
            document.getElementById("auth-user").innerHTML = "Karlo Aldrete";
            document.querySelector('.img2').style.display = "block";
            document.querySelector('.img2').style.border = "2px solid #FF2E63";
            document.getElementById("role").innerHTML = "CEO";
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

    } else {
    }

});