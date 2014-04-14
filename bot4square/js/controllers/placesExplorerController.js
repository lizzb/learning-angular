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



app.controller('placesExplorerController', function ($scope) {
    $scope.exploreNearby = "New York";
});