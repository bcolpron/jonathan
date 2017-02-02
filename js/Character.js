function Character(x, y, class_) {
    this.sprites = $('<div class="character"/>');
    $("body").append(this.sprites);

    this.setClass(class_);
    this.setPosition(x,y);
    this.setDirection(0);
}

Character.prototype.setClass = function(class_) {
    this.class_ = class_;
    var html = '<img class="sprite" src="images/' + this.class_ + '.png" style="">\
        <img class="sprite" src="images/' + this.class_ + '-up.png" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-left.png" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-right.png" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-ani.png" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-aniup.png" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-anileft.png" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-aniright.png" style="display: none">';
    this.sprites.html(html);
}

Character.prototype.DOWN  = 0;
Character.prototype.UP    = 1;
Character.prototype.LEFT  = 2;
Character.prototype.RIGHT = 3;
Character.prototype.ANIM  = 4;

Character.prototype.getPosition = function() {
    return {x: this.position.x, y: this.position.y};
}

Character.prototype.setPosition = function(x,y) {
    if  (typeof x === "object") {
        y = x.y;
        x = x.x;
    }

    this.position = {x:x, y:y};
    
    var left = this.position.x;
    var top = 318 - this.position.y;

    this.sprites.each(function(i,e){
        e.style.left = left;
        e.style.top = top;
    });

};

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

Character.prototype.hits = function(p) {
    if (p.x >= this.position.x && p.x < this.position.x + 5
        && p.y >= this.position.y && p.y < this.position.y + 4)
    {
        if (p.y == this.position.y && p.x < this.position.x + 2) {
            return false
        }
        return true;
    }
    return false;
}
