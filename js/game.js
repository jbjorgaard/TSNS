define(['jquery'], function($){
  "strict";
  var Game = function() {  };
  Game.prototype = {
    create: function() {
      var game = new Game();
      return game;
    },
    $container:  $('.container'),
    $scrollChat: function() {
      this.$container[0].scrollTop = this.$container[0].scrollHeight;
    },
    running: true,
    uComm: [],
    thingID: new HashMap(),
    getThing: function(id) {
      return this.thingID.get(id);
    },
    currentID: 0,
    nextID: function() {return this.currentID++;},
    printOutput: function() {
      for(var x in this.uComm) {
        this.$container.append('<p>' + this.uComm[x] + '</p>');
      }
      this.uComm = [];
    },
    addOutput: function(str) {
      this.uComm.push(str);
    },
    processInput: function(str) {
      this.addOutput(str);
    },
    initializeGame: function() {
    	
    }
  };
  return new Game();
});
