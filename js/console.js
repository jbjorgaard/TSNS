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
    		  console.log(localStorage.tsns);
    		  console.log(localStorage.tsns[0]);
    		  // returns first character of tsns string
    		  return true;
    	  } else {
    		  return false;
    	  }
      };
      
      
      hasGameStored();
      
      var fileInput = document.getElementById('fileInput');
	  var fileDisplayArea = document.getElementById('fileDisplayArea');
	
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
					localStorage.tsns = doc;
					console.log("Game file has been saved to localStorage");
				}
			}
		};
			
		reader.readAsText(file);
	
	  });
    }
  };
  var currentGame = Game.create();
  return new Console();
});
