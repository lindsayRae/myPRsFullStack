



document.getElementById('logOutBtn').addEventListener('click', logOut)

let userAccountDialog = document.getElementById('userAccountBtn');

userAccountDialog.addEventListener('click', function () {
    console.log('heard click')
    populateUserDialog();   
    
});

async function populateUserDialog(){

    let data = await getUser();
    console.log(data)
    document.getElementById('userFirstName').value = data.firstName;
    let lastName = document.getElementById('userLastName').value = data.lastName;
    let emailName = document.getElementById('userEmail').value = data.email;


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

function logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('ID');
    window.location.href = "/";
}