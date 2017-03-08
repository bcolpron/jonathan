function Curtain() {
}

Curtain.prototype.open = function() {
    var curtain = $(".curtain");
    curtain.hide();
    curtain.css({opacity: ""});
}

Curtain.prototype.close = function() {
    var done = $.Deferred();
    var i = 0;
    var curtain = $(".curtain");
    curtain.show();
    var t = setInterval($.proxy(function() {
        if (i++ >= 25) {
            clearInterval(t);
            done.resolve();
        }
        curtain.css({opacity: i/25});
    }, this), 40);
    return done;
}
