/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.model.user", ["mitme.model.inbox"])
        .service("users", function (inboxes) {
            var User;
            
            User = function ($ref) {
                this.$ref = $ref;
            };
            User.prototype = {
                construct: function () {
                    var self,
                        object;
                    
                    self = this;
                    object = self.$ref.$child("data");
                    
                    object.inbox = function () {
                        return inboxes.inboxFor$User(self.$ref);
                    };
                    
                    return object;
                }
            };
            
            return {
                userForIdIn$Mitme: function (id, $mitme) {
                    var user;
                    
                    user = new User($mitme.$child("users").$child(id));
                    return user.construct();
                }
            };
        });
}());
