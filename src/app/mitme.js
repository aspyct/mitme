/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme", ["ngRoute", "mitme.config", "mitme.pages", "mitme.services", "mitme.model", "mitme.directives.titlebar"])
        .config(function ($routeProvider, loginPath) {
            $routeProvider
                .when("/", {
                    controller: "meHomeCtrl",
                    templateUrl: "app/pages/home/home.html", // TODO Specify this more easily?
                    requireAuth: true
                })
                .when(loginPath, {
                    controller: "meLoginCtrl",
                    templateUrl: "app/pages/login/login.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
}());