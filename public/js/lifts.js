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
newMovementDialog.querySelector('.add-lift').addEventListener('click', function () {
    newMovementDialog.close();
    addNewLift("lifts");
});
newMovementDialog.querySelector('.close').addEventListener('click', function () {
    newMovementDialog.close();    
});

document.getElementById('clearFilter').addEventListener('click', () => {
    
    document.getElementById('searchLiftForm').reset();
    findText();
})
document.getElementById('liftSearch').addEventListener('touchstart', () => {

    findText();
})
document.getElementById('liftSearch').addEventListener('keyup', () => {

    findText();
})

document.getElementById('addNewLogBtn').addEventListener('click', () => {
    let name = document.getElementById('movementName').innerText;
    let movement = "lifts"
    addNewRecord(movement, name);    
})

async function buildMenuUI() {
   
    let data = await buildLiftMenu();
    data = data.sort();
   console.log(data)
    let container = document.getElementById('liftMenuContainer');
    container.innerHTML = '';
    data.forEach(function (lift) {
        let idName = lift.replace(/\s/g, '');
      
        let div = document.createElement('div');
        div.classList.add('mdl-cell');
        div.classList.add('mdl-cell--2-col');
        div.classList.add('mdl-cell--2-col-phone');
        div.classList.add('mdl-shadow--2dp');
        div.classList.add('single-lift');
        div.setAttribute('id', idName)        
        div.innerText = lift;

        div.addEventListener('click', () =>{            
            buildFlyout(lift);            
        })

        container.append(div);
    })

}
async function defaultLiftsMenu() {
    
    let type = "lift"
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
       //console.table(json);
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
async function userLiftsMenu() {

    let user_id = localStorage.getItem('ID');
    let movement = "lifts"
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
       // console.log(json);
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


async function addNewLift(movement) {

    let body = {
        user_id: localStorage.getItem("ID"),
        name: sanitizeInput(document.getElementById('newName').value),
        type: 'lift',       
        personalRecord:sanitizeInput(document.getElementById('newMax').value),
        comment: sanitizeInput(document.getElementById('newComment').value),
        date: currentDate(),
        preDefined: false
    }
    
    let url = `/api/personalrecord/${movement}`;
        
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
        console.log(json)
        if(json.message === "Success"){
            buildMenuUI();
            document.getElementById('newMovementForm').reset();
            let liftData = {
                name: name,
                preDefined: preDefined
            }
           // localStorage.setItem('lifts', JSON.stringify(liftData))
        }

    } catch (error) {
        console.error(error);
    }
}

async function addNewRecord(movement, name) {

let obj = JSON.parse(sessionStorage.getItem("All Lifts"))
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
    console.log(body)
    let url = `/api/personalrecord/${movement}`;
      console.log(url)  
      console.log(body)  
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
        console.log(json)
        if(json.message === "Success"){
            buildMenuUI();
            //refresh table
            buildFlyout(name);
            document.getElementById('newEntryForm').reset();
        }

    } catch (error) {
        console.error(error);
    }
}
//? Resource: https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c
async function buildLiftMenu() {
    let defaultLifts = await defaultLiftsMenu();
    let userLifts = await userLiftsMenu();    

    let allLifts = defaultLifts.concat(userLifts);

    sessionStorage.setItem('All Lifts', JSON.stringify(allLifts))

    let defaultLiftNames = defaultLifts.map((lift) => {
        return lift.name
    })

    if(userLifts && userLifts.length != 0){
            //* use map() to get just the name
        let userDefinedLiftNames = userLifts.map((lift) => {
            return lift.name
        })
        //* concat() the two arrays together 
        let allLifts = userDefinedLiftNames.concat(defaultLiftNames);
        //console.log(allLifts)
    
        //* new Set() removes duplicate values -> returns object 
        let uniqueMenu = new Set(allLifts);
        //console.log(uniqueMenu)
    
        //* ... spread puts back into array 
        let liftMenu = [...uniqueMenu];
        //console.log(liftMenu)
    
        return liftMenu;
    } else {
        return defaultLiftNames;
    }    
}

function findText() {
    let input = document.getElementById("liftSearch")
    let filter = input.value.toUpperCase();
    let list = document.getElementById("movementList");
    let items = list.querySelectorAll('.single-lift')

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