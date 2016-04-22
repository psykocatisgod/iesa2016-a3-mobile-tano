$(function () {

    var permanentStorage = window.localStorage,
        btnMaj = document.querySelector('.maj'),
        firstNameInput = document.getElementById('first_name');

    if (permanentStorage.getItem('firstName')) {
        firstNameInput.setAttribute('value', permanentStorage.getItem('firstName'));
    }

    btnMaj.addEventListener('click', function (e) {
        var firstName = firstNameInput.value;

        permanentStorage.setItem('firstName', firstName);
    });

});