/*jslint plusplus:true */
/*globals angular, FirebaseSimpleLogin */

(function () {
    "use strict";
    
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
            
            return {
                /**
                 * Is the user logged in?
                 * Three state logic: true, false or undefined.
                 * @return {Boolean} true if connected, false if not, undefined if we don't know
                 */
                loggedIn: function () {
                    if (currentUser !== undefined) {
                        return currentUser !== null;
                    } else {
                        return undefined;
                    }
                },
                currentUser: function () {
                    return currentUser;
                },
                login: function () {
                    auth.login("facebook");
                },
                addAuthListener: function (listener) {
                    listeners.push(listener);
                    
                    $timeout(function () {
                        listener(currentUser);
                    });
                },
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