$(function () {
     //google map
    function initialize() {
        
        
        var onSuccess = function(position) {

            var lat = position.coords.latitude,
                lng = position.coords.longitude;

            var mycoord = new google.maps.LatLng( lat, lng );
            var mapOptions = {
              center: mycoord,
              zoom: 13,
              streetViewControl: false,
              zoomControl: false
            }
            var map = new google.maps.Map(document.getElementById('map'),
                mapOptions);

            var marker = new google.maps.Marker({
              position: mycoord,
              map: map
            });


            };

            // onError Callback receives a PositionError object
            function onError(error) {
                alert('code: '    + error.code    + '\n' +
                      'message: ' + error.message + '\n');
            }

            navigator.geolocation.getCurrentPosition(onSuccess, onError);

      }
    google.maps.event.addDomListener(window, 'load', initialize);


   //  'use strict';

   // var carte, infowindow, final = [],
   //    markers = [],
   //    LatiLong;

   // function googleMaps() {

   //  var onSuccess = function(position){
   //      LatiLong = {
   //       lat: position.coords.latitude,
   //       lng: position.coords.longitude
   //      };

   //    var mycoord = new google.maps.LatLng( LatiLong.lat, LatiLong.lng );

   //    var options = {
   //       center: mycoord,
   //       zoom: 13,
   //       mapTypeId: google.maps.MapTypeId.ROADMAP,
   //       draggable: true,
   //       scrollwheel: false
   //    };

   //    var carte = new google.maps.Map(document.getElementById("map"), options),
   //      infowindow = new google.maps.InfoWindow();

   //     var marker = new google.maps.Marker({
   //            position: mycoord,
   //            map: carte
   //          }); 

   //    var service = new google.maps.places.PlacesService(carte);

   //    var input = document.getElementById('pac-input');
   //    var searchBox = new google.maps.places.SearchBox(input);
   //    carte.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

   //    carte.addListener('bounds_changed', function () {
   //       searchBox.setBounds(carte.getBounds());
   //    });

   //    searchBox.addListener('places_changed', function () {
   //       var places = searchBox.getPlaces();

   //       if (places.length == 0) {
   //          return;
   //       }
   //       marker.setMap(null);
   //       // Clear out the old markers.
   //       markers.forEach(function (marker) {
   //          marker.setMap(null);
   //       });
   //       markers = [];

   //       // For each place, get the icon, name and location.
   //       var bounds = new google.maps.LatLngBounds();
   //       places.forEach(function (place) {
   //          var icon = {
   //             url: place.icon,
   //             size: new google.maps.Size(71, 71),
   //             origin: new google.maps.Point(0, 0),
   //             anchor: new google.maps.Point(17, 34),
   //             scaledSize: new google.maps.Size(25, 25)
   //          };

   //          // Create a marker for each place.
   //          markers.push(new google.maps.Marker({
   //             map: carte,
   //             icon: icon,
   //             title: place.name,
   //             position: place.geometry.location
   //          }));

   //          if (place.geometry.viewport) {
   //             // Only geocodes have viewport.
   //             bounds.union(place.geometry.viewport);
   //          } else {
   //             bounds.extend(place.geometry.location);
   //          }
   //          LatiLong = {
   //             lat: place.geometry.location.lat(),
   //             lng: place.geometry.location.lng()
   //          };
   //       });
   //       carte.fitBounds(bounds);
         
   //       service.nearbySearch({
   //          location: LatiLong,
   //          radius: 300,
   //          types: ['restaurant']
   //       }, callback);
   //    });

   //  }//onSuccess
   //   navigator.geolocation.getCurrentPosition(onSuccess, onError);

   // }

   // function callback(results, status) {
   //    if (status === google.maps.places.PlacesServiceStatus.OK) {
   //  console.log('ici');
   //       for (var i = 0; i < results.length; i++) {
   //          createMarker(results[i]);
   //          var reponse = document.querySelector('.list-group'),
   //             list = document.createElement('li'),
   //             valeur = results[i]['name'];
   //          final.push(results[i]['name']);

   //          reponse.appendChild(list);
   //          list.appendChild(document.createTextNode(final[i]));
   //       }
   //    }
   // }

   // function createMarker(place) {
   //    var placeLoc = place.geometry.location;
   //    var marker = new google.maps.Marker({
   //       map: carte,
   //       position: place.geometry.location
   //    });

   //    google.maps.event.addListener(marker, 'click', function () {
   //       infowindow.setContent(place.name);
   //       infowindow.open(carte, this);
   //    });
   // }

  
   

   // function onError(error) {
   //      alert('code: '    + error.code    + '\n' +
   //            'message: ' + error.message + '\n');
   //  }


   // // googleMaps();
   // google.maps.event.addDomListener(window, 'load', googleMaps);




});