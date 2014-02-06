/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.services.crypto", ["mitme.services.objc"])
        .factory("crypto", function (objc) {
            return {
                /**
                 * Encrypt the message for decryption later.
                 * The user is needed to access all the device's keys.
                 * 
                 * @param {object} the object we want to encrypt
                 * @param {User} user the user that we encrypt the message for
                 * @return {string} an encrypted string, that can be passed to the decrypt() method
                 */
                encrypt: function (object, user) {
                    /* Implement me, native side
                    return objc.call("crypto", "encrypt", {
                        text: text,
                        key: key
                    };
                    */
                    
                    return JSON.stringify(object);
                },
                
                /**
                 * Attempts to decrypt the message with the key stored on this device, if any.
                 * 
                 * @param {string} blob the encrypted data
                 * @return {object} the decrypted object, or undefined if we could not decrypt.
                 */
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