
async function sendMessage(){
    let form = document.getElementById('contactForm')
    let body = {
        name: document.getElementById("yourName").value,       
        email: document.getElementById("yourEmail").value,
        message: document.getElementById("yourMessage").value,
    }
    let isValid = validateForm(form, body)

    let url = "/api/contact"

    try {
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      })

      let json = await res.json()
      console.log(json)
      let message = document.getElementById('emailResponse') 
      message.innerText = json.message

      if(json.status == 200){
        message.setAttribute('style', 'color: green')
      } else {
        message.setAttribute('style', 'color: red')
      }


    } catch (error) {
      console.error("Error:", error)
    }
   
}

function validateForm(body){


}
document.getElementById("sendMessage").addEventListener("click", sendMessage)