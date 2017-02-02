function CharacterPicker(controller) {

    var that = this;
    this.enabled = true;

    $(".character-picker-button").on("click touchstart", "", function(e) {
        if (that.enabled)
        {
            $(".dialog-background").show();
            $(".character-picker").show();
        }
    });
    
    $(".character-picker").on("click touchstart", "", function() {
        return false;
    });
    $(".dialog-background").on("click touchstart", "", function() {
        $(".dialog-background").hide();
        $(".character-picker").hide();
    });
    
    $(".character-button").on("click touchstart", "", function(e) {
        $(".dialog-background").hide();
        $(".character-picker").hide();
        controller.setClass($(e.target).data().class);
    });
}

CharacterPicker.prototype.enable = function(val) {
    this.enabled = val;
    $(".character-picker-button").css({opacity: val ? 1 : .5});
}
