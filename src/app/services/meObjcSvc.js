/*jslint browser:true */
/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.services.objc", [])
        .service("objc", function () {
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