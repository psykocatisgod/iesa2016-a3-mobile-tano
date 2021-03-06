/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

$(function () {
    var permanentStorage = window.localStorage,
        firstNameInput = document.getElementById('name');

    if (permanentStorage.getItem('firstName')) {
        firstNameInput.textContent = permanentStorage.getItem('firstName');
    }

    console.log(firstNameInput);
});

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        app.setupFindContactsButtonCallback();
        app.setupPhotoFindButton();
        app.checkConnection();
        app.getCompass();
        app.getOrientation();

        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString("#000000");
    },

    getCompass: function () {
        
        var element = document.getElementById('boussole');
        
        function onSuccess(heading) {
            element.innerHTML = 'Boussole: ' + Math.round(heading.magneticHeading * 100) / 100;
        }

        function onError(error) {
            element.innerHTML = 'Vous n\'avez pas la boussole sur votre appareil';
        }

        var options = {
            frequency: 0
        }; // Update every 3 seconds


        navigator.compass.watchHeading(onSuccess, onError, options);
    },

    getOrientation: function () {
        /*var elementX = document.getElementById('accelerationX'),
            elementY = document.getElementById('accelerationY'),
            elementZ = document.getElementById('accelerationZ');*/
        
        function onSuccess(acceleration) {
            if (acceleration.x > 6 || acceleration.x < -6) {
                alert('L\'application n\'est pas disponible en paysage.')
            }
            /*elementX.innerHTML = 'X: ' + Math.round(acceleration.x * 100) / 100;
            elementY.innerHTML = 'Y: ' + Math.round(acceleration.y * 100) / 100;
            elementZ.innerHTML = 'Z: ' + Math.round(acceleration.z * 100) / 100;*/
        }

        function onError() {
            //alert('onError!');
        }

        var options = { frequency: 1 };  // Update every 3 seconds

        var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    },
    
    checkConnection: function () {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN] = 'Unknown';
        states[Connection.ETHERNET] = 'Ethernet';
        states[Connection.WIFI] = 'WiFi';
        states[Connection.CELL_2G] = '2G';
        states[Connection.CELL_3G] = '3G';
        states[Connection.CELL_4G] = '4G';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'Pas connecté';

        document.getElementById('network').innerHTML = states[networkState];
    },

    setupFindContactsButtonCallback: function () {
        $('#findButton').click(function () {
            navigator.contacts.pickContact(function (contact) {
                var prenom = contact.name.givenName;
                var nom = contact.name.familyName;
                var numero = contact.phoneNumbers[0].value;
                $('#myModal').modal('show');
                $('.sendSms').click(function () {
                    var textsms = $('#messageTxt').val();
                    app.sendSms(prenom, nom, numero, textsms);
                });
            }, function (err) {
                console.log('Error: ' + err);
            });
        });
    },
    sendSms: function (prenom, nom, numero, textsms) {
        var number = numero;
        var message = textsms;
        //CONFIGURATION
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT' // send SMS with the native android SMS messaging
                    //intent: '' // send SMS without open any other app
            }
        };
        //alert('Le message n\'a pas été envoyé à ' + prenom + ' ' + nom + ' car vous utilisez un émulateur');
        var success = function () {
            alert('Message sent successfully');
        };
        var error = function (e) {
            alert('Message Failed:' + e);
        };
        sms.send(number, message, options, success, error);
    },


    setupPhotoFindButton: function () {
        $('#findPhotoAlbum').click(function () {
            function cameraSuccess(imageData) {
                var image = document.getElementById('imgCamera');
                image.src = imageData;
            };

            function cameraError(message) {
                alert('Erreur : ' + message);
            };

            var cameraOptions = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
            };

            navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
        });

        $('#camera').click(function () {
            function cameraSuccess(imageURI) {
                var image = document.getElementById('imgCamera');
                image.src = imageURI;
            };

            function cameraError(message) {
                alert('Erreur : ' + message);
            };

            var cameraOptions = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
            };

            navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();