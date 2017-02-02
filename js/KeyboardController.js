function KeyboardController() {
    var that = this;
    document.onkeyup = function(e) {
        that.onkeyup(e);
    };
    document.onkeydown = function(e) {
        that.onkeydown(e);
    };
};

KeyboardController.prototype.UP    = 1;
KeyboardController.prototype.DOWN  = 2;
KeyboardController.prototype.LEFT  = 4;
KeyboardController.prototype.RIGHT = 8;

KeyboardController.prototype.onkeyup = function(e) {
    switch (e.keyCode) {
        case 37:
            this.mask &= 11; 
            break;
        case 38:
            this.mask &= 14; 
            break;
        case 39:
            this.mask &= 7; 
            break;
        case 40:
            this.mask &= 13; 
            break;
    }
};

KeyboardController.prototype.up = function() { return this.mask & this.UP; }
KeyboardController.prototype.down = function() { return this.mask & this.DOWN; }
KeyboardController.prototype.left = function() { return this.mask & this.LEFT; }
KeyboardController.prototype.right = function() { return this.mask & this.RIGHT; }
    
KeyboardController.prototype.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            this.mask |= this.LEFT;
            break;
        case 38:
            this.mask |= this.UP;
            break;
        case 39:
            this.mask |= this.RIGHT;
            break;
        case 40:
            this.mask |= this.DOWN;
            break;
        case 32:
            break;
    }
};
