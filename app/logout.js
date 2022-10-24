import { signOut } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js"
import { auth } from './firebase.js';

const logout = document.getElementById('logout');

logout.addEventListener('click', async (e) => {
    e.preventDefault();
    await signOut(auth)
    console.log('signed out');
    document.querySelector('.user-loggedIn').classList.toggle('active');
    document.querySelector('.user-options').classList.toggle('active');
    document.getElementById('create').style.display = "none";
    document.getElementById('login-form').reset();
});