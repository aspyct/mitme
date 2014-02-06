/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.config", [])
        .constant("firebaseUrl", "https://mitme.firebaseio.com/")
        .constant("loginPath", "/login");
}());