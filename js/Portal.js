
var Portal = inherit(Sprite, function(x, y, game, destination){
    this.base(x, y, "images/portal.png");
    this.game = game;
    this.destination = destination;
    this.update();
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

