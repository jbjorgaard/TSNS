requirejs.config({
  paths: {
    jquery: 'lib/jquery-3.1.1.min',
    hashmap: 'lib/hashmap'
  }
});
requirejs(['console'], function(Console) {
  var currentConsole = Console.create();
  currentConsole.runGame();
});
