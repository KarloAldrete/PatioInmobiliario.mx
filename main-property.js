import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js"
import { getDocs, collection, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js"
import { SignUp, closeSignUp, reload, LogIn, closeLogIn, reloadLogIn} from './app/SignUp.js';
import { auth, db } from './app/firebase.js';
import { bedless, bedplus, bedName, garajeless, garajeplus, garajeName, bathroomless, bathroomplus, bathroomName, border} from './app/filtersButtons.js';


import './app/dbDocuments.js';
import './app/LogIn.js';
import './app/logout.js';



let logo = document.getElementById('patioinmb');

logo.addEventListener('click', () => {
    window.location.href = 'index.html';
});

let price = document.getElementById('price-title').innerHTML;
let finalPrice = price.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
let monthly_payment = document.getElementById('monthly-payment');
let monthy_earnings = document.getElementById('monthly-earnings');
let loan_years = document.getElementById('loan-years');

monthly_payment.innerHTML = (finalPrice / (loan_years.value * 12) / 2).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " MXN";
let earnings_total = monthly_payment.innerHTML.replace(/[&\/\\#,+()$~%.'":*?<>{}MXN]/g, '');
console.log(earnings_total);
monthy_earnings.innerHTML = ((earnings_total * 3.33333)).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0}) + " MXN";

let priceLoan = document.getElementById('price-loan');

priceLoan.value = finalPrice;

let amount = document.getElementById('loan-amount');
amount.innerHTML = (finalPrice / 2).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });

let range = document.getElementById('loan2');

range.addEventListener('input', () => {

    let percentage = document.getElementById('percentage');

    percentage.innerHTML = range.value + "%";

    var x = range.value;
    var color = 'linear-gradient(90deg, rgb(255, 46, 99)' + x + '%, rgb(214, 214, 214)' + x + '%)';
    range.style.background = color;

    amount.innerHTML = ((finalPrice * range.value) / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });

    range.step = 0.05;

    monthly_payment.innerHTML = ((finalPrice * range.value / 100 / (loan_years.value * 12)) * 1.10).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " MXN";

    let earnings_total = monthly_payment.innerHTML.replace(/[&\/\\#,+()$~%.'":*?<>{}MXN]/g, '');
    monthy_earnings.innerHTML = ((earnings_total * 3.33333)).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " MXN";

    loan_years.addEventListener('input', () => {
            
            monthly_payment.innerHTML = ((finalPrice * range.value / 100 / (loan_years.value * 12)) * 1.10).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    
            let earnings_total = monthly_payment.innerHTML.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
            monthy_earnings.innerHTML = ((earnings_total * 3.33333)).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0}) + " MXN";
    
    });
});





let signupbtn = document.getElementById("register");
let closebtn = document.getElementById("closesignup");

let loginbtn = document.getElementById("login");
let closebtnlogin = document.getElementById("closelogin2");

let userMenu = document.getElementById("userProfile");


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

userMenu.addEventListener("click", () => {
    let userMenu = document.querySelector(".user-loggedIn-Dropdown");
    userMenu.classList.toggle("active");

    let logout = document.getElementById("logout");
    logout.addEventListener("click", () => {
        userMenu.classList.toggle("active");
        document.getElementById('login-form').reset();
    });
});


onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.querySelector('.user-loggedIn').classList.toggle('active');
        document.querySelector('.user-options').classList.toggle('active');
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