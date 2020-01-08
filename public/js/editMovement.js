export { fillEditForm }

document.getElementById('editMovementBtn').addEventListener('click', updateMovement);
document.getElementById('deleteMovementBtn').addEventListener('click', deleteMovement);

document.getElementById('closeEditDialog').addEventListener('click', ()=>{
    document.getElementById('editMovementDialog').close();
})

async function updateMovement(){

    let userID = localStorage.getItem('ID');

    let dataID = document.getElementById('editMovementBtn');
    dataID = dataID.getAttribute('data-id');
        let body = {
            prID: dataID,
            name: document.getElementById('editMovementName').innerText,
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
            document.getElementById('editMovementDialog').close();
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
            document.getElementById('editMovementDialog').close();
        } else {
            console.error('Something went wrong');
        }

    } catch (error){
        console.error(error);
    }

}

function fillEditForm(el){    
    
        document.getElementById('editMovementName').innerText = el.name;
        document.getElementById('editMovementMax').value = el.personalRecord;
        document.getElementById('editMovementDate').value = el.date;
        document.getElementById('editMovementComment').value = el.comment;
        document.getElementById('editMovementBtn').setAttribute('data-id', el._id);
        document.getElementById('deleteMovementBtn').setAttribute('data-id', el._id);
        document.getElementById('deleteMovementBtn').setAttribute('data-type', el.type);
        editMovementDialog.showModal();
    }