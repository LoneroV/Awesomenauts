game.NewProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10);
        
        me.input.unbindKey(me.input.KEY.B);
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.S);
        me.input.unbindKey(me.input.KEY.A);
        me.input.unbindKey(me.input.KEY.Q);
        
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [0, 0, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");

            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Pick a Username and Password", this.pos.x, this.pos.y);
                
            }
        })));
      
    },

    onDestroyEvent: function() {
       
    }
});
