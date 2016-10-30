define(['jquery', 'yaml', 'game'], function($, yaml, Game) {
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
      
      var fileInput = document.getElementById('fileInput');
	  var fileDisplayArea = document.getElementById('fileDisplayArea');
	
	  fileInput.addEventListener('change', function(e) {
	    var file = fileInput.files[0];
	    var textType = /text.*/;
	    var reader = new FileReader();
		
	    reader.onload = function(e) {
		  var doc = yaml.safeLoad(reader.result, 'utf8');
			console.log(doc);
			console.log(doc.game.gameID);
			if(doc.hasOwnProperty("game")){
				console.log("game");
			}
		};
			
		reader.readAsText(file);
	
	  });
    }
  };
  var currentGame = Game.create();
  return new Console();
});
