
function SignUp() {
    document.getElementById("body").classList.toggle("active");
}

function closeSignUp() {
    document.getElementById("body").classList.toggle("active");
}

function reload() {
    document.getElementById('signup-form').reset();
}

function LogIn() {
    document.getElementById("loginrq").classList.toggle("active");
}

function closeLogIn() {
    document.getElementById("loginrq").classList.toggle("active");
}

function reloadLogIn() {
    document.getElementById('loginform').reset();
}


export { SignUp };
export { closeSignUp };
export { reload };
export { LogIn };
export { closeLogIn };
export { reloadLogIn };