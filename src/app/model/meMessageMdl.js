/*globals angular */

(function () {
    "use strict";
    
    angular.module("mitme.model.message", ["mitme.services.auth"])
        .factory("buildMessage", function (assert) {
            var Message,
                MessageBuilder;
            
            Message = function () {
                this.sender = null;
                this.location = null;
                this.body = null;
                this.date = Date.now();
            };
            
            MessageBuilder = function () {
                this.message = new Message();
            };
            MessageBuilder.prototype = {
                fromUser: function (sender) {
                    assert.hasAttr(sender, "name");
                    assert.hasAttr(sender, "id");
                    
                    this.message.sender = sender;
                    return this;
                },
                withLocation: function (location) {
                    if (location !== undefined) {
                        assert.hasAttr(location, "longitude");
                        assert.hasAttr(location, "latitude");
                    }
                    
                    this.message.location = location;
                    return this;
                },
                withBody: function (body) {
                    assert.isString(body);
                    
                    this.message.body = body;
                    return this;
                },
                onDate: function (date) {
                    assert.isNumber(date);
                    
                    this.message.date = date;
                    return this;
                },
                finish: function () {
                    assert.notNull(this.message.sender, "A message must have a sender");
                    assert.notNull(this.message.body, "A message must have a body");
                    
                    return this.message;
                }
            };
            
            return function () {
                return new MessageBuilder();
            };
        });
}());