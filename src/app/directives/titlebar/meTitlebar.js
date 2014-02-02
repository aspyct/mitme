/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.directives.titlebar", [])
        .directive("meTitlebar", function () {
            return {
                restrict: "E",
                transclude: true,
                templateUrl: "app/directives/titlebar/me-titlebar.html"
            };
        })
        .directive("meTitlebarButtonBack", function () {
            return {
                restrict: "E",
                templateUrl: "app/directives/titlebar/me-titlebar-button-back.html"
            };
        })
        .directive("meTitlebarButtonCancel", function () {
            return {
                restrict: "E",
                templateUrl: "app/directives/titlebar/me-titlebar-button-cancel.html"
            };
        })
        .directive("meTitlebarButtonMessage", function () {
            return {
                
            };
        })
        .directive("meTitlebarTitle", function () {
            return {
                require: "^meTitlebar",
                restrict: "E",
                transclude: true,
                templateUrl: "app/directives/titlebar/me-titlebar-title.html"
            };
        });
}());