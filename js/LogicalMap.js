function LogicalMap(map) {
    this.map = map;    
}

LogicalMap.prototype.collision = function(vX, vY) {
    var logicalX = Math.floor(x.pos / this.TILE_WIDTH);
    var logicalX2 = Math.ceil(x.pos / this.TILE_WIDTH);
    var logicalY = 12 - Math.floor(y.pos / 50);
    
    if (this.map[logicalY][logicalX] == 1
        || this.map[logicalY][logicalX2] == 1
        || this.map[logicalY][logicalX2+1] == 1) {
        return true;
    }
    return false;

    var logicalX = Math.floor(x.pos / this.TILE_WIDTH);
    var logicalX2 = Math.ceil(x.pos / this.TILE_WIDTH);
    var logicalY = 12 - Math.ceil(y.pos / 50);
    
    if (this.map[logicalY][logicalX] == 1
        || this.map[logicalY][logicalX2] == 1
        || this.map[logicalY][logicalX2+1] == 1) {
        return true;
    }
    return false;

}

