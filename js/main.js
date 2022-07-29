// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById('app'));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === 'ArrowLeft') {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === 'ArrowRight') {
    gameEngine.player.moveRight();
  }

  if (event.code === 'ArrowUp') {
    gameEngine.player.moveUp();
  }
};

// We call the gameLoop method to start the game and add event listener to player
function startGame(){
  gameEngine.gameLoop();
  playButton.style.display = "none";
  document.addEventListener('keydown', keydownHandler);
}

// Created start button and modify css
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

// Created instructions div and modify css
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