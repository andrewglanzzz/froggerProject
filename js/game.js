// instantiate gameScene
let gameScene = new Phaser.Scene('Game');

// key variables
let keyA;
let keyS;
let keyD;
let keyW;

//enemy variables
let enemiesOnScreen = 0;
let EnemiesDefeated = 0;


gameScene.preload = function () {
    // preloading our sprites
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/frog.png');
    this.load.image('rocket', 'assets/rocket.png');
    this.load.image('asteroid1', 'assets/asteroid1.png');
    this.load.image('asteroid2', 'assets/asteroid2.png');
    this.load.image('finish', "assets/finishLine.png");
}

gameScene.create = function() {
    // adding background to page
    let background = this.add.sprite(0,0, 'background');

    // setting origin to top left
    background.setOrigin(0,0);

    // adding player
    this.player = this.physics.add.sprite(180, 720, 'player');

    // scale up player sprite
    this.player.setScale(1.5);
    this.player.setCollideWorldBounds(true);

    //enemy groups
    //this group is for purposes of detecting being hit
    this.enemies = this.physics.add.group();
    
    //these groups are for movement since different enemies should have different speeds

    // adding enemies for scaling purposes, location is obviously not finalized
    this.rocket = this.add.sprite(50, 20, 'rocket');
    this.asteroid1 = this.add.sprite(150, 20, 'asteroid1');
    this.asteroid2 = this.add.sprite(225, 20, 'asteroid2');

    // scale up enemy sprites
    this.rocket.setScale(1.5);
    this.asteroid1.setScale(1.5);
    this.asteroid2.setScale(1.5);

    this.enemies.add(this.rocket);
    this.enemies.add(this.asteroid1);
    this.enemies.add(this.asteroid2);

    // assign keys
    this.keys = this.input.keyboard.addKeys({
        a:  Phaser.Input.Keyboard.KeyCodes.A,
        s:  Phaser.Input.Keyboard.KeyCodes.S,
        d:  Phaser.Input.Keyboard.KeyCodes.D,
        w:  Phaser.Input.Keyboard.KeyCodes.W
    });
}
  
gameScene.update = function() {
    // left/right movement
    if (this.keys.a.isDown) {
      this.player.x -= 5;
    } else if (this.keys.d.isDown) {
      this.player.x += 5;
    }

    // up/down movement
    if (this.keys.w.isDown) {

    } else if (this.keys.s.isDown) {

    }
}

// add enemies
gameScene.addEnemy = function(){
    if (enemiesOnScreen < 5){
        for (let i = enemiesOnScreen; i < 5; i++){
            this.RandomEnemy();
        }
    }
}

//random enemy generation
gameScene.RandomEnemy = function(){
    var xcoord;
    var ycoord = 20;
    var rand = Math.floor(Math.random() * 2);
    var enemy;
    switch (rand){
         case 0:
             enemy = game.add.sprite(xcoord, ycoord, 'asteroid1');
             break;
         case 1:
             enemy = game.add.sprite(xcoord, ycoord, 'asteroid2');
             break;
         case 2:
             enemy = game.add.sprite(xcoord, ycoord, 'rocket');
             break;
     }
    enemiesOnScreen++;
    this.enemies.add(enemy);

    enemy.checkWorldBounds = true;
    enemy.outOfBoundsKill = true;
}

//Enemy movement, designed to be called by the update function
gameScene.moveEnemies = function(){
    //Enemy movement goes here

}

// game config
let config = {
    type: Phaser.AUTO,
    width: 360,
    height: 750,
    scene: gameScene,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            debugShowVelocity: false
        }
    }
};

// game creation
let game = new Phaser.Game(config);

