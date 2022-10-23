let Bedroom = document.getElementById("bedroom-quantity");


function less() {
        Bedroom.innerHTML = parseInt(Bedroom.innerHTML) - 1;
        if (Bedroom.innerHTML < 1) {
            Bedroom.innerHTML = 1;
        }
}

function plus(){
        Bedroom.innerHTML = parseInt(Bedroom.innerHTML) + 1;
}

function press() {
    document.getElementById("address").onkeypress = function(e) {
        var chr = String.fromCharCode(e.which);
        if ("></\"[]{}!*()^?%$#@&:;".indexOf(chr) >= 0)
            return false;
    };
}

export { less, plus, press };