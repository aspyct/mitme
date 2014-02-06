/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.pages.login", ["mitme.services.auth"])
        .controller("meLoginCtrl", function ($scope, $location, auth) {
            $scope.loginFailed = false;
            
            $scope.login = function () {
                auth.login();
            };
        });
}());