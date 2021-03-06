
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(1280, 480, {wrapper : "screen", scale : "auto", scaleMethod: "flex-width"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
        // // (this will also automatically switch to the loading screen)
        // me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.GAME_END, new game.WinScreen());
        me.state.set(me.state.GAMEOVER, new game.GameOverScreen());

        // add our entities in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);
        me.pool.register("CoinEntity", game.CoinEntity);
        me.pool.register("MagicItemEntity",game.MagicItemEntity);
        me.pool.register("TimerEntity", game.TimerEntity);
        me.pool.register("EnemyEntity", game.EnemyEntity);
        me.pool.register("DeathEntity",game.DeathEntity);
        me.pool.register("MovingBlock0",game.WinEntity);
        me.pool.register("MovingBlock0",game.MovingBlockEntity0);
        me.pool.register("WinEntity",game.WinEntity);

        me.pool.register("Fallingblocks",game.FallingBlockEntity);
        me.pool.register("FloatingEnemy0",game.FloatingEnemyEntity0);


        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X,     "jump", true);

        // initialize facades
        game.FreezerFacade = new game.FreezerFacade();

        // Start the game.
        me.state.change(me.state.MENU);
    }
};
