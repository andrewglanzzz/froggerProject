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
      this.player.x -= 2;
    } else if (this.keys.d.isDown) {
      this.player.x += 2;
    }

    // up/down movement
    if (this.keys.w.isDown) {
        this.player.y -= 2;
    } else if (this.keys.s.isDown) {
        this.player.y += 2;
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