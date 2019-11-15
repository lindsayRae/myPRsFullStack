

function collectLoginForm(){

    let email = document.getElementById("email").value;
    let pw = document.getElementById("password").value;

    email = email.trim();
    pw = pw.trim();
    console.log(email)
    console.log(pw)
}

document.getElementById("loginBtn").addEventListener("click", collectLoginForm)