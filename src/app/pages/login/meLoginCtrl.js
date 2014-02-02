/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.pages.login", ["mitme.services.auth"])
        .controller("meLoginCtrl", function ($scope, auth) {
            $scope.login = function () {
                auth.login();
            };
        });
}());