import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js"
import { getDocs, collection, doc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js"
import { auth, db } from './firebase.js';

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = signupForm['email'].value;
    const password = signupForm['password'].value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential);

        const sigupModal = document.getElementById("body");
        sigupModal.classList.toggle('active');

        const first_name = document.getElementById('name').value;
        const last_name = document.getElementById("last-name").value;
        const bday = document.getElementById("bday").value;
        await setDoc(doc(db, 'users', first_name + last_name), {
            Nombres: first_name,
            Apellidos: last_name,
            BDAY: bday,
        });
        let getInfo = await getDocs(collection(db, 'users'));
        getInfo.forEach(async (doc) => {
            console.log(doc.data());
        });

    } catch(error){
        console.log(error);
    }
});