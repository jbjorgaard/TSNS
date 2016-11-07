define(['command'], function(Command){
	"strict";

	var Say = function(game) {
		this.game = game;
	};

	// Say.prototype = Object.create(Command.prototype);

	Say.prototype = {

		create: function(game) {
			var say = new Say(game);
			return say;
		},

		// @@Override
		process: function() {
			return this;
		},

		// @@Override
		parse: function(commandStringArray) {
			commandStringArray[0] = "You say, ";
			this.spoke = '';
			for(var i = 0; i < commandStringArray.length; i++) {
				this.spoke += commandStringArray[i] + ' ';
			}
			return this;
		},

		// @@Override
		output: function() {
			this.game.addOutput(this.spoke);
		},

		// @@Override
		runCommand: function() {
			this.game.commandQueue.push(this);
		}
	};

	return new Say();
});
