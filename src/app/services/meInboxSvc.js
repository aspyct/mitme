/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.services.inbox", ["mitme.services.firebase"])
        .service("inbox", function ($firebase, firebase, auth, crypto) {
            var usersRef,
                Inbox;
            
            usersRef = firebase.child("users");
            
            Inbox = function (inboxRef) {
                this.inboxRef = inboxRef;
            };
            Inbox.prototype = {
                listConversations: function () {
                    // TODO Make something that updates automatically with angular
                    return $firebase(this.inboxRef);
                },
                sendMessage: function (sender, message) {
                    var senderRef = this.inboxRef.child(sender.id);
                    senderRef.set({
                        date: new Date(),
                        message: crypto.encrypt(message)
                    });
                }
            };
            
            return {
                inboxForCurrentUser: function () {
                    var currentUser;
                    
                    if (auth.loggedIn()) {
                        currentUser = auth.getCurrentUser();
                        return new Inbox(usersRef.child(currentUser.id).child("inbox"));
                    } else {
                        throw new Error("User is not logged in");
                    }
                },
                inboxForUser: function (user) {
                    return new Inbox(usersRef.child(user.id).child("inbox"));
                }
            };
        });
}());