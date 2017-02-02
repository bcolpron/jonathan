function Bullet(x, y, direction, target) {
    this.sprites = $('<div class="bullet"/>');
    $("body").append(this.sprites);

    this.setClass("waterblast");
    this.setPosition(x,y);
    this.setDirection(direction);
    this.target = target;

    this.distance = 20;
    this.timer = setInterval($.proxy(this.travel, this), 250);
    this.travel();
}

Bullet.prototype.setClass = function(class_) {
    this.class_ = class_;
    var html = '<img class="sprite" src="images/' + this.class_ + '-left.png" style="">\
        <img class="sprite" src="images/' + this.class_ + '-right.png" style="display: none">';
    this.sprites.html(html);
}

Bullet.prototype.LEFT  = 0;
Bullet.prototype.RIGHT = 1;

Bullet.prototype.setPosition = function(x,y) {
    if  (typeof x === "object") {
        y = x.y;
        x = x.x;
    }

    this.position = {x:x, y:y};
    
    var left = this.position.x * 96;
    var top = this.position.y * 96;

    this.sprites.each(function(i,e){
        e.style.left = left;
        e.style.top = top;
    });

};

Bullet.prototype.setDirection = function(direction) {
    this.direction = direction;
    this.sprites.find(".sprite").hide().eq(direction).show();
}

Bullet.prototype.travel = function() {
    if (this.target.hits(this.position)) {
        this.remove();
    }

    offset = this.direction * 2 - 1;
    this.setPosition(this.position.x + offset, this.position.y);
    if (--this.distance == 0) {
        this.remove();
    }
}

Bullet.prototype.remove = function() {
    clearInterval(this.timer);
    this.sprites.remove();
    this.sprites = null;
}
