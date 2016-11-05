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
          if($(this).val() !== '') {
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

      if(hasStorage()) {
        var hasGameStored = function() {
      	  if(localStorage.hasOwnProperty("tsns")) {
      		  return true;
      	  } else {
      		  return false;
      	  }
        };

        var displayGames = function() {
      	  if(hasGameStored()) {
  			    gameFile = JSON.parse(localStorage.tsns).tsns.games;
  			    var buildList = function() {
  				    return $('#gameLoadArea').html('<h4>Current Games</h4><ul id="gameLinks" style="list-style:none"></ul>').promise().done(function() {
  					    for(var i = 0; i < gameFile.length; i++) {
  						    $('#gameLoadArea ul').append('<li><button>' + gameFile[i].name + '</button></li>');
  					    }
                $('#gameLoadArea').append('<div><button>Delete Local Games</button></div>');
  				    });
  			    };
  			    $.when(buildList()).done(function() {
  				    $('#gameLoadArea').on('click', 'li', function(){
  					    currentGame = Game.create();
  					    currentGame.loadGame(gameFile[$(this).index()]);
  					    console.log("game loaded: " + currentGame.name);
  				    });
              $('#gameLoadArea').on('click', 'div', function(){
                delete localStorage.tsns;
                window.location.reload(false);
              });
  			    });
          } else {
              $('#gameLoadArea').html('You have no local games, load one below');
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
    				localStorage.tsns = JSON.stringify(doc);
    				console.log("Game file has been saved to localStorage");
            window.location.reload(false);
    			}
    		};

    		reader.readAsText(file);

    	  });

    	  window.onload = displayGames();
      }
    }
  };
  var currentGame = Game.create();
  return new Console();
});
