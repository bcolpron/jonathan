function Portal(x, y) {
    Sprite.call(this, x, y, "images/portal.png");
    this.update();
}
Portal.prototype = _.create(Sprite.prototype, {
    'constructor': Portal
});

Portal.prototype.extents = [[1,1,1],
                            [1,1,1]];
