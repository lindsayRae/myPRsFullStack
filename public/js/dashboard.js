

async function defaultLiftsMenu(){
    console.log("get the lifts menu")
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
    console.table(json);
    if (res.status === 200) {
       // location.href = "/lifts.html"
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

async function userLiftsMenu(){
    console.log("get the lifts menu")
   try {
    let url = "/api/personalrecord/5dca9b1e90ad79439843b088?movement=cardio";
    let headers = {
        "Content-Type": "application/json"
    }

    let res = await fetch(url, {
        method: "GET",      
        headers: headers
    })
    console.log(res)
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


document.getElementById("liftsMenuBtn").addEventListener("click", ()=>{

    defaultLiftsMenu()
    //userLiftsMenu()

})