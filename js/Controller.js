function Controller(world, game) {
    this.map = world.map;
    this.timer = setInterval($.proxy(this.update, this), 40);
    this.gamePad = game.gamePad;
    this.bullets = [];
    this.detector = new CollisionDetector(this.map);

    this.character = new Character(0,1, "krabby");
    this.detector.add(this.character);

    this.ennemy = new Character(10, 1, "evoli", "gif");
    this.ennemy.lifeline = new LifeLine(this.ennemy);

    this.portals = [];

    var m = $(".main");
    m.css({'background-color': world.color});
    for (var y=0; y != this.map.length; ++y) {
        for (var x=0; x != this.map[y].length; ++x) {
            if (this.map[y][x] == 1) {
                m.append($('<div class="tile" style="top: ' + y*50 + 'px; left: ' + x*this.TILE_WIDTH + 'px"/>'));
            } else if (this.map[y][x] == P) {
                var portal = new Portal(x, 13-y, game);
                this.detector.add(portal);
                this.portals.push(portal);
            }
        }
    }
    world.init(game);
};

Controller.prototype.TILE_WIDTH = 50;

var updateComponent = function(c, a, maxSpeed) {
    var direction = Math.sign(a);
    var capFn = direction == 1 ? Math.min : Math.max;
    c.speed = capFn(c.speed + a/25, maxSpeed*direction);
    c.pos += c.speed / 25;
}

Controller.prototype.update = function() {
    var object = this.character;
    var x = object.vector.x;
    var y = object.vector.y;


    var maxSpeed = object.maxSpeed;
    if (this.gamePad.right()) x.acc = 1500;
    else if (this.gamePad.left()) x.acc = -1500;
    else if (x.speed != 0) { x.acc = -1500 * Math.sign(x.speed); maxSpeed = 0;}
    else x.acc = 0;
    if (this.gamePad.up() && this.detector.isGrounded(object)) y.speed = 1000;


    updateComponent(x, x.acc, maxSpeed);
    this.detector.mapHorizontalCollisions(object);

    updateComponent(y, -2500, 750);
    this.detector.mapVerticalCollisions(object);


    object.update();


    this.detector.objectsCollisions(object);

    var scrollX = Math.min(0, -object.vector.x.pos + $(".viewport").width()/2);
    var scrollY = -200;//Math.max(-200, Math.min(0, object.vector.y.pos -200-250));
    $(".main").css({left: scrollX, top: scrollY});


    if (this.gamePad.fire()) {
        this.bullets.push(new Bullet(this.character.vector.x.pos+50, this.character.vector.y.pos - 35, 1000));
    }

    for (var i = this.bullets.length; i-- > 0; ) {
        updateComponent(this.bullets[i].vector.x, 0, 1000);
        if (this.bullets[i].vector.x.pos > this.bullets[i].limit) {
            this.bullets[i].remove();
            this.bullets.splice(i, 1);
        } else {
            this.bullets[i].update();
        }
    };
}

Controller.prototype.pause = function() {
    clearInterval(this.timer);
}

Controller.prototype.close = function() {
    $(".main").empty();
    _.each(this.portals, function(portal) {
        portal.remove();
    });
    this.character.remove();
    this.ennemy.remove();
}
