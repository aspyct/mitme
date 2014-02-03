/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.pages.login", ["mitme.services.auth"])
        .controller("meLoginCtrl", function ($scope, $location, auth) {
            console.log(auth.loggedIn());
            if (auth.loggedIn()) {
                $location.path("/");
            }
            
            $scope.loginFailed = false;
            
            $scope.login = function () {
                auth.login(function () {
                    // success, go to home
                    console.log($location);
                    $location.path("/");
                }, function () {
                    // failure, display error
                    $scope.loginFailed = true;
                });
            };
        });
}());