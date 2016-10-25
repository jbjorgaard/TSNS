define(['jquery'], function($){
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
    currentID: 0,
    running: true,
    uComm: [],
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