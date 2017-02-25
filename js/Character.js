var Character = inherit(Sprite, function(x, y, class_, ext) {
    this.base(x,y, "images/krabby.png");
    this.maxSpeed = 500;
    this.jumpAcceleration = 1500;
    this.update(x,y);
});

Character.prototype.extents = [[1,1], [1,1]]

Character.prototype.setClass = function(class_) {
    this.class_ = class_;
    var html = '<img class="sprite" src="images/' + this.class_ + '.' + this.ext + '" style="">\
        <img class="sprite" src="images/' + this.class_ + '-up.' + this.ext + '" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-left.' + this.ext + '" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-right.' + this.ext + '" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-ani.' + this.ext + '" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-aniup.' + this.ext + '" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-anileft.' + this.ext + '" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-aniright.' + this.ext + '" style="display: none">';
    this.sprites.html(html);
}

Character.prototype.DOWN  = 0;
Character.prototype.UP    = 1;
Character.prototype.LEFT  = 2;
Character.prototype.RIGHT = 3;
Character.prototype.ANIM  = 4;

Character.prototype.setDirection = function(direction) {
    this.direction = direction;
    this.sprites.find(".sprite").hide().eq(direction).show();
}

Character.prototype.moveLeft = function() {
    this.setDirection(this.LEFT | this.ANIM);
};

Character.prototype.moveUp = function() {
    this.setDirection(this.direction | this.ANIM);
};

Character.prototype.moveRight = function() {
    this.setDirection(this.RIGHT | this.ANIM);
};

Character.prototype.moveDown = function() {
    this.setDirection(this.direction | this.ANIM);
};

Character.prototype.setMoving = function() {
    this.setDirection(this.direction | this.ANIM);
};

Character.prototype.stopMoving = function() {
    this.setDirection(this.direction & 0x3);
};

Character.prototype.remove = function() {
    this.sprites.remove();
    this.sprites = null;
}
