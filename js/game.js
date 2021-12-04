// instantiate gameScene
let gameScene = new Phaser.Scene('Game');

gameScene.preload = function () {
    // preloading our sprites
    this.load.image('background', 'assets/background.png');

    this.load.image('player', 'assets/frog.png');

    this.load.image('rocket', 'assets/rocket.png');

    this.load.image('asteroid1', 'assets/asteroid1.png');

    this.load.image('asteroid2', 'assets/asteroid2.png');

}

gameScene.create = function() {
    // adding background to page
    let background = this.add.sprite(0,0, 'background');

    // setting origin to top left
    background.setOrigin(0,0);

    // adding player
    this.player = this.add.sprite(180, 720, 'player');

    // scale up player sprite
    this.player.setScale(1.5);

    // adding enemies for scaling purposes, location is obviously not finalized
    this.rocket = this.add.sprite(50, 650, 'rocket');
    this.asteroid1 = this.add.sprite(50, 550, 'asteroid1');
    this.asteroid2 = this.add.sprite(50, 450, 'asteroid2');

    // scale up enemy sprites
    this.rocket.setScale(2.25);
    this.asteroid1.setScale(2);
    this.asteroid2.setScale(2.);

    // testing player movement, might remove
    let keys = this.input.keyboard.addKeys("W,A,S,D");

    // Same:
    // keys = this.input.keyboard.addKeys({ W: 'W', A: 'A', S: 'S', D: 'D' });
  
    // Named keys:
    // keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });
  
    console.log("keys", keys);
  
    player = this.physics.add.image(200, 150, "player");
    player.setCollideWorldBounds(true);
    }
  
  function update() {
    player.setVelocity(0);
  
    if (keys.A.isDown) {
      player.setVelocityX(-300);
    } else if (keys.D.isDown) {
      player.setVelocityX(300);
    }
  
    if (keys.W.isDown) {
      player.setVelocityY(-300);
    } else if (keys.S.isDown) {
      player.setVelocityY(300);
    }
}





// game config
let config = {
    type: Phaser.AUTO,
    width: 360,
    height: 750,
    scene: gameScene
};

// game creation
let game = new Phaser.Game(config);