document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {

    var onSuccess = function(language)
    {
        alert('language: ' + language.value + '\n');
        document.getElementById('curr-locale').innerHTML(language.value);
        // document.querySelectorAll('.curr-locale').innerHTML = language.value;
    }
    function onError()
    {
        alert('Error getting language\n');
    }
    navigator.globalization.getPreferredLanguage(onSuccess, onError);

}