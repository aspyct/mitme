/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.pages.home", ["mitme.services"])
        .controller('meHomeCtrl', function ($scope, feed) {
            $scope.message = "Hello World";
        });
}());