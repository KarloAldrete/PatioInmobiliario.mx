function innerText() {
    document.getElementById('disable').style.display = "none";
    if (document.getElementById('property').value === "Casa") {
    let border = document.getElementById('property');
    border.style.border = "2px solid #FF2E63";
    border.style.color = "#FF2E63";
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
export { innerText };