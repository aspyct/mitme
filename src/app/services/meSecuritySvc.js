/*jslint devel:true */
/*globals angular */

(function () {
    // https://github.com/firebase/angularFire-seed/blob/master/app/js/module.routeSecurity.js
    "use strict";
    
    var SecurityManager;
    
    /**
     * # Login security manager
     * 
     * Ensures that user is connected to access "restricted" pages.
     * 
     * @module mitme.service.security
     */
    angular.module("mitme.services.security", ["mitme.services.auth"])
        .run(function ($route, $location, $rootScope, loginPath, auth) {
            new SecurityManager($route, $location, $rootScope, loginPath, auth)
                .install();
        });
    
    /**
     * This class is responsible for redirecting the user to the login page
     * when he's trying to access a restricted page.
     * Or to redirect him to home (or the originally requested page) when he
     * is logged in.
     * 
     * There may be only one security manager per application.
     * 
     * @class SecurityManager
     */
    SecurityManager = function ($route, $location, $rootScope, loginPath, auth) {
        this.route = $route;
        this.location = $location;
        this.rootScope = $rootScope;
        this.loginPath = loginPath;
        this.auth = auth;
        this.redirectTo = null;
        this.defaultRedirect = "/";
    };
    
    SecurityManager.prototype = {
        /**
         * Tell this security manager to start watching login status
         * and route changes.
         * 
         * @method install
         */
        install: function () {
            var self = this;
            
            this.rootScope.$on("$routeChangeStart", function (error, next) {
                self.redirectIfNeeded(next);
            });
            
            this.auth.addAuthListener(function () {
                self.checkCurrent();
            });
        },
        
        /**
         * @method checkCurrent
         * @private
         */
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
            } // else, login state is not known, so wait for it.    
        },
        
        /**
         * Redirect the user based on his login status.
         * 
         * - If the user is not logged in and trying to access a restricted page, go to login.
         * - If he's logged in, and is trying to access the login page, go home.
         * - If he had been previously redirected to the login screen, and is now logged in,
         *   redirect him where he wanted to go in the first place.
         * - If the login status is unknow, we don't do anything.
         * 
         * @private
         * @method redirectIfNeeded
         * @param route {Route} the current route the user is taking
         */
        redirectIfNeeded: function (route) {
            var pathTo;
            
            if (this.auth.loggedIn() !== undefined) {
                if (this.auth.loggedIn() === true) {
                    this.authenticatedRedirect(route);
                } else {
                    this.unauthenticatedRedirect(route);
                }
            }  // else we don't know the login state yet, so let things happen
        },
        
        /**
         * Redirect an authenticated user.
         * 
         * If the user is trying to access the login page, go to the home page.
         * 
         * @private
         * @method authenticatedRedirect
         * @param route {Route} the route we're going to
         */
        authenticatedRedirect: function (route) {
            if (this.destination(route) === this.loginPath) {
                // A logged in user does not need to see login page. Go away
                this.goTo(this.defaultRedirect);
            } // else, let it be
        },
        
        /**
         * Redirect an unauthenticated user
         * 
         * If the route requires authentication, go to login.
         * Otherwise, do nothing
         * 
         * @private
         * @method unauthenticatedRedirect
         * @param route {Route} the route we're going to
         */
        unauthenticatedRedirect: function (route) {
            if (route.requireAuth) {
                // Save wanted location for later, after login...
                this.redirectTo = route.pathTo === this.loginPath ? this.defaultRedirect : route.pathTo;
                
                // ... and go to login page
                this.goTo(this.loginPath);
            }
        },
        
        /**
         * Returns the path destination of the user.
         * 
         * Figures out whether the user is dropping on the application with an absolute link,
         * or is just navigating from one fragment to the other within the page.
         * 
         * @private
         * @method pathTo
         * @param route {Route} the route destination
         * @return {String} the path that the user is trying to access
         */
        destination: function (route) {
            if (route.pathTo !== undefined) {
                return route.pathTo;
            } else {
                // User is dropping
                return this.location.path();
            }
        },
        
        /**
         * Redirect the user to a given location
         * 
         * @private
         * @method goTo
         * @param where {String} the URL to redirect the user to
         */
        goTo: function (where) {
            this.location.replace();
            this.location.path(where);
        }
    };
}());