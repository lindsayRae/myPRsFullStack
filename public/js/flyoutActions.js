
import { closeFlyout, openFlyout } from './flyout.js';
import { populateUserAccount, updateUser, logOut } from './userAccount.js';

// NAVIGATION - BOTH 
document.getElementById("userAccount").addEventListener("click", ()=> {
    console.log('heard') 
    document.getElementById('userAccountContainer').classList.remove('hide')  
    document.getElementById('contactUsContainer').classList.add('hide') 
    populateUserAccount();
 })

 document.getElementById("contact").addEventListener("click", ()=> {
    console.log('heard')   
     
    document.getElementById('userAccountContainer').classList.add('hide')  
    document.getElementById('contactUsContainer').classList.remove('hide') 
    openFlyout(); 
 })
 
 document.getElementById("closeFlyout").addEventListener("click", ()=> {    
    closeFlyout();
  })

  document.getElementById("secondaryFlyout").addEventListener("click", ()=> { 
    closeFlyout();
  })


  document.getElementById('updateUserBtn').addEventListener('click', updateUser);

  document.getElementById('logOutBtn').addEventListener('click', logOut)