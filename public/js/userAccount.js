

let userAccountDialog = document.getElementById('userAccountBtn');

userAccountDialog.addEventListener('click', function () {
    console.log('heard click')
    document.getElementById('userAccountModal').showModal();
    
});