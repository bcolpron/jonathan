function KeyboardController() {
    var that = this;
    document.onkeyup = function(e) {
        that.onkeyup(e);
    };
    document.onkeydown = function(e) {
        that.onkeydown(e);
    };
    this.mask = 0;
};

KeyboardController.prototype.UP    = 1;
KeyboardController.prototype.DOWN  = 2;
KeyboardController.prototype.LEFT  = 4;
KeyboardController.prototype.RIGHT = 8;
KeyboardController.prototype.FIRE = 16;

KeyboardController.prototype.onkeyup = function(e) {
    switch (e.keyCode) {
        case 37:
            this.mask &= (~4>>>0); 
            break;
        case 38:
            this.mask &= (~1>>>0); 
            break;
        case 39:
            this.mask &= (~8>>>0); 
            break;
        case 40:
            this.mask &= (~2>>>0); 
            break;
    }
    if (!e.ctrlKey) {
        this.mask &= (~16>>>0); 
    }
};

KeyboardController.prototype.up = function() { return this.mask & this.UP; }
KeyboardController.prototype.down = function() { return this.mask & this.DOWN; }
KeyboardController.prototype.left = function() { return this.mask & this.LEFT; }
KeyboardController.prototype.right = function() { return this.mask & this.RIGHT; }
KeyboardController.prototype.fire = function() { return this.mask & this.FIRE; }
    
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
    }
    if (e.ctrlKey) {
        this.mask |= this.FIRE;
    }
};
