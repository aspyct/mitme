/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.services.crypto", ["mitme.services.objc"])
        .service("crypto", function (objc) {
            return {
                encrypt: function (object, key) {
                    /* Implement me, native side
                    return objc.call("crypto", "encrypt", {
                        text: text,
                        key: key
                    };
                    */
                    
                    return JSON.stringify(object);
                },
                decrypt: function (blob) {
                    /* TODO Implement me, native side
                    return objc.call("crypto", "decrypt", {
                        blob: blob
                    };
                    */
                    
                    return JSON.parse(blob);
                }
            };
        });
}());