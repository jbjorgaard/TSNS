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
      
      var gameFile;
      var fileInput = document.getElementById('fileInput');
	  var fileDisplayArea = document.getElementById('fileDisplayArea');
	  
	  var setCurrentGame = function(game) {
		  currentGame = Game.create();
		  currentGame.loadGame(game);
		  console.log(currentGame.name);
	  };
      
      var hasStorage = function() {
    	  if(typeof(Storage) !== "undefined") {
    		  console.log("Browser supports localStorage");
    		  return true;
    	  } else {
    		  console.log("Browser does not support localStorage");
    		  return false;
    	  }
      };
      
      var hasGameStored = function() {
    	  if(hasStorage() || localStorage.hasOwnProperty("tsns")) {
    		  return true;
    	  } else {
    		  return false;
    	  }
      };
      
      var displayGames = function() {
    	  if(hasGameStored()) {    		 
			gameFile = JSON.parse(localStorage.tsns).tsns["games"];
			var buildList = function() {
				return $('#gameLoadArea').html('<ul id="gameLinks"></ul>').promise().done(function() {
					for(var i = 0; i < gameFile.length; i++) {
						$('#gameLoadArea ul').append('<li>' + gameFile[i].name + '</li>');
					}
				});
			};
			$.when(buildList()).done(function() {
				$('#gameLoadArea').on('click', 'li', function(){
					currentGame = Game.create();
					currentGame.loadGame(gameFile[$(this).index()]);
					console.log("game loaded: " + currentGame.name);
				});
			});
			
			
		  } else {
			  gameLoad = "You have no TSNS save file in local storage, please use the upload below to begin.";
		  }
      };
	
	  fileInput.addEventListener('change', function(e) {
	    var file = fileInput.files[0];
	    var textType = /text.*/;
	    var reader = new FileReader();
		
	    reader.onload = function(e) {
		  var doc = yaml.safeLoad(reader.result, 'utf8');
			console.log(doc);
			if(doc.hasOwnProperty("tsns")){
				console.log("tsns");
				if(hasStorage()) {
					localStorage.tsns = JSON.stringify(doc);
					console.log("Game file has been saved to localStorage");
					displayGames();
				}
			}
		};
			
		reader.readAsText(file);
	
	  });
	  
	  displayGames();
    }
  };
  var currentGame = Game.create();
  return new Console();
});
