var Bullet = inherit(Sprite, function(x, y, hSpeed) {
    this.base(x, y, "images/bubble2.png");
    this.vector= {x: {pos: x, speed: hSpeed}, y: {pos: y, speed: 0}};
    this.limit = x + 2000;
    this.update();
});
