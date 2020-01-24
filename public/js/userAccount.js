
export { populateUserAccount, updateUser, logOut }

import { openFlyout, resetFlyout, closeFlyout } from './flyout.js'

//let userAccountModal = document.getElementById('userAccountModal');
// if(document.getElementById('logOutBtn')){
//     document.getElementById('logOutBtn').addEventListener('click', logOut)
//     document.getElementById('logOutIcon').addEventListener('click', logOut)
       
//     document.getElementById('userAccountBtn').addEventListener('click', () => {
//         event.preventDefault();
//         populateUserAccount();
//     });

// }


async function populateUserAccount(){

    let data = await getUser();

    resetFlyout()
    document.getElementById('userAccountContainer').classList.remove('hide');
    
    document.getElementById('userFirstName').value = data.firstName;
    document.getElementById('userLastName').value = data.lastName;
    document.getElementById('userEmail').value = data.email;
    openFlyout();
   
}

async function getUser(){

    let id = localStorage.getItem('ID');

    try {       
        let url = `/api/users/me/${id}`;
         let headers = {
             "Content-Type": "application/json",
             "x-auth-token": localStorage.getItem('token')
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
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem('token')
        }

        let res = await fetch(url, {
            method: "PUT",
            body: body,
            headers: headers
        })

        let json = await res.json()
       
        if(json){
            closeFlyout()
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