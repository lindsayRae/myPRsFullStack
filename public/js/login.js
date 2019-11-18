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
        console.log(json)
        if (res.status === 200) {
            console.log(json.token)
            // store the token in session
            localStorage.setItem("token", json.token)
           location.href = "/dashboard.html"
            // redirect to the dash 
        } else if (res.status === 404) {
            console.log(json.message)
        } else if (res.status === 400) {
            console.log(json.message)
        } else {
            console.log("Some other error")
        }

    } catch (error) {
        console.log(error);
    }
}

document.getElementById("loginBtn").addEventListener("click", collectLoginForm)