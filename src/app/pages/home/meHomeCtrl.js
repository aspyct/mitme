/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.pages.home", ["mitme.model.mitme"])
        .controller('meHomeCtrl', function ($scope, mitme, auth) {
            auth.addAuthListener(function (user) {
                if (user) {
                    $scope.inbox = mitme.currentUser().inbox();
                } else {
                    $scope.inbox = {};
                }
            });
            
            $scope.sendMessage = function () {
                mitme.currentUser().inbox().sendMessage({id: $scope.userId}, {
                    location: "Brussels",
                    message: $scope.message
                });
            };
        });
}());