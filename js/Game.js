function Game(worlds) {
    this.worlds = worlds;
    this.gamePad = new KeyboardController();
    this.curtain = new Curtain();
}

Game.prototype.loadWorld = function(name) {
    if (this.controller) {
        this.closeWorld().then($.proxy(function(){
            this.controller.close();
            this.controller = null;
            setTimeout($.proxy(this.loadWorld, this, name), 500);
        },this));
    } else {
        this.world = worlds[name];
        this.controller = new Controller(this.world, this);
        this.curtain.open();
    }
}

Game.prototype.closeWorld = function(name) {
    this.controller.pause();
    return this.curtain.close();
}

Game.prototype.find = function(class_) {
    return class_.prototype.instances;
}

