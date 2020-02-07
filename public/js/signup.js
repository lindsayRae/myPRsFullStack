

document.getElementById("signUpBtn").addEventListener("click", signUp)

async function signUp() {

    let body = sanitizeSignupForm();
        
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
                
               localStorage.setItem("ID", json._id)
               localStorage.setItem("token", json.token)
               location.href = "/dashboard.html"
            } else {
               
                document.getElementById('signupError').innerText = json.message;
            }
        } catch (error) {
            console.error(error);
        }
    }
}


function sanitizeSignupForm() {
   
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("signupEmail").value;
    let pw = document.getElementById("signupPassword").value;
    let confirmedPW = document.getElementById("confirmedPassword").value;
    
    if (firstName === "" || firstName === " ") {        
        document.getElementById("firstName").classList.add('border-danger')
        return "First Name is required."
    }    

    if (lastName === "" || lastName === " ") {
        
        document.getElementById("lastName").classList.add('border-danger')
        return "Last Name is required."
    }

    if (email === "" || email === " ") {
        
        document.getElementById("signupEmail").classList.add('border-danger')
        return "Email is required."
    }
    if(!validateEmail(email)){
        return "Please enter a valid Email"
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

function validateEmail(email) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true
 else return false
}