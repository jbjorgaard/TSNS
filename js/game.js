define(['jquery', 'thing'], function($, Thing){
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
    thingId: new HashMap(),
    addThing: function(thing) {
      this.thingId.put(thing.id.toString(), thing);
    },
    getThing: function(id) {
      return this.thingId.get(id);
    },
    currentId: 0,
    nextId: function() {return this.currentId++;},
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
    	
    },
    createWorld: function() {
    	var world = Thing.create();
    	world.game = this;
    	world.setName("Nightmare Network");
    	world.setId();
    	return world;
    },
    loadGame: function(gameFile) {
      this.world = this.createWorld();
      console.log("Creating world");
      this.name = gameFile.name;
      console.log("Game title: " + this.name);
      for(var i = 0; i < gameFile.rooms.length; i++) {
    	  var r = gameFile.rooms[i]
    	  var room = Thing.create();
    	  console.log("New room created");
    	  room.setInfo(this, this.world, r.description, r.shortDescription, r.name, "room");
    	  console.log("Room id: " + room.id + " Room name: " + room.name);
    	  this.addThing(room);
    	  console.log("Room loaded into current world: " + this.world.name);
      }
    }
  };
  return new Game();
});
