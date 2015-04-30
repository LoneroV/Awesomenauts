game.PlayerEntity = me.Entity.extend({
    init: function(x, y, setttings) {
        this.setSuper(x, y);
        this.setPlayerTimers();
        this.setAttributes();
        this.type = "PlayerEntity";
        this.setFlags();
        this.attack = game.data.playerAttack;
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.addAnimation();
        this.renderable.setCurrentAnimation("idle");
    },
    setSuper: function(x, y) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                height: 64,
                width: 64,
                spriteHeight: "64",
                spriteWidth: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 50)).toPolygon();
                }
            }]);
    },
    setPlayerTimers: function() {
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime();
    },
    setAttributes: function() {
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
    },
    setFlags: function() {
        //keeps traack of which direction your player is facing.
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    addAnimation: function() {
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 75);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
    },
    setAnimation: function() {
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //sets current animation to attack once that is over
                //goes back to idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so that when the next time we strat this animation we begin
                //from the first animation not where we left off
                this.renderable.setAnimationFrame();
            }
        }
        else if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }
    },
    update: function(delta) {
        this.now = new Date().getTime();
        this.dead = this.checkIfDead();
        this.checkKeyPressesAndMove();
        this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    checkIfDead: function() {
        if (this.health <= 0) {
            return true;
        }
        return false;
    },
    checkKeyPressesAndMove: function() {
        //checks if right button has been pressed
        if (me.input.isKeyPressed("right")) {
            // flips the sprite on horizontal axis
            this.flipX(true);
            // updates the entity velocity
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
        } else if (me.input.isKeyPressed("left")) {
            // unflips the sprite
            this.flipX(false);
            // updates the entity velocity
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.facing = "left";
        } else {
            this.body.vel.x = 0;
            // changes to the standing animation
        }

        if (me.input.isKeyPressed("jump")) {
            // make sure we are not already jumping or falling
            if (!this.body.jumping && !this.body.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.body.jumping = true;
            }

        }
        this.attacking = me.input.isKeyPressed("attack");
    },
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    collideHandler: function(response) {
        if (response.b.type === 'EnemyBaseEntity') {
            this.collisionWithEnemyBase(response);
        }else if (response.b.type === 'EnemyCreep') {
            this.collisionWithEnemyCreep(response);
        }
    },
    
    collisionWithEnemyBase: function(response) {
        var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x - response.b.pos.x;
        if (ydif < -40 && xdif < 70 && xdif > -35) {
            this.body.falling = false;
            this.body.vel.y = -1;
        }
        else if (xdif > -35 && this.facing === "right" && (xdif < 0)) {
            this.body.vel.x = 0;
        } else if (xdif < 60 && this.facing === "left" && (xdif > 0)) {
            this.body.vel.x = 0;
        }
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer) {
            this.lastHit = this.now;
            response.b.loseHealth(game.data.playerAttack);
        }
    },
    //handles collions with creeps
    collisionWithEnemyCreep: function(response) {
        var xdif = this.pos.x - response.b.pos.x;
        var ydif = this.pos.y - response.b.pos.y;
        this.stopMovement(xdif);
        this.checkAttack(xdif, ydif, response);
    },
    //stops us from moving if we hit the base or creep
    stopMovement: function(xdif){
        if (xdif >= 0) {
            if (this.facing === "left") {
                this.body.vel.x = 0;
            }
        } else {
            if (this.facing === "right") {
                this.body.vel.x = 0;
            }
        }
    },
    checkAttack: function(xdif, ydif, response){
        if (this.renderable.isCurrentAnimation("attack") && (this.now - this.lastHit) >= 1000
                && (Math.abs(ydif) <= 40) &&
                ((xdif < 0 && this.facing === "right") || (xdif > 0 && this.facing === "left")
                        )) {
            this.lastHit = this.now;
            //if creep health lower than attack then execute code in if statement
            if (response.b.health <= game.data.playerAttack) {
                //adds one gold
                game.data.gold += 1;
            }
            response.b.loseHealth(game.data.playerAttack);
        }
    }
});