function CollisionDetector() {
    this.objects = [];
}

CollisionDetector.prototype.add = function(o) {
    this.objects.push(o);
}

CollisionDetector.prototype.remove = function(c) {
    _.remove(this.objects, function(x) { return x==c; });
}

CollisionDetector.prototype.collisions = function(a) {
    var aX1 = Math.floor(a.vector.x.pos / 50) ;
    var aX2 = Math.ceil(a.vector.x.pos / 50) + a.extents.length-1;
    var aY1 = Math.floor(a.vector.y.pos / 50);
    var aY2 = Math.ceil(a.vector.y.pos / 50) + a.extents.length-1;
    return _.find(this.objects, function(b) {
        if (a==b) return false;

        var bX1 = Math.floor(b.vector.x.pos / 50);
        var bX2 = Math.ceil(b.vector.x.pos / 50) + b.extents[0].length-1;
        var bY1 = Math.floor(b.vector.y.pos / 50);
        var bY2 = Math.ceil(b.vector.y.pos / 50) + b.extents.length-1;

        if (aX2 >= bX1 && aX1 < bX2 && aY2 >= bY1 && aY1 < bY2)
        {
            console.log("aX1=" + aX1 + ", " + "aX2=" + aX2 + ", " + "aY1=" + aY1 + ", " + "aY2=" + aY2 + "");
            console.log("bX1=" + bX1 + ", " + "bX2=" + bX2 + ", " + "bY1=" + bY1 + ", " + "bY2=" + bY2 + "");
            return true;
        }
        return false;
    });
}
