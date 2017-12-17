
const username = document.getElementById("username");
const fullname = document.getElementById("fullname");
const password = document.getElementById('password');
const repeatPassword = document.getElementById("repeatPassword");
const about = document.getElementById("about");
const email = document.getElementById("email");

// If needed, implement JS for form validation
// Currently done w/ html form validation
username.addEventListener("input", function (event) {
    if (username.validity.patternMismatch) {
        username.setCustomValidity("Username must consist of Alphanumeric Data Only");
    } else {
        username.setCustomValidity("");
    }
});

fullname.addEventListener("input", function (event) {
    if (fullname.validity.patternMismatch) {
        fullname.setCustomValidity("Fullname must consist of Alphanumeric, spaces, and hyphens only");
    } else {
        fullname.setCustomValidity("");
    }
});

password.addEventListener("input", function (event) {
    if (password.validity.patternMismatch) {
        password.setCustomValidity("Password must consist of Alphanumeric characters or ! @ # $ %");
    } else {
        password.setCustomValidity("");
    }
});

repeatPassword.addEventListener("input", function(event) {
    if (repeatPassword.validity.patternMismatch) {
        repeatPassword.setCustomValidity("Password must consist of Alphanumeric characters or ! @ # $ %");
        } else if(repeatPassword.value != password.value){
        repeatPassword.setCustomValidity("Password must match password given.");
        }
        else {
        repeatPassword.setCustomValidity("");
        }
});

about.addEventListener("input", function(event) {
    if (about.validity.patternMismatch) {
        about.setCustomValidity("Max Length: 144 Characters");
    } else {
    about.setCustomValidity("");
    };
});