function Sprite(x, y, imageUri) {
    this.sprites = $('<div class="character"/>');
    var html = '<img class="sprite" src="' + imageUri + '" style="">';
    this.sprites.html(html);
    $(".main").append(this.sprites);

    this.vector= {x: {pos: x*Controller.prototype.TILE_WIDTH, speed: 0, acc: 0}, y: {pos: y*50, speed: 0, acc: 0}};

    this.instances.push(this);
}

Sprite.prototype.instances = [];

Sprite.prototype.extents = [[1]];

Sprite.prototype.update = function() {
    var left = this.vector.x.pos;
    var top = 718 - this.vector.y.pos - this.extents.length*50;
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
        'constructor': derived,
        'instances': []
    })
    return derived;
}

Sprite.prototype.remove = function() {
    if (this.sprites) {
        this.sprites.remove();
        this.sprites = null;
    }
    this.instances.splice(_.findIndex(this.instances, _.identity(this)), 1);
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