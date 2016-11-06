define(function() {
	"strict";
	var Command = function() {
		throw new Error("Cannot create an instance of an abstract class");
	};
	
	return Command;
});
