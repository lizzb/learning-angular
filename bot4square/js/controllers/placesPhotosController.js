/*
As we mentioned earlier each view has it’s unique controller, 
so we need to create new controller named “placesPhotosController”, 
so add new JS file named “placesPhotosController.js” under “app–>controllers”. 
You can check controller code on github.
*/

'use strict';
app.controller('placesPhotosController', function ($scope, $modalInstance, venueName, venuePhotos) {

    $scope.venueName = venueName;
    $scope.venuePhotos = venuePhotos;

    $scope.close = function ()
    {
        $modalInstance.dismiss('cancel');
    };

    $scope.buildVenuePhoto = function (photo) {

        return photo.prefix + '256x256' + photo.suffix;
    };
});