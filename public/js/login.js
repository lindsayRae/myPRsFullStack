document.getElementById("email").addEventListener("focus", () => {
    document.getElementById('loginErrorMsg').classList.add('hide');
})

document.getElementById("password").addEventListener("focus", () => {
    document.getElementById('loginErrorMsg').classList.add('hide');
})

document.getElementById("loginBtn").addEventListener("click", () => {
    event.preventDefault();
    collectLoginForm();
})

async function collectLoginForm() {

    let email = document.getElementById("email").value;
    let pw = document.getElementById("password").value;

    email = email.trim();
    pw = pw.trim();

    let data = {
        email: email,
        password: pw
    }
    let url = "/api/auth";
   
    try {

        let res = await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: "include"
        })

        let json = await res.json();
       
        if (res.status === 200) {
            
            localStorage.setItem("token", json.token)
            localStorage.setItem("ID", json.id)
            location.href = "/dashboard.html"
        } else {
           
            document.getElementById('loginErrorMsg').classList.remove('hide');
            document.getElementById('loginErrorMsg').innerText = json.message;
        }

    } catch (error) {
        console.error(error)
    }
}