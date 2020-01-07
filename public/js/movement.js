//! terminal command: ipconfig

import { closeFlyout, buildFlyout } from "./flyout.js";

buildMenuUI()

document.getElementById('closeFlyout').addEventListener('click', closeFlyout);
document.getElementById('secondaryFlyout').addEventListener('click', closeFlyout)

let newMovementDialog = document.getElementById('newMovementDialog');
let showAddMovementModalButton = document.getElementById('addMovement');

    if (!newMovementDialog.showModal) {
        dialogPolyfill.registerDialog(newMovementDialog);
    }

showAddMovementModalButton.addEventListener('click', function () {
    newMovementDialog.showModal();
});

document.getElementById('addNewMovement').addEventListener('click', function () {
    newMovementDialog.close();
    addNewMovement();
});

document.getElementById('closeNewMovementX').addEventListener('click', function () {
    newMovementDialog.close();    
});

document.getElementById('closeNewMovementBtn').addEventListener('click', function () {
    newMovementDialog.close();    
});

document.getElementById('clearFilter').addEventListener('click', () => {    
    document.getElementById('searchLiftForm').reset();
    findText();
})

document.getElementById('movementSearch').addEventListener('touchstart', () => {
    findText();
})

document.getElementById('movementSearch').addEventListener('keyup', () => {
    findText();
})

document.getElementById('addNewLogBtn').addEventListener('click', () => {
    let name = document.getElementById('movementName').innerText;    
    addNewRecord(name);    
})

async function buildMenuUI() {   
    
    let data = await buildMovementMenu();    
    data = data.sort();
   
    let container = document.getElementById('liftMenuContainer');
    container.innerHTML = '';
    
    data.forEach(function (movementName) {
        
        let idName = movementName.replace(/\s/g, '');
      
        let div = document.createElement('div');
        div.classList.add('mdl-cell');
        div.classList.add('mdl-cell--2-col');
        div.classList.add('mdl-cell--2-col-phone');
        div.classList.add('mdl-shadow--2dp');
        div.classList.add('single-movement');
        div.setAttribute('id', idName)        
        div.innerText = movementName;

        div.addEventListener('click', () =>{   
                    
            buildFlyout(movementName);            
        })

        container.append(div);
    })
}

//? type is always singular
//* Good for dynamic movement 1-6-20
async function defaultMovementMenu() {

    document.getElementById('movementTitle').innerText = sessionStorage.getItem('Movement Title');
    let type = sessionStorage.getItem('Movement')

    try {       
       let url = `/api/movements/${type}`;
        let headers = {
            "Content-Type": "application/json"
        }

        let res = await fetch(url, {
            method: "GET",
            headers: headers
        })
        let json = await res.json()
      // console.table(json);
        if (res.status === 200) {            
            return json;
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

async function userMovementMenu() {

    let user_id = localStorage.getItem('ID');
    let movement = sessionStorage.getItem('Movement')
    
    try {
        let url = `/api/personalrecord/${user_id}?movement=${movement}`;       
        let headers = {
            "Content-Type": "application/json"
        }

        let res = await fetch(url, {
            method: "GET",
            headers: headers
        })
       
        let json = await res.json()
      //console.log(json);
        if (res.ok) {                 
            return json;                 
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


async function addNewMovement() {

    let movement = sessionStorage.getItem('Movement')
    let body = {
        user_id: localStorage.getItem("ID"),
        name: sanitizeInput(document.getElementById('newName').value),
        type: movement,       
        personalRecord:sanitizeInput(document.getElementById('newMax').value),
        comment: sanitizeInput(document.getElementById('newComment').value),
        date: currentDate(),
        preDefined: false
    }
    
    let url = `/api/personalrecord/${movement}`;
      console.log(url)  
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
        
        if(json.message === "Success"){
            buildMenuUI();
            document.getElementById('newMovementForm').reset();           
        }

    } catch (error) {
        console.error(error);
    }
}

async function addNewRecord(name) {

    let movement = sessionStorage.getItem('Movement')
    let obj = JSON.parse(sessionStorage.getItem("All Movements"))
    obj = obj.find( item => item.name === name)

    let body = {
        user_id: localStorage.getItem("ID"), 
        name: name, 
        preDefined: obj.preDefined,
        type: obj.type,      
        personalRecord:sanitizeInput(document.getElementById('newPREntry').value),
        comment: sanitizeInput(document.getElementById('PREntryNote').value),
        date: currentDate(),        
    }
    
    let url = `/api/personalrecord/${movement}`;
    console.log(url)     
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
       
        if(json.message === "Success"){
            buildMenuUI();          
            buildFlyout(name);
            document.getElementById('newEntryForm').reset();
        }

    } catch (error) {
        console.error(error);
    }
}

//? Resource: https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c

async function buildMovementMenu() {
    let defaultMovements = await defaultMovementMenu();
    let userMovements = await userMovementMenu();  

    let allMovements = defaultMovements.concat(userMovements);

    sessionStorage.setItem('All Movements', JSON.stringify(allMovements))

    let defaultMovementName = defaultMovements.map((movement) => {
        return movement.name
    })

    if(userMovements && userMovements.length != 0){
            //* use map() to get just the name
        let userDefinedMovementNames = userMovements.map((movement) => {
            return movement.name
        })
        //* concat() the two arrays together 
        let allMovements = userDefinedMovementNames.concat(defaultMovementName);
        //console.log(allMovements)
    
        //* new Set() removes duplicate values -> returns object 
        let uniqueMenu = new Set(allMovements);
        //console.log(uniqueMenu)
    
        //* ... spread puts back into array 
        let usersMenu = [...uniqueMenu];
        //console.log(usersMenu)
    
        return usersMenu;
    } else {
        return defaultMovementName;
    }    
}

function findText() {
    let input = document.getElementById("movementSearch")
    let filter = input.value.toUpperCase();
    let list = document.getElementById("movementList");
    let items = list.querySelectorAll('.single-movement')

    for (let i = 0; i < items.length; i++) {
        let text = items[i].innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}

function sanitizeInput(inputStr){

    return inputStr.trim();

}

function currentDate(){

    let today = new Date();
    let year = today.getFullYear().toString().substr(2,2);
    
    return `${(today.getMonth()+1)}/${today.getDate()}/${year}`;
}