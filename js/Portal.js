
var Portal = inherit(Sprite, function(x, y){
    this.base(x, y, "images/portal.png");
    this.update();
});

Portal.prototype.extents = [[1,1,1],
                            [1,1,1]];
