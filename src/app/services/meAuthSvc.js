/*globals angular, FirebaseSimpleLogin */

(function () {
    "use strict";
    
    angular.module("mitme.services.auth", ["mitme.services.firebase"])
        .service("auth", function (firebase) {
            return {
                login: function () {
                    var auth = new FirebaseSimpleLogin(firebase, function (error, user) {
                        console.log(error);
                        console.log(user);
                    });
                    
                    auth.login("facebook");
                }
            };
        });
}());