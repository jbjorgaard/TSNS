//pulling in dependencies
define(['jquery', 'thing', 'say'], function($, Thing, Say){
  "strict";
  //empty game constructor
  var Game = function() {  };
  //setting some properties for game class
  Game.prototype = {
	//game creation function, same as var game = new Game();
    create: function() {
      var game = new Game();
      game.initializeGame();
      return game;
    },
    $container:  $('.container'),
    $scrollChat: function() {
      this.$container[0].scrollTop = this.$container[0].scrollHeight;
    },
    running: true,
    uComm: [],
    commandMap: new HashMap(),
    thingMap: new HashMap(),
    addThing: function(thing) {
      this.thingMap.put(thing.id.toString(), thing);
    },
    getThing: function(id) {
      return this.thingMap.get(id);
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
      var playerCommand = [];
      var command;
      playerCommand = str.split(" ");
      if(playerCommand[0].charAt(0) == '/') {
        command = playerCommand[0].substr(1);
        if(this.commandMap.get(command)) {
          command = this.commandMap.get(command);
          command.parse(playerCommand).output();
          // command = command.parse(playerCommand);
          // command.output();
        } else {
          this.addOutput('command does not exist');
        }
      } else {
        this.addOutput(str);
      }
      // this.addOutput(str);
    },
    initializeGame: function() {
      var say = Say.create(this);
      this.commandMap.put("say", say);
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
    	  var r = gameFile.rooms[i];
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
