//create requirejs path names for 3rd party dependencies
requirejs.config({
  paths: {
    jquery: 'lib/jquery-3.1.1.min',
    yaml: 'lib/js-yaml.min'
  }
});
//require console dependency
requirejs(['console'], function(Console) {
  //set currentConsole to Console imported from module
  var currentConsole = Console;
  //start running the game console
  currentConsole.runGame();
  	
});
