// instantiate gameScene
let gameScene = new Phaser.Scene('Game');

gameScene.preload = function () {
    // preloading our sprites
    this.load.image('background', 'assets/background.png');

    this.load.image('player', 'assets/frog.png');

}

gameScene.create = function() {
    // adding background to page
    let background = this.add.sprite(0,0, 'background');

    //setting origin to top left
    background.setOrigin(0,0);

    // adding player
    this.player = this.add.sprite(180, 720, 'player');

    // scale down player sprite
    this.player.setScale(.75);

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