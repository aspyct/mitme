/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.model.user", ["mitme.model.inbox"])
        .factory("users", function (inboxes) {
            var User;
            
            User = function ($ref) {
                this.$ref = $ref;
            };
            User.prototype = {
                construct: function () {
                    var self,
                        user;
                    
                    self = this;
                    user = {
                        inbox: function () {
                            return inboxes.inboxForUser(user, self.$ref);
                        },
                        profile: self.$ref.$child("profile"),
                        devices: self.$ref.$child("devices")
                    };
                    
                    return user;
                }
            };
            
            return {
                userForId: function (id, $mitmeRef) {
                    var user;
                    
                    user = new User($mitmeRef.$child("users").$child(id));
                    return user.construct();
                }
            };
        });
}());
