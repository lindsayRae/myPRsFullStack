//! terminal command: ipconfig
buildMenuUI()


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

document.getElementById('closeFlyout').addEventListener('click', closeFlyout);
document.getElementById('secondaryFlyout').addEventListener('click', closeFlyout)



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
            console.log('heard')
            openFlyout();
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

var dialog = document.querySelector('dialog');
var showModalButton = document.querySelector('.show-modal');
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
showModalButton.addEventListener('click', function () {
    dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function () {
    dialog.close();
    addNewLift();
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