

function loadFile(event) {
    var image = document.getElementById('output');
    let final = document.getElementById('images-backcolor');
    let camera = document.getElementById('camera-icon');
    let output = document.getElementById('output');
    let button = document.querySelector('.button-images');
    let button_extra = document.querySelector('.image-button');
    let currency = document.getElementById('MXN');
    image.src = URL.createObjectURL(event.target.files[0]);
    final.style.backgroundColor = "transparent";
    camera.style.display = "none";
    output.style.display = "block";
    button.style.display = "none";
    button_extra.style.paddingTop = "15%";
    currency.style.display = "block";
    image.style.borderRadius = "10px 10px 0 0";

    console.log('filename', event.target.files[0].name);
};

function loadFile2(event) {
    var image = document.getElementById('output0');
    let final = document.getElementById('images-backcolor0');
    let camera = document.getElementById('camera-icon0');
    let output = document.getElementById('output0');
    let query = document.querySelector('.image');
    query.classList.remove('active');
    image.src = URL.createObjectURL(event.target.files[0]);
    final.style.backgroundColor = "transparent";
    camera.style.display = "none";
    camera.style.display = "none";
    output.style.display = "block";
    image.style.borderRadius = "8px";
    image.hover = "none";

    console.log('filename', event.target.files[0].name);
}

function loadFile3(event) {
    var image = document.getElementById('output1');
    let final = document.getElementById('images-backcolor1');
    let camera = document.getElementById('camera-icon1');
    let output = document.getElementById('output1');
    let query = document.querySelector('.image');
    query.classList.remove('active');
    image.src = URL.createObjectURL(event.target.files[0]);
    final.style.backgroundColor = "transparent";
    camera.style.display = "none";
    camera.style.display = "none";
    output.style.display = "block";
    image.style.borderRadius = "8px";
    image.hover = "none";

    console.log('filename', event.target.files[0].name);
}