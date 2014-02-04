/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.model.inbox", ["mitme.services.crypto"])
        .service("inboxes", function (crypto) {
            var Inbox;
            
            Inbox = function ($ref) {
                this.$ref = $ref;
            };
            Inbox.prototype = {
                construct: function () {
                    var self,
                        inbox;
                    
                    self = this;
                    inbox = {};
                    
                    inbox.sendMessage = function (sender, message) {
                        var $sender;
                        
                        $sender = self.$ref.$child(sender.id);
                        $sender.$set({
                            date: new Date(),
                            message: crypto.encrypt(message)
                        });
                    };
                    
                    self.$ref.$on("change", function (senderId) {
                        var blob;
                        
                        blob = self.$ref[senderId].message;
                        inbox[senderId] = crypto.decrypt(blob);
                    });
                    
                    return inbox;
                }
            };
            
            return {
                inboxFor$User: function ($user) {
                    var inbox;
                    inbox = new Inbox($user.$child("inbox"));
                    return inbox.construct();
                }
            };
        });
}());