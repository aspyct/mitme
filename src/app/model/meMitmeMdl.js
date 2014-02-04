/*globals angular, Firebase */

(function () {
    "use strict";
    
    var firebaseUrl = "https://mitme.firebaseio.com/";
    
    angular.module("mitme.model.mitme", ["mitme.services.firebase", "mitme.services.auth", "mitme.model.user"])
        .service("mitme", function ($mitme, auth, users) {
            var Mitme,
                mitme;
            
            Mitme = function ($ref) {
                this.$ref = $ref;
            };
            Mitme.prototype = {
                construct: function () {
                    var self,
                        object;
                    
                    self = this;
                    object = self.$ref;
                    
                    object.user = function (id) {
                        return users.userForIdIn$Mitme(id, self.$ref);
                    };
                    
                    object.currentUser = function () {
                        return object.user(auth.currentUser().id);
                    };
                    
                    return object;
                }
            };
            
            mitme = new Mitme($mitme);
            return mitme.construct();
        });
}());