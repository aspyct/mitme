/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme", ["ngRoute", "mitme.pages", "mitme.services", "mitme.directives.titlebar"])
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    controller: "meHomeCtrl",
                    templateUrl: "app/pages/home/home.html" // TODO Specify this more easily?
                })
                .when("/login", {
                    controller: "meLoginCtrl",
                    templateUrl: "app/pages/login/login.html"
                })
                .otherwise({
                    redirectTo: "/login"
                });
        });
}());