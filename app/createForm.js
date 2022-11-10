function innerText() {
    document.getElementById('disable').style.display = "none";
    if (document.getElementById('property').value === "Casa") {
    let border = document.getElementById('property');
    border.style.border = "2px solid #FF2E63";
    border.style.color = "#252A34";
    let finals = document.getElementById("casa-final");
    finals.innerHTML = "Inmueble: Casa";
    document.getElementById("departamento-final").innerHTML = "Departamento";
    document.getElementById("terreno-final").innerHTML = "Terreno";
    }
    if (document.getElementById('property').value === "Departamento") {
    let finals = document.getElementById("departamento-final");
    finals.innerHTML = "Inmueble: Departamento";
    let border = document.getElementById('property');
    border.style.border = "2px solid #FF2E63";
    border.style.color = "#FF2E63";
    document.getElementById("casa-final").innerHTML = "Casa";
    document.getElementById("terreno-final").innerHTML = "Terreno";
    }
    if (document.getElementById('property').value === "Terreno") {
    let finals = document.getElementById("terreno-final");
    finals.innerHTML = "Inmueble: Terreno";
    let border = document.getElementById('property');
    border.style.border = "2px solid #FF2E63";
    border.style.color = "#FF2E63";
    document.getElementById("casa-final").innerHTML = "Casa";
    document.getElementById("departamento-final").innerHTML = "Departamento";
    }
}

function innerText2() {
    document.getElementById('disable').style.display = "none";

    let venta = document.getElementById('sell-card');
    let renta = document.getElementById('rent-card');


    if (document.getElementById('tag').value === "Venta") {
    let border = document.getElementById('tag');
    border.style.border = "2px solid #FF2E63";
    border.style.color = "#252A34";
    venta.style.display = "flex";
    renta.style.display = "none";
    }
    if (document.getElementById('tag').value === "Renta") {
    let border = document.getElementById('tag');
    border.style.border = "2px solid #FF2E63";
    border.style.color = "#252A34";
    venta.style.display = "none";
    renta.style.display = "flex";
    }
}

import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-storage.js";

function uploadImagesDatabase() {
    let file = document.getElementById("files").files[0];
    let storageRef = ref(getStorage(), "images/" + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
    });

    console.log('filename', file.name);
}

let image = document.getElementById('output');

image.addEventListener('click', uploadImagesDatabase);


export { innerText, innerText2 };