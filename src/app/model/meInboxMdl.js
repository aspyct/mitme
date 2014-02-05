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
                        inbox;
                    
                    self = this;
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
                        messages: {} // TODO Should be an ordered array
                    };
                    
                    // TODO Should handle remove_child, probably...
                    self.$ref.$on("change", function (senderId) {
                        var data,
                            sensitive,
                            message;
                        
                        data = self.$ref[senderId];
                        sensitive = crypto.decrypt(data.message);
                        message = buildMessage()
                            .fromUser({
                                id: senderId,
                                name: data.sender
                            })
                            .withBody(sensitive.body)
                            .onDate(sensitive.date)
                            .withLocation(sensitive.location)
                            .done();
                        
                        inbox.messages[senderId] = message;
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