
var Portal = inherit(Sprite, function(x, y, game, destination){
    this.base(x, y, "images/portal.png");
    this.game = game;
    this.destination = destination;
    this.update();
    portals.push(this);
});

Portal.prototype.hit = function(character) {
    character.swirl();
    this.game.loadWorld(this.destination);
}

Portal.prototype.extents = [[1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1]];

Portal.prototype.remove = function() {
    portals.splice(_.findIndex(portals, _.identity(this)), 1);
}

// convenience alias for map design
var P = Portal;

var portals = [];