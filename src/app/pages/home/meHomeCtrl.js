/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.pages.home", ["mitme.model.mitme"])
        .controller('meHomeCtrl', function ($scope, mitme, auth, buildMessage) {
            auth.addAuthListener(function (user) {
                if (user) {
                    $scope.messages = mitme.currentUser().inbox().messages;
                } else {
                    $scope.messages = undefined;
                }
            });
            
            $scope.sendMessage = function () {
                var message;
                
                message = buildMessage()
                    .fromUser({
                        name: $scope.userName,
                        id: $scope.userId
                    })
                    .withBody($scope.message)
                    .withLocation({
                        longitude: 0,
                        latitude: 0
                    })
                    .done();
                
                mitme.currentUser().inbox().sendMessage(message);
            };
        });
}());