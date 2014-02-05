/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.services", [
        "mitme.services.firebase",
        "mitme.services.auth",
        "mitme.services.crypto",
        "mitme.services.objc",
        "mitme.services.assert"
    ]);
}());