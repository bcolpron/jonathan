function Bullet(x, y, hSpeed) {
    this.sprites = $('<div class="bullet"/>');
    var html = '<img class="sprite" src="images/bubble2.png" style="">';
    this.sprites.html(html);
    $(".main").append(this.sprites);

    this.vector= {x: {pos: x, speed: hSpeed}, y: {pos: y, speed: 0}};

    this.limit = x + 2000;
    this.update();
}

Bullet.prototype.update = function() {
    var left = this.vector.x.pos;
    var top = 568 - this.vector.y.pos;
    this.sprites.each(function(i,e){
        e.style.left = left;
        e.style.top = top;
    });
};

Bullet.prototype.remove = function() {
    this.sprites.remove();
    this.sprites = null;
}
