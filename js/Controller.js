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

Controller.prototype.update = function() {
    var x = this.character.vector.x;
    var y = this.character.vector.y;
    
    if (this.gamePad.right()) updateComponent(x, 1500, 500);
    else if (this.gamePad.left()) updateComponent(x, -1500, -500);
    else if (x.speed != 0) updateComponent(x, -1500 * Math.sign(x.speed), 0);

    if (x.pos > this.hLimit) {
        x.pos = this.hLimit;
        x.speed = 0;
    } else if (x.pos < 0) {
        x.pos = 0;
        x.speed = 0;
    }
    
    if (this.gamePad.up() && y.speed == 0) y.speed = 750;
    if (y.speed != 0) {
        updateComponent(y, -1500 * Math.sign(y.speed), -750);
        if (y.pos < 0) {
            y.pos = 0;
            y.speed = 0;
        }
    }
    
    this.character.update();
}

