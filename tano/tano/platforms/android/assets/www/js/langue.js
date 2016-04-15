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
	   navigator.globalization.getLocaleName(onSuccess, onError);

	}

	$('.curr-locale').on('click', function(){
		$('.dropdown-menu').toggleClass('active');
	});

	function ajaxify(){
		 $.ajax({
                url : "http://www.titouanpierre.com/json/_infos.json",
                type: 'POST',
                dataType: 'json',
                success : function(data){

                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                    	$('.datas').append('<li>'+data[i].id+'</li>');
                	}//endfor
                },//Fin Success
		        error: function(){
		            alert('Erreur Serveur');
		        }//Fin Error//endSuccess
        });
	}

	ajaxify();



});