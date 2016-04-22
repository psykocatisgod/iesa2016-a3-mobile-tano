$(function () {

    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {

        /*StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString("#000000");*/



        var onSuccess = function (language) {
            // alert('language: ' + language.value + '\n');
            // ajaxify(language.value);
            ajaxify(language.value);
            $('.locale').text(language.value);
        }

        function onError() {
            alert('Error getting language\n');
        }
        navigator.globalization.getLocaleName(onSuccess, onError);
    }

    $( ".datas" ).on( "click", ".restaurant", function(){
        $('#modalMenu').modal('show');
        $('#modalMenu ul li').remove();
        var titre = $(this).find('h2').html();
        $('#modalMenu').find('span').html(titre);
        if(titre == "Agathe Sushi's"){
            var menu = [ "Sushi saumon <span>4€</span>", "Maki (x10) <span>12€</span>", "Rouleau de printemps (x2) <span>6€</span>", "Brochette de boeuf (x3) <span>4€</span>", "Crevettes (x2) <span>5€</span>" ];
        }
        if(titre == "Le Bernie's"){
            var menu = [ "Burger <span>7€</span>", "Frites <span>2€</span>", "Snack <span>3€</span>", "Boissons <span>2€</span>", "Viande <span>5€</span>" ];
        }
        if(titre == "El Rincon de Gustavo"){
            var menu = [ "Tapas <span>6€</span>", "Chili con carne <span>12€</span>", "Fajitas <span>10€</span>", "Burritos <span>5€</span>", "Nachos <span>4€</span>" ];
        }
        for(var i = 0; i<5; i++){
            $('#modalMenu ul').append('<li>'+ menu[i] +'</li>');
        }

    });

    $('.ch-lang').on('click', function () {
        ajaxify($(this).data('loc'));
    });

    function ajaxify(lang) {
        $.ajax({
            url: "http://www.titouanpierre.com/json/read.php",
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                data = data[0][lang];
                console.log(data);
                $('.datas').html('');
                for (var i = 0; i < data.length; i++) {
                    var html = '<div class="restaurant resto-' + data[i].id + '">' +
                        '<h2>' + data[i].name + '</h2>' +
                        '<div class="description">' + data[i].description + '</div>'
                    '</div>';
                    $('.datas').append(html);
                }
            }, //Fin Success
            error: function (xhr, message, errorThrown) {
                    console.log(xhr);
                    console.log(message);
                    console.log(errorThrown);

                } //Fin Error//endSuccess
        });

    }
    // ajaxify('fr_FR');
});