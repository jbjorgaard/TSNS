/* The console module controls the user interface for the mud, displaying input/output
 * along with loading, deleting, and saving game files
 */

//Importing dependency modules
define(['jquery', 'yaml', 'game'], function($, yaml, Game) {
  "strict";

  //empty console constructor
  var Console = function() {};

  //adding properties to the console class
  Console.prototype = {

	//create new console object function, this is so consoles can create new consoles
	//this isn't really necessary but I'm following my design from other classes
    create: function() {
      var console = new Console();
      return console;
    },
    
    //runGame detects user input and click events with several methods
    runGame: function() {
      //keeps chatroom scrolling and detects new user entries by detecting when ENTER is used
      //Sends user entries to be processed by the game
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

      //empty variable to store game selected from localStorage later
      var gameFile;

      //grabbing the upload form from the page
      var fileInput = document.getElementById('fileInput');
      //grabbing the saved games display area from the page
	  var fileDisplayArea = document.getElementById('fileDisplayArea');

	  //takes in a gameFile object (localStorage), creates a new game object
	  //loads the properties from gameFile object into the new game and sets to currentGame
	  var setCurrentGame = function(game) {
		  currentGame = Game.create();
		  currentGame.loadGame(game);
		  console.log("game loaded: " + currentGame.name);
	  };

	  //verifies that the browser supports localStorage
      var hasStorage = function() {
    	  if(typeof(Storage) !== "undefined") {
    		  console.log("Browser supports localStorage");
    		  return true;
    	  } else {
    		  console.log("Browser does not support localStorage");
    		  return false;
    	  }
      };

      //checks to see if localStorage already has a game file
      var hasGameStored = function() {
      	  if(localStorage.hasOwnProperty("tsns")) {
      		  return true;
      	  } else {
      		  return false;
      	  }
      };

      //builds the list of games in localStorage and outputs them to browser
      var buildList = function() {
		    return $('#gameLoadArea').html('<h4>Current Games</h4><ul id="gameLinks" style="list-style:none"></ul>').promise().done(function() {
			    for(var i = 0; i < gameFile.length; i++) {
				    $('#gameLoadArea ul').append('<li><button>' + gameFile[i].name + '</button></li>');
			    }
			$('#gameLoadArea').append('<ul style="list-style:none"><li><button id="erase-btn">Delete Local Games</button></li></ul>');
		    });
	  };

      //displays list of games in local storage
      var displayGames = function() {
      	  if(hasGameStored()) {
  		  	//parses gameFile from localStorage
		    gameFile = JSON.parse(localStorage.tsns).tsns.games;
		    //when list is done being built, apply click listeners to each list item to load selected game
		    $.when(buildList()).done(function() {
			  $('#gameLoadArea').on('click', 'li', function(){
			    setCurrentGame(gameFile[$(this).index()]);
			  });
			  //apply click listener to delete local games --> removes game file object from localStorage
              $('#erase-btn').on('click', function(){
                delete localStorage.tsns;
                window.location.reload(false);
              });
		    });
          } else {
        	//if local storage has no game file, notify user
            $('#gameLoadArea').html('You have no local games, load one below');
          }
       };

      //if the browser supports local storage, load the file loading system and display to user
      if(hasStorage()) {
    	  //adding event listener to file upload on page and creating a file reader
    	  fileInput.addEventListener('change', function(e) {
    	    var file = fileInput.files[0];
    	    var textType = /text.*/;
    	    var reader = new FileReader();

    	    //once the file is uploaded, read the yaml file, parse to JSON, and store in doc variable
    	    reader.onload = function(e) {
    		  var doc = yaml.safeLoad(reader.result, 'utf8');
    			console.log(doc);
    			//verify that the yaml file is a game file
    			if(doc.hasOwnProperty("tsns")){
    				console.log("tsns");
    				//convert JSON object to string and store in localStorage
    				localStorage.tsns = JSON.stringify(doc);
    				console.log("Game file has been saved to localStorage");
    		//reload the browser window to update the list of games in localStorage
            window.location.reload(false);
    			}
    		};
    		reader.readAsText(file);
    	  });
    	  window.onload = displayGames();
      }
    }
  };
  //initializing empty game to currentGame variable so chat window works even when a game isn't loaded.
  var currentGame = Game.create();
  //this is a console module, so it needs to return a console object to be used by main.js
  return new Console();
});
