function CollisionDetector(map) {
    this.map = map;
    this.objects = [];
}

CollisionDetector.prototype.add = function(o) {
    this.objects.push(o);
}

CollisionDetector.prototype.remove = function(c) {
    _.remove(this.objects, function(x) { return x==c; });
}

CollisionDetector.prototype.objectsCollisions = function(a) {
    var aX1 = Math.floor(a.vector.x.pos / 50) ;
    var aX2 = Math.ceil(a.vector.x.pos / 50) + a.extents.length-1;
    var aY1 = Math.floor(a.vector.y.pos / 50);
    var aY2 = Math.ceil(a.vector.y.pos / 50) + a.extents.length-1;
    return _.each(this.objects, function(b) {
        if (a==b) return;

        var bX1 = Math.floor(b.vector.x.pos / 50);
        var bX2 = Math.ceil(b.vector.x.pos / 50) + b.extents[0].length-1;
        var bY1 = Math.floor(b.vector.y.pos / 50);
        var bY2 = Math.ceil(b.vector.y.pos / 50) + b.extents.length-1;

        if (aX2 >= bX1 && aX1 < bX2 && aY2 >= bY1 && aY1 < bY2)
        {
            b.hit(a);
        }
    });
}

CollisionDetector.prototype.isGrounded = function(object) {
    var x = object.vector.x;
    var y = object.vector.y;
    var logicalX = Math.floor(x.pos / 50);
    var logicalX2 = Math.ceil(x.pos / 50);
    var logicalY = this.map.length - 1 - Math.floor(y.pos / 50) + 1;
    if (y.speed == 0 && y.pos % 50 == 0
        && (this.map[logicalY][logicalX] == 1
            || this.map[logicalY][logicalX2] == 1
            || this.map[logicalY][logicalX2+1] == 1)) {
        return true;
    }
    return false;
}

CollisionDetector.prototype.TILE_WIDTH = 50;

CollisionDetector.prototype.mapHorizontalCollisions = function(object) {
    var dir = this.getHorizontalDirection(object);
    if (!dir) return;

    var x = object.vector.x;
    var y = object.vector.y;
    var logicalY = this.map.length - 1 - Math.floor(y.pos / 50);
    
    if (x.pos > this.map[0].length*this.TILE_WIDTH-100) {
        x.pos = this.map[0].length*this.TILE_WIDTH-100;
        x.speed = 0;
    } else if (x.pos < 0) {
        x.pos = 0;
        x.speed = 0;
    } else if (this.map[logicalY][dir.ahead(x.pos / this.TILE_WIDTH)+dir.extent(object)] == 1) {
        x.pos = dir.behind(x.pos / this.TILE_WIDTH) * this.TILE_WIDTH;
        x.speed = 0;
    }
}



CollisionDetector.prototype.UP    = {ahead: Math.ceil,  behind: Math.floor, extent: function(object){return object.extents.length-1;} };
CollisionDetector.prototype.DOWN  = {ahead: Math.floor, behind: Math.ceil, extent: function(object){return 0;} };
CollisionDetector.prototype.LEFT  = {ahead: Math.floor, behind: Math.ceil, extent: function(object){return 0;} };
CollisionDetector.prototype.RIGHT = {ahead: Math.ceil,  behind: Math.floor, extent: function(object){return object.extents[0].length-1;} };
CollisionDetector.prototype.NONE  = null;


CollisionDetector.prototype.getHorizontalDirection = function(object) {
    switch(Math.sign(object.vector.x.speed)) {
        case -1:
            return this.LEFT;
        case 1:
            return this.RIGHT;
        default:
            return this.NONE;
    }
}

CollisionDetector.prototype.getVerticalDirection = function(object) {
    switch(Math.sign(object.vector.y.speed)) {
        case -1:
            return this.DOWN;
        case 1:
            return this.UP;
        default:
            return this.NONE;
    }
}

CollisionDetector.prototype.mapVerticalCollisions = function(object) {
    var dir = this.getVerticalDirection(object);
    if (!dir) return;

    var x = object.vector.x;
    var y = object.vector.y;

    var logicalX = Math.floor(x.pos / this.TILE_WIDTH);
    var logicalX2 = Math.ceil(x.pos / this.TILE_WIDTH);
    var logicalY = this.map.length - 1 - dir.ahead(y.pos / 50);

    if (y.pos > (this.map.length-1)*50) {
        y.pos = (this.map.length-1)*50;
        y.speed = 0;
    } else if (y.pos < 0) {
        // let it fall!
    } else if (this.map[logicalY][logicalX] == 1
        || this.map[logicalY][logicalX2] == 1
        || this.map[logicalY][logicalX2+1] == 1) {
        y.pos = dir.behind(y.pos / 50) * 50;
        y.speed = 0;
    }
}


