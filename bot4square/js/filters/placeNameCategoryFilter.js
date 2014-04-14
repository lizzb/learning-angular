//
// Step 3: Adding custom filter:
//
app.filter("placeNameCategoryFilter", function () {
    return function (places, filterValue) {
        if (!filterValue) return places;
 
        var matches = [];
        filterValue = filterValue.toLowerCase();
        for (var i = 0; i < places.length; i++) {
            var place = places[i];
 
            if (place.venue.name.toLowerCase().indexOf(filterValue) > -1 ||
            place.venue.categories[0].shortName.toLowerCase().indexOf(filterValue) > -1) {
                matches.push(place);
            }
        }
        return matches;
    };
});

/*
Defining a filter is straight forward and it is like defining a factory, 
all we need to do is to call app.filter() function where app is 
shared variable declared in app.js file holding our module “FoursquareApp”. 
We can inject services in filters but in our case the filter is simple, 
it will accept an array of the places returned from Foursquare API, 
and filter value, then it will filter the places array for the name or 
category only, the result of this process is a new filtered places array.

To use this custom filter in “placesExplorerController” is simple, 
we need just to inject the built-in “$filter” service, then we are able 
to execute our custom filter by calling:

$filter("placeNameCategoryFilter")($scope.places, filterInput);
*/