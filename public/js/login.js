

document.getElementById("email").addEventListener("focus", ()=>{
    document.getElementById('loginErrorMsg').classList.add('hide');
})

document.getElementById("password").addEventListener("focus", ()=>{
    document.getElementById('loginErrorMsg').classList.add('hide');
})

document.getElementById("loginBtn").addEventListener("click", collectLoginForm)

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

        let body = JSON.stringify(data)
        let headers = {
            "Content-Type": "application/json"
        }

        let res = await fetch(url, {
            method: "POST",
            body: body,
            headers: headers
        })

        let json = await res.json()
     
        if (res.status === 200) {                    
            localStorage.setItem("token", json.token)
            localStorage.setItem("ID", json.id)
            location.href = "/dashboard.html"    
        } else {
            document.getElementById('loginErrorMsg').classList.remove('hide');
            document.getElementById('loginErrorMsg').innerText = json.message;
        }

    } catch (error) {
        console.log(error);
    }
}
