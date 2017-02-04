function Controller(character, world, gamePad) {
    this.character = character;
    this.map = world.map;
    this.timer = setInterval($.proxy(this.update, this), 40);
    this.gamePad = gamePad;
    this.hLimit = 1000;
};


var updateComponent = function(c, a, maxSpeed) {
    var capFn = Math.sign(a) == 1 ? Math.min : Math.max;
    c.speed = capFn(c.speed + a/25, maxSpeed);
    c.pos += c.speed / 25;
}

map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
];

Controller.prototype.update = function() {
    var character = this.character;
    var x = character.vector.x;
    var y = character.vector.y;
    
    if (this.gamePad.right()) updateComponent(x, 1500, 500);
    else if (this.gamePad.left()) updateComponent(x, -1500, -500);
    else if (x.speed != 0) updateComponent(x, -1500 * Math.sign(x.speed), 0);

    if (x.pos > this.hLimit) {
        x.pos = this.hLimit;
        x.speed = 0;
    } else if (x.pos < 0) {
        x.pos = 0;
        x.speed = 0;
    } else {
        h = 12 - Math.floor(y.pos / 25);

        if (Math.sign(x.speed) == 1 && map[h][Math.floor(x.pos / 25 + 4)] == 1) {
            x.pos = Math.floor(x.pos / 25) * 25;
            x.speed = 0;
        }
        if (Math.sign(x.speed) == -1 && map[h][Math.floor(x.pos / 25)] == 1) {
            x.pos = Math.floor(x.pos / 25 + 1) * 25;
            x.speed = 0;
        }
    }

    if (this.gamePad.up() && y.speed == 0) y.speed = 1000;
    updateComponent(y, -2500, -750);
        
        if (Math.sign(y.speed) == -1 && map[12 - Math.floor(y.pos / 50)][Math.floor(x.pos / 25)] == 1) {
        y.pos = Math.floor(y.pos / 50 + 1) * 50;
        y.speed = 0;
    }

    this.character.update();
}

