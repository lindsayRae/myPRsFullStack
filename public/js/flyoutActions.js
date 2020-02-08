
import { closeFlyout, openFlyout, resetFlyout } from './flyout.js';
import { populateUserAccount, populateContact, updateUser, logOut } from './userAccount.js';

// NAVIGATION - BOTH 
document.getElementById("userAccount").addEventListener("click", ()=> {
    
    resetFlyout()    
    document.getElementById('userAccountContainer').classList.remove('hide')     
    populateUserAccount()
    openFlyout()
 })

 document.getElementById("contact").addEventListener("click", ()=> {
      
   resetFlyout()     
   document.getElementById('contactUsContainer').classList.remove('hide') 
   populateContact()
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
  document.getElementById('logoutIcon').addEventListener('click', logOut)