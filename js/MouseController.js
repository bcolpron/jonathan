function MouseController($elem) {
    $elem.mousedown($.proxy(this.mousedown, this));
    $elem.mouseup($.proxy(this.mouseup, this));
    this.mask = 0;
};

MouseController.prototype.FIRE = 16;

MouseController.prototype.mousedown = function() {
    console.log("ok");
    this.mask |= this.FIRE;
}

MouseController.prototype.mouseup = function() {
    console.log("ko");
    this.mask &= (~16>>>0); 
};

MouseController.prototype.fire = function() { return this.mask & this.FIRE; }
    