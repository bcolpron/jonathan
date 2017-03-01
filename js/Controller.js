function Controller(world, game) {
    this.map = world.map;
    this.timer = setInterval($.proxy(this.update, this), 40);
    this.gamePad = game.gamePad;
    this.bullets = [];
    this.detector = new CollisionDetector();

    this.character = new Character(0,0, "krabby");
    this.detector.add(this.character);

    this.ennemy = new Character(10, 0, "evoli", "gif");
    this.ennemy.lifeline = new LifeLine(this.ennemy);

    this.portals = [];

    var m = $(".main");
    for (var y=0; y != this.map.length; ++y) {
        for (var x=0; x != this.map[y].length; ++x) {
            if (this.map[y][x] == 1) {
                m.append($('<div class="tile" style="top: ' + y*50 + 'px; left: ' + x*this.TILE_WIDTH + 'px"/>'));
            } else if (this.map[y][x] == P) {
                var portal = new Portal(x, 13-y, game, "world1");
                this.detector.add(portal);
                this.portals.push(portal);
            }
        }
    }
};

Controller.prototype.TILE_WIDTH = 50;


var updateComponent = function(c, a, maxSpeed) {
    var direction = Math.sign(a);
    var capFn = direction == 1 ? Math.min : Math.max;
    c.speed = capFn(c.speed + a/25, maxSpeed*direction);
    c.pos += c.speed / 25;
}

Controller.prototype.downwardVerticalCollision = function(x,y) {
    var logicalX = Math.floor(x.pos / this.TILE_WIDTH);
    var logicalX2 = Math.ceil(x.pos / this.TILE_WIDTH);
    var logicalY = 12 - Math.floor(y.pos / 50);
    
    if (this.map[logicalY][logicalX] == 1
        || this.map[logicalY][logicalX2] == 1
        || this.map[logicalY][logicalX2+1] == 1) {
        return true;
    }
    return false;
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
    if (this.gamePad.up() && object.grounded) y.speed = 1000;


    updateComponent(x, x.acc, maxSpeed);

    if (x.pos >= this.map[0].length*this.TILE_WIDTH-100) {
        x.pos = this.map[0].length*this.TILE_WIDTH-100;
        x.speed = 0;
    } else if (x.pos < 0) {
        x.pos = 0;
        x.speed = 0;
    } else if (y.pos > 13*50) {
        y.pos = 13*50;
        y.speed = 0;
    } else {
        h = 12 - Math.floor(y.pos / 50);

        if (Math.sign(x.speed) == 1 && this.map[h][Math.floor(x.pos / this.TILE_WIDTH + 2)] == 1) {
            x.pos = Math.floor(x.pos / this.TILE_WIDTH) * this.TILE_WIDTH;
            x.speed = 0;
        }
        if (Math.sign(x.speed) == -1 && this.map[h][Math.floor(x.pos / this.TILE_WIDTH)] == 1) {
            x.pos = Math.floor(x.pos / this.TILE_WIDTH + 1) * this.TILE_WIDTH;
            x.speed = 0;
        }
    }

    updateComponent(y, -2500, 750);
    object.grounded = false;
    if (Math.sign(y.speed) == -1 && this.downwardVerticalCollision(x,y)) {
        y.pos = Math.floor(y.pos / 50 + 1) * 50;
        y.speed = 0;
        object.grounded = true;
    }

    object.update();





    var hit = this.detector.collisions(object);
    if (hit)
    {
        hit.hit(object);

    }

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
    this.portals = [];
}
