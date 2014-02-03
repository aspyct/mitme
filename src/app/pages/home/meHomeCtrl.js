/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.pages.home", ["mitme.services"])
        .controller('meHomeCtrl', function ($scope, inbox, auth) {
            auth.addAuthListener(function (user) {
                if (user) {
                    $scope.inbox = inbox.inboxForCurrentUser().listConversations();
                }
            });
            
            $scope.sendMessage = function () {
                inbox.inboxForCurrentUser().sendMessage({id: $scope.userId}, {
                    location: "Brussels",
                    message: $scope.message
                });
                
                $scope.inbox = inbox.inboxForCurrentUser().listConversations();
            };
        });
}());