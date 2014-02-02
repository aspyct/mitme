/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme", ["ngRoute", "mitme.pages.home", "mitme.services", "mitme.directives.titlebar"])
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    controller: "meHomeCtrl",
                    templateUrl: "app/pages/home/home.html" // TODO Specify this more easily?
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
}());