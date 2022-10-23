import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, getAuth } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js"
import { auth } from './firebase.js';

const signInForm = document.querySelector('#login-form');
const aut = getAuth();

setPersistence(aut, browserSessionPersistence)
    .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });

signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = signInForm['login-email'].value;
    const password = signInForm['login-password'].value;

    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        console.log("success! : " + email);

        const loginModal = document.getElementById("loginrq");
        loginModal.classList.toggle('active');

    } catch (error) {
        console.log(error.code);

        if (error.code === 'auth/invalid-email') {

            alert("El correo electrónico no es válido");

            // showMessage('Please enter a valid email address', 'error');

        }
        if (error.code === 'auth/wrong-password') {

            alert("La contraseña no es válida");

            // showMessage('Please enter the correct password', 'error');

        }
        if (error.code === 'auth/user-not-found') {

            alert("No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado");

            // showMessage('This email address is not registered', 'error');

        }
    }

});