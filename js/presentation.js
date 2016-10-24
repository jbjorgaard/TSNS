(function(root) {
  "strict";
  var Game = function() {};
  Game.prototype = {
    currentID: 0,
    running: true,
    uComm: [],
    nextID: function() { return this.currentID++; },
    printOutput: function() {
      for(var x in this.uComm) {
        MUD.Console.$container.append('<p>' + this.uComm[x] + '<p>');
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

  root.Game = Game;
})(window.MUD);
