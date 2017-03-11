
var Evoli = inherit(Sprite, function(x, y, game, destination){
    this.base(x, y, "images/evoli.gif");
    this.game = game;
    this.destination = destination;
    this.update();
});

Evoli.prototype.hit = function(character) {
}

Evoli.prototype.extents = [[1,1],[1,1]];
