export { fillEditForm }
import { movementPR, resetFlyout } from './flyout.js'


document.getElementById('editMovementBtn').addEventListener('click', updateMovement);
document.getElementById('deleteMovementBtn').addEventListener('click', deleteMovement);

async function updateMovement(){

    let userID = localStorage.getItem('ID');

    let dataID = document.getElementById('editMovementBtn');
    dataID = dataID.getAttribute('data-id');

    let movementName = document.getElementById('movementName').innerText
        let body = {
            prID: dataID,
            name: movementName,
            personalRecord: document.getElementById('editMovementMax').value,
            date: document.getElementById('editMovementDate').value,
            comment: document.getElementById('editMovementComment').value,
            type: sessionStorage.getItem('Movement')
        }
    console.log(body)
    let url = `/api/personalrecord/${userID}`        

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
       console.log(json)
        if(json.ok == 1){
           
            movementPR(movementName)
            document.getElementById('editMovementContainer').classList.add('hide');          
            document.getElementById('movementStatsContainer').classList.remove('hide');
            
        } else {
            console.error('Something went wrong');
        }

    } catch (error){
        console.error(error);
    }

}

async function deleteMovement(){

    let userID = localStorage.getItem('ID');

    let data = document.getElementById('deleteMovementBtn');
    let dataID = data.getAttribute('data-id');
    let dataType = data.getAttribute('data-type');

        let body = {
            prID: dataID,
            type: dataType       
        }
  
    let url = `/api/personalrecord/${userID}`

    try {
        body = JSON.stringify(body)

        let headers = {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem('token')
        }

        let res = await fetch(url, {
            method: "DELETE",
            body: body,
            headers: headers
        })

        let json = await res.json()
        
        if(json.removed){
           // document.getElementById('editMovementDialog').close();
           let movementName = document.getElementById('movementName').innerText
           movementPR(movementName)
          // resetFlyout()
            document.getElementById('movementStatsContainer').classList.remove('hide');
           
        } else {
            console.error('Something went wrong');
        }

    } catch (error){
        console.error(error);
    }

}

function fillEditForm(el){    
    console.log(el)
        //document.getElementById('editMovementName').innerText = el.name;
        document.getElementById('editMovementMax').value = el.personalRecord;
        document.getElementById('editMovementDate').value = el.date;
        document.getElementById('editMovementComment').value = el.comment;
        document.getElementById('editMovementBtn').setAttribute('data-id', el._id);
        document.getElementById('deleteMovementBtn').setAttribute('data-id', el._id);
        document.getElementById('deleteMovementBtn').setAttribute('data-type', el.type);
       // resetFlyout()
       
        document.getElementById('movementStatsContainer').classList.add('hide');
        document.getElementById('editMovementContainer').classList.remove('hide');
    }