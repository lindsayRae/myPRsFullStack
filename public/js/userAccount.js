
let userAccountModal = document.getElementById('userAccountModal');

document.getElementById('logOutBtn').addEventListener('click', logOut)

userAccountModal.querySelector('.close').addEventListener('click', function () {
   userAccountModal.close();    
});

document.getElementById('userAccountBtn').addEventListener('click', () => {
    event.preventDefault();
    populateUserDialog();
});
document.getElementById('updateUserBtn').addEventListener('click', updateUser);

async function populateUserDialog(){

    let data = await getUser();    
    document.getElementById('userFirstName').value = data.firstName;
    document.getElementById('userLastName').value = data.lastName;
    document.getElementById('userEmail').value = data.email;
    document.getElementById('userAccountModal').showModal();
}

async function getUser(){

    let id = localStorage.getItem('ID');

    try {       
        let url = `/api/users/me/${id}`;
         let headers = {
             "Content-Type": "application/json"
         }
 
         let res = await fetch(url, {
             method: "GET",
             headers: headers
         })
         let json = await res.json()
       console.log(json);
        if(json){
            return json
        } else {
            console.error(error);
        }
     } catch (error) {
         console.log(error);
     }

}


async function updateUser(){

    let id = localStorage.getItem('ID')

    let body = {
        firstName: document.getElementById('userFirstName').value,
        lastName: document.getElementById('userLastName').value,
        email: document.getElementById('userEmail').value,
    }
   
    let url = `/api/users/me/${id}`
    
    try {

        body = JSON.stringify(body)
        let headers = {
            "Content-Type": "application/json"
        }

        let res = await fetch(url, {
            method: "PUT",
            body: body,
            headers: headers
        })

        let json = await res.json()
       
        if(json){
            document.getElementById('userAccountModal').close();
        }
        
    } catch (error) {
        console.error(error);
    }
}

function logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('ID');
    window.location.href = "/";
}