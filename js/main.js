const gameEngine = new Engine(document.getElementById('app'));

const keydownHandler = (event) => {

  if (event.code === 'ArrowLeft') {
    gameEngine.player.moveLeft();
  }

  if (event.code === 'ArrowRight') {
    gameEngine.player.moveRight();
  }

  if (event.code === 'ArrowUp') {
    gameEngine.player.moveUp();
  }
};

function startGame(){
  gameEngine.gameLoop();
  playButton.style.display = "none";
  document.addEventListener('keydown', keydownHandler);
}

let app = document.querySelector("#app");
playButton = document.createElement('button');
playButton.innerHTML = "Play";
app.appendChild(playButton);
playButton.style.position = 'absolute';
playButton.style.left = `140px`;
playButton.style.top = `220px`;
playButton.style.zIndex = '2000';
playButton.style.color = 'orange';
playButton.style.fontSize = "35px";
playButton.style.fontFamily = "impact";
playButton.style.padding = "5px 23px";
playButton.style.cursor = "pointer";
playButton.style.display = "block";
playButton.addEventListener("click", startGame);


let instructions = document.createElement('div');
instructions.innerHTML = "<strong>Instructions:-</strong><br><br><strong><i><u>Task</u>:</i></strong> Let's protect earth from aliens by using left arrow 🡸 and right arrow 🡺 keys on keyboard."+"</br>"+"</br>"+"<strong><i><u>Warning</u>:</i></strong> No of aliens increases after player has scored above 30 points."+"</br>"+"</br>"+"<strong><i><u>Power</u>:</i></strong> Once player scored above 60 points, it gets power to make aliens disappear.<br><br> Player can use this power with arrow up 🡹 key on keyboard"+"</br>"+"</br>"+"<strong><i><u>Lives</u>:</u></i></strong> Player have 3 lives to play the game each time and score as high as possible.";
app.appendChild(instructions);
instructions.style.position = 'absolute';
instructions.style.left = `400px`;
instructions.style.textAlign = "justify"
instructions.style.width = "250px"
instructions.style.backgroundColor = "whitesmoke";
instructions.style.boxShadow = "3px 1px 30px grey"
instructions.style.borderRadius = "20px";
instructions.style.top = `10px`;
instructions.style.zIndex = '2000';
instructions.style.color = 'dimgray';
instructions.style.fontSize = "19px";
instructions.style.fontFamily = "times";
instructions.style.padding = "5px 23px";
instructions.style.cursor = "pointer";
instructions.style.display = "block";
instructions.style.cursor = "text";