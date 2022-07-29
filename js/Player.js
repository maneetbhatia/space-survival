// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen
// let enemyy = document.querySelector(gameEngine.enemies);
// console.log(enemyy)
class Player {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
  constructor(root) {
    // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
    // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
    // the leftmost x position of the image.
    this.x = 2 * PLAYER_WIDTH;

    // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
    // hamburger. The y position is the distance from the top margin of the browsing area.
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;

    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    this.player = document.createElement('img');
    this.player.src = 'images/player.png';
    this.player.style.position = 'absolute';
    this.player.style.left = `${this.x}px`;
    this.player.style.top = ` ${this.y-30}px`;
    this.player.style.paddingLeft = "5px"
    this.player.style.width = "82px";
    this.player.style.height = "90px"
    this.player.style.opacity = "75%"
    this.player.style.zIndex = '10';
    root.appendChild(this.player);

    // added player move sound
    this.sound = document.createElement("audio");
    this.sound.src = "/audio/move.mp3";
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    root.appendChild(this.sound);
  }

  // This method will be called when the user presses the left key. See in Engine.js
  // how we relate the key presses to this method
  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
      this.sound.currentTime = 0;
      this.sound.play();
    }

    this.player.style.left = `${this.x}px`;
  }

  // We do the same thing for the right key. See Engine.js to see when this happens.
  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
      this.sound.currentTime = 0;
      this.sound.play();
    }
    this.player.style.left = `${this.x}px`;
  }

  // this method will make enemy disappear when the user presses the up arrow key.
  moveUp(){
    gameEngine.enemies.forEach(enemy => {
      if(this.x === enemy.x){
        if(score > 60){
        enemy.destroyed = true;
        enemy.domElement.style.display = "none"
      }
    }
  })
  }
}
