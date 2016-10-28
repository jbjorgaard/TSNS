define(['jquery', 'game'], function($, Game) {
  "strict";
  var Console = function() {};
  Console.prototype = {
    create: function() {
      var console = new Console();
      return console;
    },
    runGame: function() {
      currentGame.$scrollChat();
      $('.inp').keyup(function(evt) {
        if(evt.keyCode == 13) {
          if($(this).val() != '') {
	    	  var entry = $(this).val();
	          currentGame.processInput(entry);
	          currentGame.printOutput();
	          $(this).val('');
	          currentGame.$scrollChat();
          }
          
        }
      })
      .focus();
    }
  };
  var currentGame = Game.create();
  return new Console();
});
