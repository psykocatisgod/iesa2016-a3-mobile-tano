$(function () {
    
	document.addEventListener("deviceready", onDeviceReady, false);

  // Cordova is ready
  //
  	function onDeviceReady() {
	     
	   var onSuccess = function(language)
	   {
	   		// alert('language: ' + language.value + '\n');
	   		$('.curr-locale, .locale').text(language.value);	
   		}
	   function onError()
	   {
	       alert('Error getting language\n');
	   }
	   navigator.globalization.getPreferredLanguage(onSuccess, onError);

	}

});