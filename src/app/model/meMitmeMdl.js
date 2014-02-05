/*globals angular, Firebase */

(function () {
    "use strict";
    
    var firebaseUrl = "https://mitme.firebaseio.com/";
    
    angular.module("mitme.model.mitme", ["mitme.services.firebase", "mitme.services.auth", "mitme.model.user"])
        .factory("mitme", function ($mitme, auth, users) {
            var Mitme;
            
            Mitme = function ($ref) {
                this.$ref = $ref;
            };
            Mitme.prototype = {
                construct: function () {
                    var self,
                        mitme;
                    
                    self = this;
                    mitme = {
                        user: function (id) {
                            return users.userForId(id, self.$ref);
                        },
                        currentUser: function () {
                            return this.user(auth.currentUser().id);
                        }
                    };
                    
                    return mitme;
                }
            };
            
            return new Mitme($mitme).construct();
        });
}());