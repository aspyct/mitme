/*jslint browser:true */
/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.services.objc", [])
        .factory("objc", function () {
            // TODO Extract Plugin & Method to another service file
            var Plugin,
                Method;
            
            Plugin = function (name) {
                this.name = name;
            };
            Plugin.prototype = {
                method: function (name) {
                    
                }
            };
            
            Method = function (plugin, name, async) {
                this.plugin = plugin;
                this.name = name;
            };
            Method.prototype = {
                invoke: function (args, callback) {
                    
                }
            };
            
            return {
                call: function (plugin, method, args, callback) {
                    var request,
                        url,
                        async;
                    
                    if (args === undefined) {
                        args = null;
                    }
                    
                    async = callback !== undefined;
                    
                    url = "objc://" + plugin + "/" + method;
                    request = new XMLHttpRequest();
                    request.open("POST", url, async);
                    
                    request.onreadystatechange = function () {
                        var result;
                        
                        if (request.readyState === 4 && async) {
                            result = JSON.parse(request.responseText);
                            callback(result);
                        }
                    };
                    
                    request.send();
                    
                    if (!async) {
                        return JSON.parse(request.responseText);
                    }
                }
            };
        });
}());