function LifeLine(character) {
    this.sprites = character.sprites.append($('<div class="lifeline"><div class="total"><div class="remaining"></div></div></div>'));
}

LifeLine.prototype.update = function(current, total) {
    this.sprites.find(".remaining").width(Math.min(100*current/total, 100)+"%");
}
