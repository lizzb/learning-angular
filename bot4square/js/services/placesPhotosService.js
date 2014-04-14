/*
To get the images, we need to make HTTP Get request to Foursquare API, 
this call is some how identical to the previous one, 
all we need to do here is to create new service named “placesPhotosService” 
which will be responsible to issue this Get request. 
So create new JS file named “placesPhotosService.js” 
under “app–>services”, you can check it’s code on github.
*/

'use strict';
//Get your client ID and secrent by visiting https://developer.foursquare.com
//Thise are demo client Id & secret.

var requestParms = {
    clientId: "DO5JJHGXBODWHZUZ2W45T0S35PKJH3MCLC1SKF5U4X3VF4YA",
    clientSecret: "GF0PDCNGEKSU2GI4ANGBGBKTEUU0G3E3QYPO5YWFXRV33GY5",
    version: "20131230"
}

app.factory('placesPhotosService', function ($resource) {

    var requestUri = 'https://api.foursquare.com/v2/venues/:venueId/:action';

    return $resource(requestUri,
        {
            action: 'photos',
            client_id: requestParms.clientId,
            client_secret: requestParms.clientSecret,
            v: requestParms.version,
            limit: '9',
            callback: 'JSON_CALLBACK'
        },
        {
            get: { method: 'JSONP' }
        });

});