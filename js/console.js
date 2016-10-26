// current structure to use
define(['jquery', 'game', 'thing'], function($, Game, Thing) {
  "strict";
  var Console = function() {};
  var currentGame = Game.create();
  Console.prototype = {
    create: function() {
      var currentConsole = new Console();
      return currentConsole;
    },
    runGame: function() {
      currentGame.$scrollChat();
      $('.inp').keyup(function(evt) {
        if(evt.keyCode == 13) {
          var entry = $(this).val();
          currentGame.processInput(entry);
          currentGame.printOutput();
          $(this).val('');
          currentGame.$scrollChat();
        }
      })
      .focus();
    }
  };
  var currentConsole = new Console();
  return currentConsole;
});
