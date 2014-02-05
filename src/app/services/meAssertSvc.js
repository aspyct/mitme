/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.services.assert", [])
        .factory("assert", function () {
            function assert(test, message) {
                if (!test) {
                    throw new Error(message);
                }
            }
            
            return {
                isTrue: function (value, message) {
                    if (message === undefined) {
                        message = "Value must be true";
                    }
                    
                    assert(value, message);
                },
                hasAttr: function (object, attr, message) {
                    if (message === undefined) {
                        message = "Attribute " + attr + " must exist on object";
                    }
                
                    assert(object[attr] !== undefined, message);
                },
                isString: function (value, message) {
                    if (message === undefined) {
                        message = "Value must be of type string";
                    }
                    
                    assert(typeof value === "string", message);
                },
                isNumber: function (value, message) {
                    if (message === undefined) {
                        message = "Value must be of type number";
                    }
                    
                    assert(typeof value === "number", message);
                },
                notNull: function (value, message) {
                    if (message === undefined) {
                        message = "Value must not be null";
                    }
                    
                    assert(value !== null, message);
                }
            };
        });
}());