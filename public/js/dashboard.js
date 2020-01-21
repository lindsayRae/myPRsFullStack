import { openFlyout, closeFlyout } from './flyout.js';
//import { populateUserAccount } from './userAccount.js';

document.getElementById("liftsMenuBtn").addEventListener("click", ()=> {  
  sessionStorage.setItem('Movement', 'lift');
  sessionStorage.setItem('Movement Title', 'Lifts');
  location.href = "/movements.html";
})

document.getElementById("cardioMenuBtn").addEventListener("click", ()=> {  
  sessionStorage.setItem('Movement', 'cardio');
  sessionStorage.setItem('Movement Title', 'Cardio');
  location.href = "/movements.html";
})

document.getElementById("skillsMenuBtn").addEventListener("click", ()=> {  
  sessionStorage.setItem('Movement', 'skill');
  sessionStorage.setItem('Movement Title', 'Skills');
  location.href = "/movements.html";
})

document.getElementById("userAccount").addEventListener("click", ()=> {  
  
 // populateUserAccount()

})


document.getElementById("closeFlyout").addEventListener("click", ()=> {  
  console.log('heard click')
  closeFlyout();
})

document.getElementById("secondaryFlyout").addEventListener("click", ()=> {  
  console.log('heard click')
  closeFlyout();
})