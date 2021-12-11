// instantiate gameScene
let gameScene = new Phaser.Scene('Game');

//enemy variables
let enemiesOnScreen = 0;
let enemiesDefeated = 0;


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
    this.player = this.physics.add.sprite(180, 700, 'player');

    // scale up player sprite
    this.player.setScale(1.5);
    this.player.setCollideWorldBounds(true);

    this.finish = this.physics.add.sprite(180, -20, 'finish');
    this.finish.setScale(3.5);
  
    //enemy groups
    //this group is for purposes of detecting being hit
    this.enemies = this.physics.add.group();
    
    //these groups are for movement since different enemies should have different speeds

    // adding enemies for scaling purposes, location is obviously not finalized

    // assign keys
    this.keys = this.input.keyboard.addKeys({
        a:  Phaser.Input.Keyboard.KeyCodes.A,
        s:  Phaser.Input.Keyboard.KeyCodes.S,
        d:  Phaser.Input.Keyboard.KeyCodes.D,
        w:  Phaser.Input.Keyboard.KeyCodes.W
    });

    //Collider for frog/enemy collision
    this.physics.add.collider(this.player, this.enemies, gameScene.hitEnemy, null, gameScene);
    this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);    
    this.physics.add.collider(this.player, this.finish, this.restartGame, null, gameScene);
}

gameScene.update = function() {
    // left/right movement
    if (this.keys.a.isDown) {
      this.player.x -= 3;
    } else if (this.keys.d.isDown) {
      this.player.x += 3;
    }

    // up/down movement
    if (this.keys.w.isDown) {
        this.player.y -= .2;
    } else if (this.keys.s.isDown) {
        this.player.y += .2;
    }

    this.addEnemy();
    this.checkEnemyBottomBound();
    this.checkEnemiesDefeated();
}

// add enemies
gameScene.addEnemy = function(){
    if (enemiesOnScreen < 7) {
            this.RandomEnemy();
    }
}

//random enemy generation
gameScene.RandomEnemy = function(){
    let xcoord = this.getRandomX();
    let ycoord = 20;
    let rand = Math.floor(Math.random() * 3);
    let enemy;

    switch (rand){
         case 0:
             enemy = this.physics.add.sprite(xcoord, ycoord, 'asteroid1');
             break;
         case 1:
             enemy = this.physics.add.sprite(xcoord, ycoord, 'asteroid2');
             break;
         case 2:
             enemy = this.physics.add.sprite(xcoord, ycoord, 'rocket');
             break;
    }

    enemiesOnScreen++;

    this.enemies.add(enemy);
    this.setRandomVelocity(enemy);
    enemy.body.setCollideWorldBounds(true);
    enemy.setBounce(1,1);
}

//Enemy movement, designed to be called by the update function
gameScene.checkEnemyBottomBound = function() {
    //Enemy movement goes here
    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;

    for (let i = 0; i < numEnemies; i++) {
        if (enemies[i].y >= 720) {
            this.setRandomVelocity(enemies[i]);
            enemies[i].y = 0;
            enemiesDefeated++;
            enemies[i].x = this.getRandomX();
        }
    }
}

gameScene.setRandomVelocity = function(enemy) {
    let vel = Math.floor(Math.random() * (100 - 50 + 50) + 50);
    vel *= Math.round(Math.random()) ? 1 : -1;
    enemy.setVelocity(vel, vel);
}

gameScene.getRandomX = function() {
    return Math.floor(Math.random() * (350 - 1 + 1) + 1);
}

gameScene.checkEnemiesDefeated = function() {
    if (enemiesDefeated >= 10) {
        this.finish.speed = .5;
        this.finish.y += .5;
    }
    //console.log(enemiesDefeated); 
}

// restart game
gameScene.restartGame = function(player, enemy) {
    // do something
    //this.gameScene.destroy();
    gameScene.destroyEnemies();
    let x = config.width / 2 - 8;
    let y = config.height + 60;
    this.player.enableBody(true, x, y, true, true);
    this.checkEnemiesDefeated();
    enemiesDefeated = 0;
    this.finish.setPosition(180, -20);

    
    //gameScene.RandomEnemy();

}

// When the player hits an enemy..
gameScene.hitEnemy = function(player, enemy) {
    this.checkEnemiesDefeated();
    enemiesDefeated = 0;
    //console.log("Player hit!");
    this.resetEnemy(enemy);
    this.player.disableBody();
    this.restartGame();
    this.finish.setPosition(180, -20);
}

gameScene.resetEnemy = function(enemies) {
    enemies.y = 0;
    enemies.x = this.getRandomX();
    this.setRandomVelocity(enemies);
}

gameScene.destroyEnemies = function(enemies) {
    this.enemies.getChildren();

    for (let i = 5; i < enemies; i--) {
        enemies.destroy(i);
    }
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

