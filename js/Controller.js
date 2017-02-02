function Controller(character, world, gamePad) {
    this.character = character;
    this.map = world.map;
    this.timer = setInterval($.proxy(this.update, this), 40);
    this.gamePad = gamePad;
    this.hSpeed = 0;
    this.vSpeed = 0;
    this.hLimit = 1000;
};


var updateComponent = function(c, a, maxSpeed) {
    var capFn = Math.sign(a) == 1 ? Math.min : Math.max;
    c.speed = capFn(c.speed + a/25, maxSpeed);
    c.pos += c.speed / 25;
    return c;
}

Controller.prototype.update = function() {

    var p = this.character.getPosition();
    
    c = {pos: p.x, speed: this.hSpeed};
    if (this.gamePad.right()) c = updateComponent(c, 1500, 500);
    else if (this.gamePad.left()) c = updateComponent(c, -1500, -500);
    else if (this.hSpeed != 0)  c = updateComponent(c, -1500 * Math.sign(this.hSpeed), 0);

    if (c.pos > this.hLimit) {
        c.pos = this.hLimit;
        c.speed = 0;
    } else if (c.pos < 0) {
        c.pos = 0;
        c.speed = 0;
    }
    
    p.x = c.pos;
    this.hSpeed = c.speed;

    if (this.gamePad.up() && this.vSpeed == 0) this.vSpeed = 750;
    if (this.vSpeed != 0) {
        c = {pos: p.y, speed: this.vSpeed};
        c = updateComponent(c, -1500 * Math.sign(this.vSpeed), -750);
        if (c.pos < 0) {
            c.pos = 0;
            c.speed = 0;
        }
        p.y = c.pos;
        this.vSpeed = c.speed;
    }
    
    this.character.setPosition(p);
}

