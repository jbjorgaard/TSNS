requirejs.config({
  paths: {
    jquery: 'lib/jquery-3.1.1.min'
  }
});
requirejs(['console'], function(Console) {
  Console.runGame();
});
