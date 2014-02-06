/*jslint plusplus:true */
/*globals angular, FirebaseSimpleLogin */

(function () {
    "use strict";
    
    /**
     * @module mitme.services.auth
     */
    angular.module("mitme.services.auth", ["mitme.services.firebase"])
        .factory("auth", function ($firebaseSimpleLogin, $timeout, mitmeRef) {
            var currentUser,
                auth,
                listeners,
                triggerAuthEvent,
                userData;
            
            currentUser = undefined;
            listeners = [];
            
            triggerAuthEvent = function () {
                var i, func;
                for (i = 0; i < listeners.length; ++i) {
                    listeners[i](currentUser);
                }
            };
            
            auth = new FirebaseSimpleLogin(mitmeRef, function (error, user) {
                if (user) {
                    currentUser = user;
                } else {
                    currentUser = null;
                }
                
                $timeout(function () {
                    triggerAuthEvent();
                });
            });
            
            /**
             * Authentication manager
             * 
             * @class Auth
             */
            return {
                /**
                 * Is the user logged in?
                 * 
                 * Three state logic: true, false or undefined.
                 * 
                 * @method loggedIn
                 * @return {Boolean} true if connected, false if not, undefined if we don't know
                 */
                loggedIn: function () {
                    if (currentUser !== undefined) {
                        return currentUser !== null;
                    } else {
                        return undefined;
                    }
                },
                
                /**
                 * Get the current user
                 * 
                 * @return {AuthUser} the authenticated user object. Can be null or undefined depending on login state.
                 */
                currentUser: function () {
                    return currentUser;
                },
                
                /**
                 * Offers to the user to login
                 * 
                 * Current implementation offers login via facebook only.
                 */
                login: function () {
                    auth.login("facebook");
                },
                
                /**
                 * Register an authentication listener function.
                 * 
                 * The listener takes exactly one argument: the currentUser.
                 * It will be called instantaneously, as well as each time
                 * the login status changes (login, logout or error).
                 * Refer to the documentation of currentUser() for more info
                 * on the argument passed.
                 * 
                 * @param listener {Function} the listener function
                 */
                addAuthListener: function (listener) {
                    listeners.push(listener);
                    
                    $timeout(function () {
                        listener(currentUser);
                    });
                },
                
                /**
                 * Remove a previously registered auth listener.
                 */
                removeAuthListener: function (listener) {
                    var position;
                    
                    position = listeners.indexOf(listener);
                    if (position !== -1) {
                        listeners.splice(position, 1);
                    }
                }
            };
        });
}());