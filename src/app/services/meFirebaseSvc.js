/*globals angular, Firebase */

(function () {
    "use strict";
    
    var firebaseUrl = "https://mitme.firebaseio.com/";
    
    angular
        .module("mitme.services.firebase", ["firebase"])
        .value("mitmeRef", new Firebase(firebaseUrl))
        .factory("$mitme", function ($firebase, mitmeRef) {
            return $firebase(mitmeRef);
        });
}());