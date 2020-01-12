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

        console.log("In the try")

        let res = await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: "include"
        })

        console.log(res.status)
        let json = await res.json();
        console.log(json)
        if (res.status === 200) {
            console.log(`response was 200`)
            localStorage.setItem("token", json.token)
            localStorage.setItem("ID", json.id)
            location.href = "/dashboard.html"
        } else {
            console.log(`response was not 200`)
            document.getElementById('loginErrorMsg').classList.remove('hide');
            document.getElementById('loginErrorMsg').innerText = json.message;
        }



    } catch (error) {
        console.log("In error:")
        console.log(error);
    }
}