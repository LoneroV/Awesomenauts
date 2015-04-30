game.SpendExp = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10);
        
        //binds keys to use in game
        me.input.bindKey(me.input.KEY.F1, "F1");
        me.input.bindKey(me.input.KEY.F2, "F2");
        me.input.bindKey(me.input.KEY.F3, "F3");
        me.input.bindKey(me.input.KEY.F4, "F4");
        me.input.bindKey(me.input.KEY.F5, "F5");
        //allows us to spend
        var exp1cost = ((Number(game.data.exp1) + 1) * 10);
        var exp2cost = ((Number(game.data.exp2) + 1) * 10);
        var exp3cost = ((Number(game.data.exp3) + 1) * 10);
        var exp4cost = ((Number(game.data.exp4) + 1) * 10);
        
        //adds text to screen
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [0, 0, 300, 50]);
                this.font = new me.Font("Arial", 26, "black");

            },
            //draws abilities to purchase
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Press F1-F4 to Buy, Press F5 to Play", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "Current EXP: " + game.data.exp.toString(), this.pos.x + 0, this.pos.y + 50);
                this.font.draw(renderer.getContext(), "F1: Increase Gold Production: " + game.data.exp1.toString() + "Cost: " + exp1cost, this.pos.x + 0, this.pos.y + 100);
                this.font.draw(renderer.getContext(), "F2: Increase Attack Power: " + game.data.exp2.toString()  + "Cost: " + exp2cost, this.pos.x + 0, this.pos.y + 150);
                this.font.draw(renderer.getContext(), "F3: Increase Health: " + game.data.exp3.toString()  + "Cost: " + exp3cost, this.pos.x + 0, this.pos.y + 200);
                this.font.draw(renderer.getContext(), "F4: Increase Speed: " + game.data.exp4.toString()  + "Cost: " + exp4cost, this.pos.x + 0, this.pos.y + 250);
            }
        })));
       
       this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
           if(action === "F1"){
               if(game.data.exp >= exp1cost){
                   game.data.exp1 += 1;
                   game.data.exp -= exp1cost;
               }
           }else if (action === "F2"){
               if(game.data.exp1 >= exp2cost){
                   game.data.exp2 += 1;
                   game.data.exp1 -= exp2cost;
               }
           }else if (action === "F3"){
               if(game.data.exp2 >= exp3cost){
                   game.data.exp3 += 1;
                   game.data.exp2 -= exp3cost;
               }
           }else if (action === "F4"){
               if(game.data.exp3 >= exp4cost){
                   game.data.exp4 += 1;
                   game.data.exp3 -= exp4cost;
               }
           }else if (action === "F5"){
               me.state.change(me.state.PLAY);
           }
       });
       
    },

    onDestroyEvent: function() {
        //unbinds keys to use on game end
        me.input.unbindKey(me.input.KEY.F1, "F1");
        me.input.unbindKey(me.input.KEY.F2, "F2");
        me.input.unbindKey(me.input.KEY.F3, "F3");
        me.input.unbindKey(me.input.KEY.F4, "F4");
        me.input.unbindKey(me.input.KEY.F5, "F5");
        me.event.unsubscribe(this.handler);
    }
});
