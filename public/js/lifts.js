

document.getElementById('liftSearch').addEventListener('keyup', () => {
    console.log("heard")
    findText();
})

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

