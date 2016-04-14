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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
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

    },


    setupFindContactsButtonCallback: function () {
        $('#findButton').click(function () {

            navigator.contacts.pickContact(function(contact)
            {
                var prenom = contact.name.givenName;
                var nom = contact.name.familyName;
                var numero = contact.phoneNumbers[0].value;

                $('.modal-text-message').show();

                $('.sendSms').click(function(){
                    var textsms = $('#messageTxt').val();
                    app.sendSms(prenom, nom, numero, textsms);
                });

            },function(err){
                console.log('Error: ' + err);
            });
        });
    },

    sendSms: function(prenom, nom, numero, textsms) {
        var number = numero;
        var message = textsms;

        //CONFIGURATION
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };

        var success = function () { alert('Message sent successfully'); };
        var error = function (e) { alert('Message Failed:' + e); };
        sms.send(number, message, options, success, error);
    },


    setupPhotoFindButton: function () {
        $('#findPhotoAlbum').click(function () {
            function cameraSuccess(imageData) {
                var image = document.getElementById('imgCamera');
                image.src = "data:image/jpeg;base64," + imageData;
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
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();