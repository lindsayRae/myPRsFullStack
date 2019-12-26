


document.getElementById("signUpBtn").addEventListener("click", signUp)

async function signUp() {

    let body = sanitizeSignupForm();
console.log(body)
    if (!body) {
        document.getElementById('signupError').innerText = "Something is wrong with the form, try again.";
        return
    } else if(typeof (body) === 'string'){
        document.getElementById('signupError').innerText = body
    }else {        

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
            } else {
                console.log(json.message);
                document.getElementById('signupError').innerText = json.message;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//! Lindsay this is not working 
// let form = document.getElementById('signUpForm');
// form.addEventListener('focus', ()=>{
//     console.log("heard form focus")
//     document.getElementById('signupError').innerText = '';
// })

function sanitizeSignupForm() {
    console.log('heard')
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("signupEmail").value;
    let pw = document.getElementById("signupPassword").value;
    let confirmedPW = document.getElementById("confirmedPassword").value;
    console.log(firstName)
    if (firstName === "" || firstName === " ") {
        
        document.getElementById("firstName").classList.add('border-danger')
        return "First Name is required."
    }
    console.log(firstName)

    if (lastName === "" || lastName === " ") {
        
        document.getElementById("lastName").classList.add('border-danger')
        return "Last Name is required."
    }

    if (email === "" || email === " ") {
        
        document.getElementById("email").classList.add('border-danger')
        return "Email is required."
    }

    if (pw === "" || pw === " ") {
        
        document.getElementById("signupPassword").classList.add('border-danger')
        return "Password is required."
    }

    if (confirmedPW === "" || confirmedPW === " ") {
        
        document.getElementById("confirmedPassword").classList.add('border-danger')
        return "Confirm Password is required."
    }

    if (pw != confirmedPW) {
        
        document.getElementById("confirmedPassword").classList.add('border-danger')
        return "Passwords do not match, try again."
    }

    let body = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: confirmedPW
    }

    return body;
}