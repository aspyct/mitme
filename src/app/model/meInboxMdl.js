/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.model.inbox", ["mitme.services.crypto", "mitme.model.message"])
        .factory("inboxes", function (crypto, buildMessage) {
            var Inbox;
            
            Inbox = function (user, $inboxRef) {
                this.user = user;
                this.$ref = $inboxRef;
            };
            Inbox.prototype = {
                construct: function () {
                    var self,
                        inbox,
                        cachedMessages;
                    
                    self = this;
                    
                    // The actual inbox has messages sorted by date
                    // but I want to find stuff easily by senderId
                    cachedMessages = {};
                    
                    inbox = {
                        sendMessage: function (message) {
                            var $sender;
                            
                            $sender = self.$ref.$child(message.sender.id);
                            $sender.$set({
                                sender: message.sender.name,
                                message: crypto.encrypt({
                                    body: message.body,
                                    date: message.date,
                                    location: message.location
                                }, self.user)
                            });
                        },
                        messages: []
                    };
                    
                    // TODO Should handle remove_child, probably...
                    self.$ref.$on("change", function (senderId) {
                        var data,
                            sensitive,
                            message,
                            cachedMessage;
                        
                        data = self.$ref[senderId];
                        sensitive = crypto.decrypt(data.message);
                        
                        // FIXME try/catch this, in case some data is wrong
                        message = buildMessage()
                            .fromUser({
                                id: senderId,
                                name: data.sender
                            })
                            .withBody(sensitive.body)
                            .onDate(sensitive.date)
                            .withLocation(sensitive.location)
                            .finish();
                        
                        cachedMessage = cachedMessages[senderId];
                        if (cachedMessage !== undefined) {
                            angular.extend(cachedMessage, message);
                        } else {
                            cachedMessages[senderId] = message;
                            inbox.messages.push(message);
                        }
                    });
                    
                    self.$ref.$on("loaded", function () {
                        inbox.messages.ready = true;
                    });
                    
                    return inbox;
                }
            };
            
            return {
                inboxForUser: function (user, $userRef) {
                    var inbox;
                    
                    inbox = new Inbox(user, $userRef.$child("inbox"));
                    return inbox.construct();
                }
            };
        });
}());