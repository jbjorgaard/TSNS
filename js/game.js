define(['jquery', 'hashmap'], function($, Hashmap){
  "strict";
  var Game = function() {  };
  Game.prototype = {
    create: function() {
      var baseGame = new Game();
      return baseGame;
    },
    $container:  $('.container'),
    $scrollChat: function() {
      this.$container[0].scrollTop = this.$container[0].scrollHeight;
    },
    running: true,
    uComm: [],
    thingID: new Hashmap(),
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
    }
  };
  var currentGame = new Game();
  return currentGame;
});
