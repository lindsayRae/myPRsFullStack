

import { buildMenuUI } from './movement.js';

document.getElementById("liftsMenuBtn").addEventListener("click", ()=> {  
  sessionStorage.setItem('Movement', 'lift');
  sessionStorage.setItem('Movement Title', 'Lifts');
  switchToMovementUI(); 
})

document.getElementById("cardioMenuBtn").addEventListener("click", ()=> {  
  sessionStorage.setItem('Movement', 'cardio');
  sessionStorage.setItem('Movement Title', 'Cardio');
  switchToMovementUI();
})

document.getElementById("skillsMenuBtn").addEventListener("click", ()=> {  
  sessionStorage.setItem('Movement', 'skill');
  sessionStorage.setItem('Movement Title', 'Skills');
  switchToMovementUI();
})

document.getElementById('home').addEventListener('click', ()=>{
  if(!document.getElementById('home').classList.contains('active')){
    document.getElementById('mainDashboard').classList.remove('hide');
    document.getElementById('mainMovements').classList.add('hide');
    document.getElementById('home').classList.add('active');
  }
})

function switchToMovementUI(){  
  document.getElementById('mainDashboard').classList.add('hide');
  document.getElementById('mainMovements').classList.remove('hide');
  document.getElementById('home').classList.remove('active');

  buildMenuUI()
}


