game.SpendExp = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10);
        
        me.input.bindKey(me.input.KEY.F1, "F1");
        me.input.bindKey(me.input.KEY.F2, "F2");
        me.input.bindKey(me.input.KEY.F3, "F3");
        me.input.bindKey(me.input.KEY.F4, "F4");
        me.input.bindKey(me.input.KEY.F5, "F5");
        
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [0, 0, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");

            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Press F1-F4 to Buy, Press F5 to skip", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "Current EXP: " + game.data.exp.toString(), this.pos.x + 0, this.pos.y + 50);
                this.font.draw(renderer.getContext(), "F1: Increase Gold Production: " + game.data.exp1.toString() + "Cost: " + ((game.data.exp1 + 1) * 10), this.pos.x + 0, this.pos.y + 100);
                this.font.draw(renderer.getContext(), "F2: Increase Attack Power: " + game.data.exp2.toString()  + "Cost: " + ((game.data.exp2 + 1) * 10), this.pos.x + 0, this.pos.y + 150);
                this.font.draw(renderer.getContext(), "F3: Increase Health: " + game.data.exp3.toString()  + "Cost: " + ((game.data.exp3 + 1) * 10), this.pos.x + 0, this.pos.y + 200);
                this.font.draw(renderer.getContext(), "F4: Increase Speed: " + game.data.exp4.toString()  + "Cost: " + ((game.data.exp4 + 1) * 10), this.pos.x + 0, this.pos.y + 250);
            }
        })));
       
       this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
           if(action === "F1"){
               
           }else if (action === "F2"){
               
           }else if (action === "F3"){
               
           }else if (action === "F4"){
               
           }else if (action === "F5"){
               me.state.change(me.state.PLAY);
           }
       });
       
    },

    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.F1, "F1");
        me.input.unbindKey(me.input.KEY.F2, "F2");
        me.input.unbindKey(me.input.KEY.F3, "F3");
        me.input.unbindKey(me.input.KEY.F4, "F4");
        me.input.unbindKey(me.input.KEY.F5, "F5");
        me.event.unsubscribe(this.handler);
    }
});
