game.ExperienceManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    //updates the game
    update: function() {
        if (game.data.win === true && !this.gameover) {
            this.gameOver(true);
        } else if (game.data.win === false && !this.gameover) {
            this.gameOver(false);
        }
        return true;
    },
    //what to do at game over win or lose
    gameOver: function(win) {
        if (win) {
            game.data.exp += 10;
            alert("You Win!");
        } else {
            game.data.exp += 1;
            alert("You Lose!");
        }

        this.gameOver = true;
        me.save.exp = game.data.exp;

        $.ajax({
            type: "POST",
            url: "php/controller/saved-user.php",
            data: {
                //experience variables
                exp: game.data.exp,
                exp1: game.data.exp1,
                exp2: game.data.exp2,
                exp3: game.data.exp3,
                exp4: game.data.exp4,
                
            },
            dataType: "text"
        })
                //what to do if login is true or false
                .success(function(response) {
                    if (response === "true") {
                        me.state.change(me.state.MENU);
                    } else {
                        alert(response);
                    }
                })
                .fail(function(response) {
                    alert("fail");
                });
    }
});

