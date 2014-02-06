/*jslint devel:true */
/*globals angular */

(function () {
    // https://github.com/firebase/angularFire-seed/blob/master/app/js/module.routeSecurity.js
    "use strict";
    
    var SecurityManager;
    
    angular.module("mitme.services.security", ["mitme.services.auth"])
        .run(function ($route, $location, $rootScope, loginPath, auth) {
            new SecurityManager($route, $location, $rootScope, loginPath, auth)
                .install();
        });
    
    SecurityManager = function ($route, $location, $rootScope, loginPath, auth) {
        this.route = $route;
        this.location = $location;
        this.rootScope = $rootScope;
        this.loginPath = loginPath;
        this.auth = auth;
        this.redirectTo = null;
    };
    
    SecurityManager.prototype = {
        install: function () {
            var self = this;
            
            this.rootScope.$on("$routeChangeStart", function (error, next) {
                self.redirectIfNeeded(next);
            });
            
            this.auth.addAuthListener(function () {
                self.checkCurrent();
            });
        },
        checkCurrent: function () {
            if (this.auth.loggedIn() !== undefined) {
                console.debug("User logged in? " + this.auth.loggedIn());
                
                if (this.redirectTo !== null && this.auth.loggedIn()) {
                    // We're logged in, and we need to go somewhere, so go !
                    this.goTo(this.redirectTo);
                    this.redirectTo = null;
                } else if (this.route.current) {
                    // Let's check stuff
                    this.redirectIfNeeded(this.route.current);
                }
            } else { // else, login state is not known, so wait for it.
                console.debug("No info on login state");
            }
        },
        redirectIfNeeded: function (route) {
            var pathTo;
            
            if (route.pathTo !== undefined) {
                pathTo = route.pathTo;
            } else {
                pathTo = this.location.path();
            }
            
            if (this.auth.loggedIn() === true) {
                if (pathTo === this.loginPath) {
                    this.goTo("/");
                }
            } else if (this.auth.loggedIn === false && route.authRequired) {
                if (pathTo === undefined) {
                    this.redirectTo = this.location.path();
                } else {
                    this.redirectTo = route.pathTo === this.loginPath ? "/" : route.pathTo;
                }
                
                this.goTo(this.loginPath);
            } // else we don't know the login state yet, so let things happen
        },
        goTo: function (where) {
            this.location.replace();
            this.location.path(where);
        }
    };
}());