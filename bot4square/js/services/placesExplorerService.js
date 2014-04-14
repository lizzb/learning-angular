//'use strict'; // doesnt explain what this means..
/*

There are different ways to create Angular Services, 
two of them are Service or Factory methods, 
both will provide us with a singleton shared object, 
and the only difference is how they are created, 
I won’t dig more into differences and we’ll use Factory for creating Services. 
You can read this informative stackoverflow question 
which highlights the differences.

So let’s add new JS file named “placesExplorerService.js” 
to the folder “app–>services”, 

this service will be responsible to send HTTP requests 
to Foursquare explore places API. 


... Do not forget to reference the newly created JS file at the bottom of our shell page (index.html) body.
*/

/*
Note: you can use those ClientID and Secret to follow up with this demo app, 
but I recommend to have your own CleintID and secret.
*/
var requestParms = {
    clientId: "DO5JJHGXBODWHZUZ2W45T0S35PKJH3MCLC1SKF5U4X3VF4YA",
    clientSecret: "GF0PDCNGEKSU2GI4ANGBGBKTEUU0G3E3QYPO5YWFXRV33GY5",
    version: "20131230"
}
 
app.factory('placesExplorerService', function ($resource) {
 
 	/*
 	configure the $resource service by passing
 	the params needed by explore places API, you can check
 	the needed mandatory params by visiting their documentation,
 	what is worth mentioning here
 	that :action param will be translated to a part of
 	the request URL and any another params will be treated as
 	query strings (key, value) pairs. 
 	For sure we need extra params to pass it for the API, 
 	such as the nearby city and category to explore for. 
 	Those params will be sent from the controller, we’ll see this soon. 
 	*/
    var requestUri = 'https://api.foursquare.com/v2/venues/:action';
 
    return $resource(requestUri,
    {
        action: 'explore',
        client_id: requestParms.clientId,
        client_secret: requestParms.clientSecret,
        v: requestParms.version,
        venuePhotos: '1',
        callback: 'JSON_CALLBACK'
    },
    {
        get: { method: 'JSONP' }
    });
 
});

/*
you will notice that creating a factory is simple, 
all you need to do is calling app.factory() function 
where app is shared variable declared in app.js file 
holding our module “FoursquareApp”.

As well you will notice that we are 
injecting built-in Angular service named “$resource” into our service, 
this service won’t work until we inject “ngResource” module 
to our “FoursquareApp” module, 
this already done into file app.js.


Basically the built-in $resource is a service 
which allow us to interact with RESTful data sources, 
we can use another lower level built-in service called $http 
but in our case $resource service is sufficient.
*/