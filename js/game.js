// instantiate gameScene
let gameScene = new Phaser.Scene('Game');

// key variables
let keyA;
let keyS;
let keyD;
let keyW;


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
    this.asteroid2.setScale(2);

    // WASD movement... does not work right now
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

}
  
  function update() { // this goes along with the WASD movement in create(), does not work. if someone wanted to try to work on it that would be awesome.
    this.player.setVelocity(0);
  
    if (keyA.isDown) {
      this.player.setVelocityX(-50);
    } else if (keyD.isDown) {
      this.player.setVelocityX(50);
    }
  
    if (keyW.isDown) {
      this.player.setVelocityY(-50);
    } else if (keyS.isDown) {
      this.player.setVelocityY(50);
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