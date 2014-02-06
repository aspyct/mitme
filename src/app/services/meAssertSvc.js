/*globals angular */

(function () {
    "use strict";
    
    /**
     * Provide various assertions.
     * 
     * All of these assertions throw errors when they fail.
     * An assertion is used to denote a programmatic error, so these
     * errors should be reported to a system somewhere.
     * 
     * @module mitme.services.assert
     */
    angular.module("mitme.services.assert", [])
        .factory("assert", function () {
            function assert(test, message) {
                if (!test) {
                    throw new Error(message);
                }
            }
            
            /**
             * @class Assert
             */
            return {
                /**
                 * Asserts that value is true.
                 * 
                 * @method isTrue
                 * @param value {Boolean} the value that must be true
                 * @param [message] {String} the failure message
                 */
                isTrue: function (value, message) {
                    if (message === undefined) {
                        message = "Value must be truthy";
                    }
                    
                    assert(value, message);
                },
                
                /**
                 * Asserts that an object has a certain attribute.
                 * 
                 * Does not do any assertions on the value of the attribute,
                 * except that it must not be undefined.
                 * 
                 * @method hasAttr
                 * @param object {Object} the object that must have an attribute
                 * @param attr {String} the attribute name
                 * @param [message] the failure message
                 */
                hasAttr: function (object, attr, message) {
                    if (message === undefined) {
                        message = "Attribute " + attr + " must exist on object";
                    }
                
                    assert(object[attr] !== undefined, message);
                },
                
                /**
                 * Asserts that a variable is a String
                 * 
                 * @method isString
                 * @param value {String} the value that must be a string
                 * @param [message] {String} the failure message
                 */
                isString: function (value, message) {
                    if (message === undefined) {
                        message = "Value must be of type string";
                    }
                    
                    assert(typeof value === "string", message);
                },
                
                /**
                 * Asserts that a variable is a Number
                 * 
                 * @method isNumber
                 * @param value {Number} the value that must be a number
                 * @param [message] {String} the failure message
                 */
                isNumber: function (value, message) {
                    if (message === undefined) {
                        message = "Value must be of type number";
                    }
                    
                    assert(typeof value === "number", message);
                },
                
                /**
                 * Asserts that a variable is not null.
                 * 
                 * Value can still be undefined.
                 * 
                 * @method notNull
                 * @param value {any} the value that must not be null
                 * @param [message] {String} the failure message
                 */
                notNull: function (value, message) {
                    if (message === undefined) {
                        message = "Value must not be null";
                    }
                    
                    assert(value !== null, message);
                }
            };
        });
}());