let bed_img = document.getElementById("bed-image");
let bed_name = document.getElementById("bed-name");
let bed_quantity = document.getElementById("bedroom-quantity");

let garaje_img = document.getElementById("garaje-image");
let garaje_name = document.getElementById("garaje-name");
let garaje_quantity = document.getElementById("garaje-quantity");

let bathroom_img = document.getElementById("bathroom-image");
let bathroom_name = document.getElementById("bathroom-name");
let bathroom_quantity = document.getElementById("bathroom-quantity");

function bedless() {
    bed_quantity.innerHTML = parseInt(bed_quantity.innerHTML) - 1;
    if (bed_quantity.innerHTML < 0) {
        bed_quantity.innerHTML = 0;
    }
}

function bedplus() {
    bed_quantity.innerHTML = parseInt(bed_quantity.innerHTML) + 1;
}

function bedName() {
    if (bed_quantity.innerHTML >= 1) {
    bed_img.style.filter = "brightness(0) saturate(100%) invert(28%) sepia(64%) saturate(2870%) hue-rotate(328deg) brightness(103%) contrast(102%)";
    bed_name.style.color = "#FF2E63";
    bed_quantity.style.color = "#FF2E63";
    }
    else if (bed_quantity.innerHTML == 0) {
    bed_img.style.filter = "none";
    bed_name.style.color = "#8593A9";
    bed_quantity.style.color = "#8593A9";
    }
}

function garajeless() {
    garaje_quantity.innerHTML = parseInt(garaje_quantity.innerHTML) - 1;
    if (garaje_quantity.innerHTML < 0) {
        garaje_quantity.innerHTML = 0;
    }
}

function garajeplus() {
    garaje_quantity.innerHTML = parseInt(garaje_quantity.innerHTML) + 1;
}

function garajeName() {
    if (garaje_quantity.innerHTML >= 1) {
    garaje_img.style.filter = "brightness(0) saturate(100%) invert(28%) sepia(64%) saturate(2870%) hue-rotate(328deg) brightness(103%) contrast(102%)";
    garaje_name.style.color = "#FF2E63";
    garaje_quantity.style.color = "#FF2E63";
    }
    else if (garaje_quantity.innerHTML == 0) {
    garaje_img.style.filter = "none";
    garaje_name.style.color = "#8593A9";
    garaje_quantity.style.color = "#8593A9";
    }
}

function bathroomless() {
    bathroom_quantity.innerHTML = parseInt(bathroom_quantity.innerHTML) - 1;
    if (bathroom_quantity.innerHTML < 0) {
        bathroom_quantity.innerHTML = 0;
    }
}

function bathroomplus() {
    bathroom_quantity.innerHTML = parseInt(bathroom_quantity.innerHTML) + 1;
}

function bathroomName() {
    if (bathroom_quantity.innerHTML >= 1) {
    bathroom_img.style.filter = "brightness(0) saturate(100%) invert(28%) sepia(64%) saturate(2870%) hue-rotate(328deg) brightness(103%) contrast(102%)";
    bathroom_name.style.color = "#FF2E63";
    bathroom_quantity.style.color = "#FF2E63";
    }
    else if (bathroom_quantity.innerHTML == 0) {
    bathroom_img.style.filter = "none";
    bathroom_name.style.color = "#8593A9";
    bathroom_quantity.style.color = "#8593A9";
    }
}

function border() {
    let options = document.getElementById("options");
    if (bed_quantity.innerHTML >= 1 && garaje_quantity.innerHTML >= 1 && bathroom_quantity.innerHTML >= 1) {    
        options.style.border = "2px solid #FF2E63";
    }
    else if (bed_quantity.innerHTML <= 1) {
        options.style.border = "2px solid #EFF0F3";
    }
    else if (garaje_quantity.innerHTML <= 1) {
        options.style.border = "2px solid #EFF0F3";
    }
    else if (bathroom_quantity.innerHTML <= 1) {
        options.style.border = "2px solid #EFF0F3";
    }
}

export { bedless, bedplus, bedName, garajeless, garajeplus, garajeName, bathroomless, bathroomplus, bathroomName, border };