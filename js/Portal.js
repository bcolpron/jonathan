
var Portal = inherit(Sprite, function(x, y, game){
    this.base(x, y, "images/portal.png");
    this.game = game;
    this.update();
});

Portal.prototype.hit = function(character) {
    character.swirl();
    this.game.loadWorld("world1");
}

Portal.prototype.extents = [[1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1],
                            [1,1,1,1,1,1,1,1]];


// convenience alias for map design
var P = Portal;