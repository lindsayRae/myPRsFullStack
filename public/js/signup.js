async function signUp() {

    let body = sanitizeSignupForm();

    if (!body) {
        console.log("Don't submit the form")
        return
    } else {
        console.log(body)

        let url = "/api/users";

        try {

            body = JSON.stringify(body)
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
                console.log(json)
                location.href = "/dashboard.html"
             
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
}

document.getElementById("signUpBtn").addEventListener("click", signUp)

function sanitizeSignupForm() {
    console.log('heard')
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("signupEmail").value;
    let pw = document.getElementById("signupPassword").value;
    let confirmedPW = document.getElementById("confirmedPassword").value;
    console.log(firstName)
    if (firstName === "" || firstName === " ") {
        console.log("this is required")
        document.getElementById("firstName").classList.add('border-danger')
        return
    }
    console.log(firstName)

    if (lastName === "" || lastName === " ") {
        console.log("this is required")
        document.getElementById("lastName").classList.add('border-danger')
        return
    }

    if (email === "" || email === " ") {
        console.log("this is required")
        document.getElementById("email").classList.add('border-danger')
        return
    }

    if (pw === "" || pw === " ") {
        console.log("this is required")
        document.getElementById("signupPassword").classList.add('border-danger')
        return
    }

    if (confirmedPW === "" || confirmedPW === " ") {
        console.log("this is required")
        document.getElementById("confirmedPassword").classList.add('border-danger')
        return
    }

    if (pw != confirmedPW) {
        console.log("passwords do not match")
        document.getElementById("confirmedPassword").classList.add('border-danger')
        return
    }

    let body = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: confirmedPW
    }

    return body;
}