/*globals angular, Firebase */

(function () {
    "use strict";
    
    var firebaseUrl = "https://mitme.firebaseio.com/";
    
    angular.module("mitme.services.firebase", ["firebase"])
        .value("firebase", new Firebase(firebaseUrl))
        .value("angularfire", function ($firebase, firebase) {
            return $firebase(firebase);
        });
}());