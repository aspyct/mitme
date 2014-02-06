/*globals angular, Firebase */

(function () {
    "use strict";
    
    angular
        .module("mitme.services.firebase", ["firebase"])
        .factory("mitmeRef", function (firebaseUrl) {
            return new Firebase(firebaseUrl);
        })
        .factory("$mitme", function ($firebase, mitmeRef) {
            return $firebase(mitmeRef);
        });
}());