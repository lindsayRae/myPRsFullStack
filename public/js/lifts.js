//! terminal command: ipconfig
buildMenuUI()

document.getElementById('closeFlyout').addEventListener('click', closeFlyout);
document.getElementById('secondaryFlyout').addEventListener('click', closeFlyout)

let dialog = document.querySelector('dialog');
let showModalButton = document.querySelector('.show-modal');
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

showModalButton.addEventListener('click', function () {
    dialog.showModal();
});
dialog.querySelector('.add-lift').addEventListener('click', function () {
    dialog.close();
    addNewLift();
});
dialog.querySelector('.close').addEventListener('click', function () {
    dialog.close();    
});

document.getElementById('clearFilter').addEventListener('click', () => {
    console.log("heard")
    document.getElementById('searchLiftForm').reset();
    findText();
})
document.getElementById('liftSearch').addEventListener('touchstart', () => {

    findText();
})
document.getElementById('liftSearch').addEventListener('keyup', () => {

    findText();
})
function openFlyout(){ 
  document.getElementById("mainFlyout").style.width = "75%";
  document.getElementById("mainFlyout").style.paddingLeft = "5%";
  document.getElementById("mainFlyout").style.paddingRight = "5%";
  document.getElementById("secondaryFlyout").style.width = "15%";
  document.getElementById("liftMenuContainer").classList.add('fixed-position');
   
}

//* get all of the lift records from the server
async function allLiftRecords(){

    let userID = localStorage.getItem('ID');
    try {
        let url = `/api/personalrecord/${userID}?movement=lifts`;
        let headers = {
            "Content-Type": "application/json"
        }

        let res = await fetch(url, {
            method: "GET",
            headers: headers
        })
        let json = await res.json()
        console.table(json);
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

//* find all the records for selected lift 
async function selectedLiftRecords(lift){

    let allRecords = await allLiftRecords();
    console.log(allRecords);

    let selectedLift = allRecords.filter(el => el.name === lift);
    console.log(selectedLift);
    return selectedLift;

}

//* find the PR from selected lift 
async function liftPR(lift){
    let liftRecords = await selectedLiftRecords(lift);
   

   if(liftRecords.length < 1){
       console.log('no data')
       noEntries();
   } else {
        document.getElementById('flyoutHeader').classList.remove('hide');
        document.getElementById('tableContainer').classList.remove('hide');
        document.getElementById('noRecordsMsg').classList.add('hide');
        
        highestRecord(liftRecords);
        recordTable(liftRecords);
   }  

}
function highestRecord(liftRecords){
    let highest;
        let record = [];
        // grab PRs, convert to a number and push to array 
        liftRecords.forEach(el => {
            record.push(Number(el.personalRecord))
        });
        // find the highest number in the array   
        highest = Math.max(...record)    

        // find the first obj that the pr is the highest
        let highestRecord = liftRecords.find(el => el.personalRecord == highest);
        console.log(highestRecord);

        document.getElementById('currentPRLog').innerText = highestRecord.personalRecord;
        document.getElementById('currentPRDate').innerText = highestRecord.date;
}
function recordTable(liftRecords){
    console.log(liftRecords)
    let table = document.getElementById('recordTable');
    table.innerHTML = '';
    let thead = document.createElement('thead');
    
    let trHead = document.createElement('tr'); 
    let thDate = document.createElement('th');
    let thUnit = document.createElement('th');
    let thNote = document.createElement('th');

    let tbody = document.createElement('tbody');    
    
    thDate.classList.add('mdl-data-table__cell--non-numeric');
    thNote.classList.add('mdl-data-table__cell--non-numeric');

    thDate.innerText = 'Date';
    thUnit.innerText = 'Max lbs';
    thNote.innerText = 'Note';

    table.appendChild(thead);
    thead.appendChild(trHead);
    trHead.appendChild(thDate);
    trHead.appendChild(thUnit);
    trHead.appendChild(thNote);    
    
    liftRecords.forEach(el => {
        console.log(el);
        let tr = document.createElement('tr');

        let tdDate = document.createElement('td');
        tdDate.classList.add('mdl-data-table__cell--non-numeric');
        tdDate.innerText = el.date;

        let tdEntry = document.createElement('td');
        tdEntry.innerText = el.personalRecord;

        let tdNote = document.createElement('td');
        tdNote.classList.add('mdl-data-table__cell--non-numeric');
        tdNote.innerText = el.comment;

        tr.appendChild(tdDate);
        tr.appendChild(tdEntry);
        tr.appendChild(tdNote); 
        
        tbody.appendChild(tr);
    })

    table.appendChild(tbody);   

}
function noEntries(){
    document.getElementById('flyoutHeader').classList.add('hide');
    document.getElementById('tableContainer').classList.add('hide');
    document.getElementById('noRecordsMsg').classList.remove('hide');
}
function buildFlyout(lift){

document.getElementById('movementName').innerText = lift;
  
liftPR(lift);
 setTimeout(()=>{
        openFlyout();
    }, 300)
    
   
}
function closeFlyout(){   
    document.getElementById("mainFlyout").style.width = "0";
    document.getElementById("mainFlyout").style.paddingLeft = "0";
    document.getElementById("mainFlyout").style.paddingRight = "0";
    document.getElementById("secondaryFlyout").style.width = "0"; 
    document.getElementById("liftMenuContainer").classList.remove('fixed-position');
}
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

    try {
        let url = "/api/lifts";
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

    try {
        let url = "/api/personalrecord/5dca9b1e90ad79439843b088?movement=lifts";
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
async function addNewLift() {
    console.log("YOOOOOOOOOO")
    let body = {
        name: sanitizeInput(document.getElementById('newName').value),
        description: sanitizeInput(document.getElementById('newDescription').value),       
    }
    let url = "/api/lifts";

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
        if(json){
            buildMenuUI();
            document.getElementById('newMovementForm').reset();
        }

    } catch (error) {
        console.error(error);
    }
}

//? Resource: https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c
async function buildLiftMenu() {
    let defaultLifts = await defaultLiftsMenu();
    let userLifts = await userLiftsMenu();

    //* use map() to get just the name
    let userDefinedLiftNames = userLifts.map((lift) => {
        return lift.name
    })
    let defaultLiftNames = defaultLifts.map((lift) => {
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

}

function findText() {
    let input = document.getElementById("liftSearch")
    let filter = input.value.toUpperCase();
    let list = document.getElementById("movementList");
    let items = list.querySelectorAll('.single-lift')

    for (i = 0; i < items.length; i++) {
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

