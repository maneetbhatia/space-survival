class Enemy {

  constructor(theRoot, enemySpot) {

    this.root = theRoot;
    this.spot = enemySpot;

    this.x = enemySpot * ENEMY_WIDTH;

    this.y = -ENEMY_HEIGHT;
    this.destroyed = false;

    this.domElement = document.createElement('img');

    this.domElement.src = './images/enemy.png';
    this.domElement.setAttribute("class", "class");

    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x+12}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.width = "65px";
    this.domElement.style.height = "110px"
    this.domElement.style.opacity = "80%";
    this.domElement.style.zIndex = 15;

    this.sound = document.createElement("audio");
    this.sound.src = "/audio/emeny.wav";
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.root.appendChild(this.sound);

    this.sound.play()

    theRoot.appendChild(this.domElement);
    this.speed = Math.random() / 2 + 0.25;
  }

  update(timeDiff) {
    this.y = this.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y > GAME_HEIGHT) {
      this.root.removeChild(this.domElement)

      this.destroyed = true;
    }
  }
}
