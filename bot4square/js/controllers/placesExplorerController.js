/*
Step 6: Adding our first controller and view

add our first controller “placesExplorerController”
add new JS file to the folder “app–>controllers”,
name this file “placesExplorerController.js”,
(you can name the file anything you want
but I usually use the same name for file and controller name,)

As we mentioned before, controllers are just 
normal JavaScript functions responsible to 
implement our business logic and validation, 
if you look at the snippet above, you’ll notice that 
we’ve injected an object named “$scope”, 
it is really a glue between the controller and the view, 
you can think of it as container holding the data we want 
to project on the view. 
Here we’ve added new model to the “$scope” object named “exploreNearby”,
this model will be used on the view we’ll add now. 
So let’s add new view to the folder “app–>views”,
name this file “placesresults.html”.
then open the file and clear it’s content from any html tags
such as html body or head, then paste the code snippet below:
*/

/*app.controller('placesExplorerController', function ($scope) {
    $scope.exploreNearby = "New York";
});
*/

'use strict';

/*
We’ve injected the “placesExplorerService” and another
built-in service named “$filter” into the controller.
*/

app.controller('placesExplorerController', function ($scope, placesExplorerService, $filter) {
 
 	/*
 	We’ve defined different model objects
 	(exploreNearby, exploreQuery, places array, etc…)
 	where they will be used for two-way data binding
 	between our view “placesresults.html” and the model.
 	*/
    $scope.exploreNearby = "New York";
    $scope.exploreQuery = "";
    $scope.filterValue = "";
 
    $scope.places = [];
    $scope.filteredPlaces = [];
    $scope.filteredPlacesCount = 0;
 
    //paging
    $scope.totalRecordsCount = 0;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
 
    init();
 
    function init() {
 
        createWatche();
        getPlaces();
    }
 
    function getPlaces() {
 
        var offset = ($scope.pageSize) * ($scope.currentPage - 1);

        //After we injected the service “placesExplorerService”,  
        //and as this code snippet:
        placesExplorerService.get({ near: $scope.exploreNearby, query: $scope.exploreQuery, limit: $scope.pageSize, offset: offset }, function (placesResult) {
 		/*
 		we were able to issue HTTP GET request to the factory we created, 
 		note how we can pass any number of arguments to the get method, 
 		and all those arguments (i.e. near, query, limit, etc..) 
 		will be translated to query string (key, value) pairs, 
 		by having this we were able have a complete GET request 
 		with the needed params for server side pagination.
 		*/
            if (placesResult.response.groups) {
                $scope.places = placesResult.response.groups[0].items;
                $scope.totalRecordsCount = placesResult.response.totalResults;
                filterPlaces('');
            }
            else {
                $scope.places = [];
                $scope.totalRecordsCount = 0;
            }
        });
    };

    /*
    We’ve used custom filter which allow us to filter for results returned, 
    we’ll cover how to create filters soon.
    */
 
    function filterPlaces(filterInput) {
        $scope.filteredPlaces = $filter("placeNameCategoryFilter")($scope.places, filterInput);
        $scope.filteredPlacesCount = $scope.filteredPlaces.length;
    }
 
 	/*
 	We have created a watch for filterValue, in simple words we’ve added listener for on the “filterValue” attribute of the scope, this listener gets fired when the value of this attribute has changed.
 	*/
    function createWatche() {
 
        $scope.$watch("filterValue", function (filterInput) {
            filterPlaces(filterInput);
        });
    }
 
 	/*
 	We’ve added different functions needed to be called from the view,
 	such as “doSearch()” which will be called on the explore button click,
 	
 	as well “pageChanged()” which will be called
 	once the page at the pagination control change.
 	*/
    $scope.doSearch = function () {
 
        $scope.currentPage = 1;
        getPlaces();
    };
 
    $scope.pageChanged = function (page) {
 
        $scope.currentPage = page;
        getPlaces();
    };
 
 	/*
 	Multiple helper functions have been added,
 	those functions are used to build some thumbnails image source.
 	*/
    $scope.buildCategoryIcon = function (icon) {
 
        return icon.prefix + '44' + icon.suffix;
    };
 
    $scope.buildVenueThumbnail = function (photo) {
 
        return photo.items[0].prefix + '128x128' + photo.items[0].suffix;
    };

	/*

To use this custom filter in “placesExplorerController” is simple, 
we need just to inject the built-in “$filter” service, then we are able 
to execute our custom filter by calling:
*/
$filter("placeNameCategoryFilter")($scope.places, filterInput);



/*
part 2 step 5
Till this moment Angular is not aware that 
the new view and controller created are tied together, previously we did this using $routeProvider while booting up our application, but in the case of using $modal service we can inform Angular about this relation once we insentiate the modal, remember that we want to display the view as a modal not as partial view, take a look on the code snippet below inside “placesExplorerController”:

By looking at the code above, you will notice that we’ve injected the new service “placesPhotosService” into the controller so we can issue HTTP Get request. Once we receive the 9 thumbnails successfully from the API, we’ll call $modal.open and inject the template URL, and controller in the configuration section, once this is done Angular will be aware  that this template is mapped to this controller. As well we’ve passed the place name and array of 9 thumbnails to the “placesPhotosController”. The final result will be as the image below:
*/

$scope.showVenuePhotos = function (venueId, venueName) {
 
    placesPhotosService.get({ venueId: venueId }, function (photosResult) {
 
        var modalInstance = $modal.open({
            templateUrl: 'app/views/placesphotos.html',
            controller: 'placesPhotosController',
            resolve: {
                venueName: function () {
                    return venueName;
                },
                venuePhotos: function () {
                    return photosResult.response.photos.items;
                }
            }
        });
 
        modalInstance.result.then(function () {
            //$scope.selected = selectedItem;
        }, function () {
            //alert('Modal dismissed at: ' + new Date());
        });
 
    });
};

    
});