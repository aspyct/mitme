/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.services", [
        "mitme.services.feed",
        "mitme.services.firebase",
        "mitme.services.auth"
    ]);
}());