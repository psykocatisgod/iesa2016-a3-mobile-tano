$(function () {
    
	document.addEventListener("deviceready", onDeviceReady, false);

  // Cordova is ready
  //
  	function onDeviceReady() {
	     
	   var onSuccess = function(language)
	   {
	   		// alert('language: ' + language.value + '\n');
	   		// ajaxify(language.value);
	   		ajaxify(language.value);
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

	$('.ch-lang').on('click', function(){
		ajaxify($this.data('loc'));
	});

	function ajaxify(lang){
		 $.ajax({
            url : "http://www.titouanpierre.com/json/read.php",
            type: 'GET',
            dataType: 'json',
            success : function(data){
            	data = data[0][lang];
  				console.log(data);   
  				$('.datas').html('');
  				for (var i = 0; i < data.length; i++) {
					var html = '<div class="resto-'+data[i].id+'">'+
									'<h2>'+data[i].name+'</h2>'+
									'<div class="description">'+data[i].description+'</div>'
								'</div>';
					$('.datas').append(html);
				}           
            },//Fin Success
	        error: function(xhr, message, errorThrown ){
	            console.log(xhr);
	            console.log(message);
	            console.log(errorThrown);

	        }//Fin Error//endSuccess
        });

	}	

	// ajaxify('fr_FR');

	



});