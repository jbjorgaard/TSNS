// abandoning abstract class concept for the moment.  Inheritance isn't working as planned.  Will address later.

define(['jquery'], function($) {
	"strict";

	var Command = function(game) {
		throw new Error("Cannot create an instance of an abstract class");
	};

	Command.prototype.process = function(){};
	Command.prototype.parse = function(str){};
	Command.prototype.output = function(thing){};
	Command.prototype.notifyBrain = function(brain){};
	Command.prototype.runCommand = function(thing){};
	Command.prototype.setItem = function(thing){};
	Command.prototype.description = "";

	Command.prototype.clone = function() {
		var clone = $extend(true, {}, this);
		return clone;
	};

	Command.prototype.copy = function(actor) {
		var copy = this.clone();

		copy.actor = actor;
		return copy;
	};

	Command.prototype.describe = function() {
		return this.description;
	};

	return Command;
});
