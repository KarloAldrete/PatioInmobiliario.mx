import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js"
import { getDocs, collection, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js"
import { SignUp, closeSignUp, reload, LogIn, closeLogIn, reloadLogIn} from './app/SignUp.js';
import { auth, db } from './app/firebase.js';
import { innerText, innerText2 } from './app/createForm.js';


import './app/dbDocuments.js';
import './app/LogIn.js';
import './app/logout.js';





document.getElementById('property').addEventListener('change', function() {
    let type = document.getElementById('property').value;
    innerText();
});

document.getElementById('tag').addEventListener('change', function() {
    let type = document.getElementById('tag').value;
    innerText2();
});

let logo = document.getElementById('patioinmb');

logo.addEventListener('click', function() {
    window.location.href = "index.html";
});

let date = document.getElementById('date');

date.addEventListener('change', function() {
    date.style.border = '2px solid #FF2E63';
});

let location = document.getElementById('location');

location.addEventListener('keyup', function() {
    let location = document.getElementById('location').value;
    let card_location = document.getElementById('location-card');
    card_location.innerText = location;
});

let address = document.getElementById('address');

address.addEventListener('keyup', function() {
    let address = document.getElementById('address').value;
    let card_address = document.getElementById('address-card');
    card_address.innerText = address;
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

let price = document.getElementById('price');
let currency = document.getElementById('currency');
let squareft = document.getElementById('square-ft');

price.addEventListener('keyup', function() {
    let price = document.getElementById('price').value;
    let total = parseInt(price).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
    let card_price = document.getElementById('price-card');
    card_price.innerText = total;

    if (price == '') {
        card_price.innerText = '$ 0';
    }
});

currency.addEventListener('change', function() {
    let current = document.getElementById('currency').value;
    let MXN = document.getElementById('MXN');
    let USD = document.getElementById('USD');
    let border = document.querySelector('.currency');

    if (current == 'MXN') {
        MXN.style.display = 'flex';
        USD.style.display = 'none';
        border.style.border = '2px solid #FF2E63';
    }

    if (current == 'USD') {
        USD.style.display = 'flex';
        MXN.style.display = 'none';
        border.style.border = '2px solid #FF2E63';
    }
});

squareft.addEventListener('keyup', function() {
    let squareft2 = document.getElementById('square-ft').value;
    let total = parseInt(squareft2).toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0 });
    let squareft_card = document.getElementById('square-ft-card');
    squareft_card.innerText = total + ' M­²';

    if (squareft2 == '') {
        squareft_card.innerText = '0 M­²';
    }
});

let phoneNumber = document.getElementById('phone');

var maskOptions = {
    mask: '(000) 000-0000'
};

var mask = IMask(phoneNumber, maskOptions);




let urgent = document.getElementById('urgent');

urgent.addEventListener('change', function() {
    let urgent_card = document.getElementById('urgent-card');
    urgent_card.style.display = 'flex';

    if (urgent.checked == false) {
        urgent_card.style.display = 'none';
    }
});

let minus_bedrooms = document.getElementById('minus-bedrooms');
let plus_bedrooms = document.getElementById('plus-bedrooms');
let bedrooms2 = document.getElementById('bedrooms');

minus_bedrooms.addEventListener('click', function() {
    let bedrooms = document.getElementById('bedrooms');
    let bedrooms_card = document.getElementById('bedrooms-card');
    let title = document.getElementById('bedrooms-title');
    let icon =  document.getElementById('bedrooms-icon');

    bedrooms.innerHTML = parseInt(bedrooms.innerHTML) - 1;

    bedrooms_card.innerHTML = bedrooms.innerHTML;

    if (bedrooms.innerHTML == 1) {
        bedrooms_card.innerHTML = bedrooms.innerHTML + " Recámara";
        bedrooms.style.color = '#FF2E63';
        title.style.color = '#FF2E63';
        icon.style.filter = 'brightness(0) saturate(100%) invert(28%) sepia(64%) saturate(2870%) hue-rotate(328deg) brightness(103%) contrast(102%)';
    }

    if (bedrooms.innerHTML > 1) {
        bedrooms_card.innerHTML = bedrooms.innerHTML + " Recámaras";
    }

    if (bedrooms.innerHTML <= 0) {
        bedrooms.innerHTML = 0;
        bedrooms_card.innerText = 0 + " Recámara";
        bedrooms.style.color = '#8593A9';
        title.style.color = '#8593A9';
        icon.style.filter = 'brightness(0) saturate(100%) invert(60%) sepia(9%) saturate(757%) hue-rotate(178deg) brightness(96%) contrast(86%)';
    }

    if (bedrooms2.innerHTML >= 1 && bathrooms2.innerHTML >= 1 && garajes2.innerHTML >= 1) {
        let section_border = document.querySelector('.right-column');
        section_border.style.border = '2px solid #FF2E63';
    } else {
        let section_border = document.querySelector('.right-column');
        section_border.style.border = '2px solid #E0E0E0';
    }

});

plus_bedrooms.addEventListener('click', function() {
    let bedrooms = document.getElementById('bedrooms');
    let bedrooms_card = document.getElementById('bedrooms-card');
    let title = document.getElementById('bedrooms-title');
    let icon =  document.getElementById('bedrooms-icon');

    bedrooms.innerHTML = parseInt(bedrooms.innerHTML) + 1;

    bedrooms_card.innerHTML = bedrooms.innerHTML;

    if (bedrooms.innerHTML == 1) {
        bedrooms_card.innerHTML = bedrooms.innerHTML + " Recámara";
        bedrooms.style.color = '#FF2E63';
        title.style.color = '#FF2E63';
        icon.style.filter = 'brightness(0) saturate(100%) invert(28%) sepia(64%) saturate(2870%) hue-rotate(328deg) brightness(103%) contrast(102%)';
    }

    if (bedrooms.innerHTML > 1) {
        bedrooms_card.innerHTML = bedrooms.innerHTML + " Recámaras";
    }

    if (bedrooms.innerHTML <= 0) {
        bedrooms.innerHTML = 0;
        bedrooms_card.innerText = 0 + " Recámara";
        bedrooms.style.color = '#8593A9';
        title.style.color = '#8593A9';
        icon.style.filter = 'brightness(0) saturate(100%) invert(60%) sepia(9%) saturate(757%) hue-rotate(178deg) brightness(96%) contrast(86%)';
    }

    if (bedrooms2.innerHTML >= 1 && bathrooms2.innerHTML >= 1 && garajes2.innerHTML >= 1) {
        let section_border = document.querySelector('.right-column');
        section_border.style.border = '2px solid #FF2E63';
    } else {
        let section_border = document.querySelector('.right-column');
        section_border.style.border = '2px solid #E0E0E0';
    }

});

let minus_bathrooms = document.getElementById('minus-bathrooms');
let plus_bathrooms = document.getElementById('plus-bathrooms');
let bathrooms2 = document.getElementById('bathrooms');

minus_bathrooms.addEventListener('click', function() {
    let bathrooms = document.getElementById('bathrooms');
    let bathrooms_card = document.getElementById('bathrooms-card');
    let title = document.getElementById('bathrooms-title');
    let icon =  document.getElementById('bathrooms-icon');

    bathrooms.innerHTML = parseInt(bathrooms.innerHTML) - 1;

    bathrooms_card.innerHTML = bathrooms.innerHTML;

    if (bathrooms.innerHTML == 1) {
        bathrooms_card.innerHTML = bathrooms.innerHTML + " Baño";
        bathrooms.style.color = '#FF2E63';
        title.style.color = '#FF2E63';
        icon.style.filter = 'brightness(0) saturate(100%) invert(28%) sepia(64%) saturate(2870%) hue-rotate(328deg) brightness(103%) contrast(102%)';
    }

    if (bathrooms.innerHTML > 1) {
        bathrooms_card.innerHTML = bathrooms.innerHTML + " Baños";
    }

    if (bathrooms.innerHTML <= 0) {
        bathrooms.innerHTML = 0;
        bathrooms_card.innerText = 0 + " Baño";
        bathrooms.style.color = '#8593A9';
        title.style.color = '#8593A9';
        icon.style.filter = 'brightness(0) saturate(100%) invert(60%) sepia(9%) saturate(757%) hue-rotate(178deg) brightness(96%) contrast(86%)';
    }

    if (bedrooms2.innerHTML >= 1 && bathrooms2.innerHTML >= 1 && garajes2.innerHTML >= 1) {
        let section_border = document.querySelector('.right-column');
        section_border.style.border = '2px solid #FF2E63';
    } else {
        let section_border = document.querySelector('.right-column');
        section_border.style.border = '2px solid #E0E0E0';
    }

});

plus_bathrooms.addEventListener('click', function() {
    let bathrooms = document.getElementById('bathrooms');
    let bathrooms_card = document.getElementById('bathrooms-card');
    let title = document.getElementById('bathrooms-title');
    let icon =  document.getElementById('bathrooms-icon');

    bathrooms.innerHTML = parseInt(bathrooms.innerHTML) + 1;

    bathrooms_card.innerHTML = bathrooms.innerHTML;

    if (bathrooms.innerHTML == 1) {
        bathrooms_card.innerHTML = bathrooms.innerHTML + " Baño";
        bathrooms.style.color = '#FF2E63';
        title.style.color = '#FF2E63';
        icon.style.filter = 'brightness(0) saturate(100%) invert(28%) sepia(64%) saturate(2870%) hue-rotate(328deg) brightness(103%) contrast(102%)';
    }

    if (bathrooms.innerHTML > 1) {
        bathrooms_card.innerHTML = bathrooms.innerHTML + " Baños";
    }

    if (bathrooms.innerHTML <= 0) {
        bathrooms.innerHTML = 0;
        bathrooms_card.innerText = 0 + " Baño";
        bathrooms.style.color = '#8593A9';
        title.style.color = '#8593A9';
        icon.style.filter = 'brightness(0) saturate(100%) invert(60%) sepia(9%) saturate(757%) hue-rotate(178deg) brightness(96%) contrast(86%)';
    }

    if (bedrooms2.innerHTML >= 1 && bathrooms2.innerHTML >= 1 && garajes2.innerHTML >= 1) {
        let section_border = document.querySelector('.right-column');
        section_border.style.border = '2px solid #FF2E63';
    } else {
        let section_border = document.querySelector('.right-column');
        section_border.style.border = '2px solid #E0E0E0';
    }

});



let minus_garajes = document.getElementById('minus-garajes');
let plus_garajes = document.getElementById('plus-garajes');
let garajes2 = document.getElementById('garajes');

minus_garajes.addEventListener('click', function() {
    let garajes = document.getElementById('garajes');
    let garajes_card = document.getElementById('garajes-card');
    let title = document.getElementById('garajes-title');
    let icon =  document.getElementById('garajes-icon');

    garajes.innerHTML = parseInt(garajes.innerHTML) - 1;

    garajes_card.innerHTML = garajes.innerHTML;

    if (garajes.innerHTML == 1) {
        garajes_card.innerHTML = garajes.innerHTML + " Garaje";
        garajes.style.color = '#FF2E63';
        title.style.color = '#FF2E63';
        icon.style.filter = 'brightness(0) saturate(100%) invert(28%) sepia(64%) saturate(2870%) hue-rotate(328deg) brightness(103%) contrast(102%)';
    }

    if (garajes.innerHTML > 1) {
        garajes_card.innerHTML = garajes.innerHTML + " Garajes";
    }

    if (garajes.innerHTML <= 0) {
        garajes.innerHTML = 0;
        garajes_card.innerText = 0 + " Garaje";
        garajes.style.color = '#8593A9';
        title.style.color = '#8593A9';
        icon.style.filter = 'brightness(0) saturate(100%) invert(60%) sepia(9%) saturate(757%) hue-rotate(178deg) brightness(96%) contrast(86%)';
    }

    if (bedrooms2.innerHTML >= 1 && bathrooms2.innerHTML >= 1 && garajes2.innerHTML >= 1) {
        let section_border = document.querySelector('.right-column');
        section_border.style.border = '2px solid #FF2E63';
    } else {
        let section_border = document.querySelector('.right-column');
        section_border.style.border = '2px solid #E0E0E0';
    }

});

plus_garajes.addEventListener('click', function() {
    let garajes = document.getElementById('garajes');
    let garajes_card = document.getElementById('garajes-card');
    let title = document.getElementById('garajes-title');
    let icon =  document.getElementById('garajes-icon');

    garajes.innerHTML = parseInt(garajes.innerHTML) + 1;

    garajes_card.innerHTML = garajes.innerHTML;

    if (garajes.innerHTML == 1) {
        garajes_card.innerHTML = garajes.innerHTML + " Garaje";
        garajes.style.color = '#FF2E63';
        title.style.color = '#FF2E63';
        icon.style.filter = 'brightness(0) saturate(100%) invert(28%) sepia(64%) saturate(2870%) hue-rotate(328deg) brightness(103%) contrast(102%)';
    }

    if (garajes.innerHTML > 1) {
        garajes_card.innerHTML = garajes.innerHTML + " Garajes";
    }

    if (garajes.innerHTML <= 0) {
        garajes.innerHTML = 0;
        garajes_card.innerText = 0 + " Garaje";
        garajes.style.color = '#8593A9';
        title.style.color = '#8593A9';
        icon.style.filter = 'brightness(0) saturate(100%) invert(60%) sepia(9%) saturate(757%) hue-rotate(178deg) brightness(96%) contrast(86%)';
    }

    if (bedrooms2.innerHTML >= 1 && bathrooms2.innerHTML >= 1 && garajes2.innerHTML >= 1) {
        let section_border = document.querySelector('.right-column');
        section_border.style.border = '2px solid #FF2E63';
    } else {
        let section_border = document.querySelector('.right-column');
        section_border.style.border = '2px solid #E0E0E0';
    }

});



let kitchen_input = document.getElementById('kitchen');
let washer_input = document.getElementById('washer');
let ac_input = document.getElementById('ac');
let gas_input = document.getElementById('gas');
let pool_input = document.getElementById('pool');
let jacuzzi_input = document.getElementById('jacuzzi');
let gym_input = document.getElementById('gym');
let garden_input = document.getElementById('garden');

kitchen_input.addEventListener('change', function() {
    let kitchen_card = document.getElementById('kitchen-card');
    kitchen_card.classList.toggle('active');
});

washer_input.addEventListener('change', function() {
    let washer_card = document.getElementById('washer-card');
    washer_card.classList.toggle('active');
});

ac_input.addEventListener('change', function() {
    let ac_card = document.getElementById('ac-card');
    ac_card.classList.toggle('active');
});

gas_input.addEventListener('change', function() {
    let gas_card = document.getElementById('gas-card');
    gas_card.classList.toggle('active');
});

pool_input.addEventListener('change', function() {
    let pool_card = document.getElementById('pool-card');
    pool_card.classList.toggle('active');
});

jacuzzi_input.addEventListener('change', function() {
    let jacuzzi_card = document.getElementById('jacuzzi-card');
    jacuzzi_card.classList.toggle('active');
});

gym_input.addEventListener('change', function() {
    let gym_card = document.getElementById('gym-card');
    gym_card.classList.toggle('active');
});

garden_input.addEventListener('change', function() {
    let garden_card = document.getElementById('garden-card');
    garden_card.classList.toggle('active');
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
        window.location.href = "index.html";
    }

});