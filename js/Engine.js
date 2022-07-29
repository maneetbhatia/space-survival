// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
let score = 0;
let gameOverMessage = document.createElement('div');
let playAgainButton = document.createElement('button');
let messageScore = document.createElement('div');
let gameScore = document.createElement('button');
let gameLives = document.createElement('button');
let lives = 3;
let playButton = document.createElement('button');
let sound = document.createElement("audio");
let body = document.querySelector("body")
body.style.marginTop = "0px";

class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We add the background image to the game
    addBackground(this.root);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });


    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.

    this.enemies = this.enemies.filter((enemy) => {
      
      if(enemy.destroyed === true){
          score += 1;
      }

      // create score button and modify css
      gameScore.innerHTML = "Score: "+score;
      this.root.appendChild(gameScore);
      gameScore.style.position = 'absolute';
      gameScore.style.left = `20px`;
      gameScore.style.top = `20px`;
      gameScore.style.zIndex = '400';
      gameScore.style.color = 'Chartreuse';
      gameScore.style.fontSize = "20px";
      gameScore.style.backgroundColor = "black";
      gameScore.style.border = "none";
      gameScore.style.cursor = "text";

      // create score button and modify css
      gameLives.innerText = "Lives: "+lives;
      this.root.appendChild(gameLives);
      gameLives.style.position = 'absolute';
      gameLives.style.left = `280px`;
      gameLives.style.top = `20px`;
      gameLives.style.zIndex = '400';
      gameLives.style.color = 'Chartreuse';
      gameLives.style.fontSize = "20px";
      gameLives.style.backgroundColor = "black";
      gameLives.style.border = "none";
      gameLives.style.cursor = "text";
        
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {

      // create game over div and modify css
      gameOverMessage.innerHTML = "Game Over";
      this.root.appendChild(gameOverMessage);
      gameOverMessage.style.position = 'absolute';
      gameOverMessage.style.left = `92px`;
      gameOverMessage.style.top = `150px`;
      gameOverMessage.style.zIndex = '300';
      gameOverMessage.style.color = 'Crimson';
      gameOverMessage.style.fontWeight = "bolder";
      gameOverMessage.style.fontSize = "48px";
      gameOverMessage.style.fontFamily = "Jazz LET, fantasy";
      gameOverMessage.style.opacity = "80%";
      gameOverMessage.style.display = "block";
      

      // create score div and modify css
      messageScore.innerHTML = "Score: "+score;
      this.root.appendChild(messageScore);
      messageScore.style.position = 'absolute';
      messageScore.style.left = `92px`;
      messageScore.style.top = `220px`;
      messageScore.style.zIndex = '300';
      messageScore.style.color = 'Chartreuse';
      messageScore.style.fontSize = "38px";
      messageScore.style.padding = "5px 35px";
      messageScore.style.fontFamily = "Jazz LET, fantasy";
      messageScore.style.fontWeight = "bolder";
      messageScore.style.display = "block";
      messageScore.style.borderRadius = "10px"
      messageScore.style.backgroundColor = "ghostwhite";
      messageScore.style.color = "orange";

      // create restart button and modify css
      playAgainButton = document.createElement('button');
      playAgainButton.innerHTML = "Play Again";
      this.root.appendChild(playAgainButton);
      playAgainButton.style.position = 'absolute';
      playAgainButton.style.left = `100px`;
      playAgainButton.style.top = `210px`;
      playAgainButton.style.zIndex = '300';
      playAgainButton.style.color = 'orange';
      playAgainButton.style.fontSize = "35px";
      playAgainButton.style.fontFamily = "impact";
      playAgainButton.style.padding = "5px 23px";
      playAgainButton.style.cursor = "pointer";
      playAgainButton.style.display = "block";
      gameScore.style.display = "none";

      // added 3 lives in game
      if(lives >= 0){
        gameLives.innerText = "Lives: "+lives;
        playAgainButton.addEventListener("click", restart);
        gameOverMessage.style.display = "none";
        gameScore.style.display = "block";
        messageScore.style.display = "none";
        if(lives === 0){
          gameScore.style.display = "none";
          messageScore.style.display = "block";
          gameOverMessage.style.display = "block";
          playAgainButton.style.display = "none";
          gameLives.style.display = "none";
          document.removeEventListener('keydown', keydownHandler);
        }
      }

      // added game over sound
      sound.src = "/audio/gameover.wav";
      sound.setAttribute("preload", "auto");
      sound.setAttribute("controls", "none");
      sound.style.display = "none";
      this.root.appendChild(sound);
      sound.play();
      // removing event listener from player after collision
      document.removeEventListener('keydown', keydownHandler);
      
      return;
    }
    
    // this function will start the game again and reset the score and enemy count to default
    function restart(){
        document.addEventListener('keydown', keydownHandler);
        gameEngine.gameLoop();
        MAX_ENEMIES = 3;
        gameOverMessage.style.display = "none";
        playAgainButton.style.display = "none";
    }
  
    // this function increases no of enemies after user score more than 20 points.
    function increaseEnemies(){
      if(score > 30){
        MAX_ENEMIES = 4;
      }
    }

    //calling increase enemies function
    increaseEnemies();

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the player never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let gameEnd = false;
    this.enemies.forEach(enemy => {
      
      //collision check
      if(this.player.x < enemy.x + ENEMY_WIDTH &&
        this.player.x + PLAYER_WIDTH > enemy.x &&
        this.player.y < enemy.y + ENEMY_HEIGHT &&
        PLAYER_HEIGHT + this.player.y > enemy.y){
        gameEnd = true;
        lives--;
        clearTimeout(this.gameLoop, 20);
      }
    })
    return gameEnd;
  };
}
