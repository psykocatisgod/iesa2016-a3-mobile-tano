$(function () {

    var permanentStorage = window.localStorage,
        btnMaj = document.querySelector('.maj'),
        firstNameInput = document.getElementById('first_name');

    if (permanentStorage.getItem('firstName')) {
        firstNameInput.setAttribute('value', permanentStorage.getItem('firstName'));
    }

    btnMaj.addEventListener('click', function (e) {
        var firstName = firstNameInput.value,
            majSuccess = document.querySelector('.maj-success');
        majSuccess.style.display = 'block';
        permanentStorage.setItem('firstName', firstName);
        setTimeout(function() {
            majSuccess.style.display = 'none';
        }, 3000);
        
    });

});