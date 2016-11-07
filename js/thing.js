define(function(){
  "strict";
  var Thing = function(){
    this.contents = new HashMap();
    this.links = new HashMap();
  };
  Thing.prototype = {
    create: function() {
      var thing = new Thing();
      return thing;
    },
    setInfo: function(currentGame, loc, desc, shortDesc, name, type) {
      this.game = currentGame;
      this.setId();
      this.location = loc.getId();
      loc.addContent(this.id);
      this.description = desc;
      this.shortDescription = shortDesc;
      this.name = name;
      this.type = type;
    },
    setGame: function(game) {
      this.game = game;
    },
    getGame: function() {
      return this.game;
    },
    setId: function() {
      this.id = this.game.nextId();
    },
    getId: function() {
      return this.id;
    },
    setLocation: function(loc) {
      this.location = loc.getId();
    },
    getLocation: function() {
      return this.game.getThing(this.location);
    },
    setDescription: function(desc) {
      this.description = desc;
    },
    getDescription: function() {
      return this.description;
    },
    setShortDesc: function(desc) {
      this.shortDescription = desc;
    },
    getShortDesc: function() {
      return this.shortDescription;
    },
    setName: function(name) {
      this.name = name;
    },
    getName: function() {
      return this.name;
    },
    setType: function(type) {
      this.type = type;
    },
    getType: function() {
      return this.type;
    },
    setContents: function(contents) {
      this.contents = contents;
    },
    getContents: function() {
      return contents;
    },
    addContent: function(id) {
      this.contents.put(id.toString(), id);
    },
    removeContent: function(id) {
      this.contents.remove(id.toString());
    },
    setLinks: function(links) {
      this.links = links;
    },
    getLinks: function() {
      return this.links;
    },
    addLink: function(id, loc) {
      this.getLinks().put(id.toString(), loc);
    },
    removeLink: function(id) {
      this.getLinks().remove(id);
    }
  };
  return new Thing();
});
