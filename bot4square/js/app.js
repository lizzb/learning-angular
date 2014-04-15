/*
“app.js” =  file is responsible to create modules in applications, 
in our case we’ll have a single module called “FoursquareApp”, 
we can consider module as collection of services, directives, filters 
which is used in the application. 
Each module has configuration block where it gets applied 
to the application during the bootstrap process.
*/

var app = angular.module('FoursquareApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);

/*use Angular Routing to help us loading the correct view when user request it,
thanks for the built in Angular service named “$routeProvider”,
this service mainly responsible to wire the controllers, view templates,
and the current URL location in the browser,
usually every view template is mapped to a unique controller. 
To use this service we need to inject “ngRoute” module in our application. 
“ngResource” and “ui.bootstrap” are injected for further use.
*/
app.config(function ($routeProvider) {
 	/*
 	a single URL “/explore” and mapped it to the view “placesresults.html”,
 	so when the user requests http://.../index.html#/explore,
 	Angular will match it with the route we configured and
 	load the correct view “placesresults.html”, 
 	then it invokes the controller “placesExplorerController” 
 	where we can write our business logic for this view. 
 	As well we’ve configured the route provider to return 
 	to URL “/explore” when ever it didn’t find any matching URL 
 	by using the “otherwise” function.
 	*/

    $routeProvider.when("/explore", {
        controller: "placesExplorerController",
        templateUrl: "learning-angular/bot4square/views/placesresults.html"
    });
//templateUrl: "../views/placesresults.html"
//"/app/views/myplaces.html"


/*
configure $routeProvider so Angular will be aware that the view “myplaces.html” is mapped to the controller “myPlacesController” when the user request the URL “/places”
*/
    app.config(function ($routeProvider) {
 
    $routeProvider.when("/places", {
        controller: "myPlacesController",
        templateUrl: "learning-angular/bot4square/views/myplaces.html" //"/app/views/myplaces.html"
    });
 
});

    $routeProvider.otherwise({ redirectTo: "/explore" });
 
});

       // templateUrl: "/learning-angular/bot4square/views/placesresults.html"
