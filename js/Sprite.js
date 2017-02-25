function Sprite(x, y, imageUri) {
    this.sprites = $('<div class="character"/>');
    var html = '<img class="sprite" src="' + imageUri + '" style="">';
    this.sprites.html(html);
    $(".main").append(this.sprites);

    this.vector= {x: {pos: x*Controller.prototype.TILE_WIDTH, speed: 0, acc: 0}, y: {pos: y*50, speed: 0, acc: 0}};
    this.grounded = false;
}

Sprite.prototype.extents = [[1]];

Sprite.prototype.update = function() {
    var left = this.vector.x.pos;
    var top = 568 - this.vector.y.pos;
    this.sprites.each(function(i,e){
        e.style.left = left;
        e.style.top = top;
    });
};

function inherit(base, ctor){
    var derived = function() {
        var that = this;
        this.base = function() {
            base.apply(that, arguments);
        }
        ctor.apply(this, arguments);
    };
    derived.prototype = _.create(base.prototype, {
        'constructor': derived
    })
    return derived;
}

Sprite.prototype.swirl = function() {
    var i = 0;
    var timer = setInterval($.proxy(function() {
        if (i++ < 25) {
            var scale = 2-Math.pow(1-2*i/25,2);
            this.sprites.css({transform: "rotate("+360*i/25+"deg) scale(" + scale + "," + scale + ")"});
        } else {
            this.sprites.css({transform: ""});
            clearInterval(timer);
        }
    }, this), 40);
}