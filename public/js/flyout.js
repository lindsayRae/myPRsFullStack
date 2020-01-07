
//! LINDSAY PICK UP WITH FLYOUT REFACTOR
export { closeFlyout, buildFlyout }
import { fillEditForm } from './editMovement.js';


function buildFlyout(movementName){
    console.log(movementName)
    let title = document.getElementById('movementName');
    title.innerText = movementName;   
      
    movementPR(movementName);    
     setTimeout(()=>{
            openFlyout();
        }, 300)
               
}

//* find the PR from selected lift 
async function movementPR(movementName){
    let liftRecords = await selectedLiftRecords(movementName);   
    console.log(liftRecords)
   if(liftRecords.length < 1){       
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
     //   console.log(highestRecord);

        document.getElementById('currentPRLog').innerText = highestRecord.personalRecord;
        document.getElementById('currentPRDate').innerText = highestRecord.date;
}

//* find all the records for selected lift 
async function selectedLiftRecords(lift){

    let allRecords = await allLiftRecords();
        console.log(allRecords)
    if(allRecords.length <= 0){
        return []
    } else {
        let selectedLift = allRecords.filter(el => el.name === lift);        
        return selectedLift;    
    }  
}

//* get all of the lift records from the server
async function allLiftRecords(){

    let userID = localStorage.getItem('ID');
    let movement = sessionStorage.getItem('Movement')
    try {
        let url = `/api/personalrecord/${userID}?movement=${movement}`;
        let headers = {
            "Content-Type": "application/json"
        }

        let res = await fetch(url, {
            method: "GET",
            headers: headers
        })
        let json = await res.json()
        
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

function recordTable(liftRecords){
  //  console.log(liftRecords)
    let table = document.getElementById('recordTable');
    table.innerHTML = '';
    let thead = document.createElement('thead');
    
    let trHead = document.createElement('tr'); 
    let thEdit = document.createElement('th');
    let thDate = document.createElement('th');
    let thUnit = document.createElement('th');        
    let tbody = document.createElement('tbody');    
    
    thEdit.innerText = '';
    thDate.innerText = 'Date';
    thUnit.innerText = 'Max lbs';    

    table.appendChild(thead);
    thead.appendChild(trHead);
    trHead.appendChild(thEdit);
    trHead.appendChild(thDate);
    trHead.appendChild(thUnit);         
    
    liftRecords.forEach(el => {
    //    console.log(el);
        let tr = document.createElement('tr');

        let tdEdit = document.createElement('td');
        let noteIcon = document.createElement('i');
        noteIcon.classList.add('material-icons');
        noteIcon.classList.add('edit-icon');
        noteIcon.innerText = 'edit';
        
        noteIcon.addEventListener('click', ()=>{
                       
            closeFlyout();            
            fillEditForm(el);       
        })

        tdEdit.appendChild(noteIcon);

        let tdDate = document.createElement('td');
     
        tdDate.innerText = el.date;

        let tdEntry = document.createElement('td');
        tdEntry.innerText = el.personalRecord;      

        tr.appendChild(tdEdit);
        tr.appendChild(tdDate);
        tr.appendChild(tdEntry);       
        
        tbody.appendChild(tr);
    })

    table.appendChild(tbody); 
}


function noEntries(){
    document.getElementById('flyoutHeader').classList.add('hide');
    document.getElementById('tableContainer').classList.add('hide');
    document.getElementById('noRecordsMsg').classList.remove('hide');
}

function openFlyout(){ 
    document.getElementById("mainFlyout").style.width = "75%";
    document.getElementById("mainFlyout").style.paddingLeft = "5%";
    document.getElementById("mainFlyout").style.paddingRight = "5%";
    document.getElementById("secondaryFlyout").style.width = "15%";
    document.getElementById("liftMenuContainer").classList.add('fixed-position');
     
  }

  function closeFlyout(){   
    document.getElementById("mainFlyout").style.width = "0";
    document.getElementById("mainFlyout").style.paddingLeft = "0";
    document.getElementById("mainFlyout").style.paddingRight = "0";
    document.getElementById("secondaryFlyout").style.width = "0"; 
    document.getElementById("liftMenuContainer").classList.remove('fixed-position');
}