class Player {
  constructor(root) {
    this.x = 2 * PLAYER_WIDTH;
    
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;

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

    this.sound = document.createElement("audio");
    this.sound.src = "/audio/move.mp3";
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    root.appendChild(this.sound);
  }

  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
      this.sound.currentTime = 0;
      this.sound.play();
    }

    this.player.style.left = `${this.x}px`;
  }

  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
      this.sound.currentTime = 0;
      this.sound.play();
    }
    this.player.style.left = `${this.x}px`;
  }

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
