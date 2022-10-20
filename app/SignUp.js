
function SignUp() {
    document.getElementById("body").classList.toggle("active");
}

function closeSignUp() {
    document.getElementById("body").classList.toggle("active");
}

function reload() {
    document.getElementById('myform').reset();
}


export { SignUp };
export { closeSignUp };
export { reload };