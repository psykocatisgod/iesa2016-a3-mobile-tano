$(function () {

  var permanentStorage = window.localStorage,
      btnMaj = document.querySelector('.maj'),
      firstNameInput = document.getElementById('first_name'),
      lastNameInput = document.getElementById('last_name');
  
  if (permanentStorage.getItem('firstName')) {
/*
    console.log('ok');
*/
    firstNameInput.setAttribute('value', permanentStorage.getItem('firstName'));
    lastNameInput.setAttribute('value', permanentStorage.getItem('lastName'));
  }
  
  btnMaj.addEventListener('click', function (e) {
    var firstName = firstNameInput.value,
        lastName = lastNameInput.value;
    permanentStorage.setItem('firstName', firstName);
    permanentStorage.setItem('lastName', lastName);
/*
    console.log(permanentStorage.getItem('firstName'));
    console.log(permanentStorage.getItem('lastName'));
*/
  });

});