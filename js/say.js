define(['command'], function(Command){
	"strict";
	var Say = function() {};
	Say.prototype = Object.create(Command.prototype);
	return new Say();
});
