//Define  HTML elemtns



// Define HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');


// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;


function draw() {
  board.innerHTML = '';
  drawSnake();
  drawFood();
  updateScore();
}

//draw snake
function drawSnake(){
snake.forEach ((segment) => {
const snakeElement = createGameElement('div', 'snake');
setPosition(snakeElement, segment);
board.appendChild(snakeElement);
});
}


//Create a snake or food cube/div
function createGameElement(tag, className){
const element = document.createElement(tag);
element.className = className;
return element;
}

// Set the position of snake or food
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}



//testing draw function
//draw();
 function drawFood() {
if(gameStarted){
const foodElement = createGameElement('div', 'food');
setPosition(foodElement, food);
board.appendChild(foodElement);
}
}


//Generate food
function generateFood() {
const x = Math.floor(Math.random() * gridSize) +1 ;
const y = Math.floor(Math.random() * gridSize) +1;
return { x,y };
}

//moving the snake

function move() {
const head = { ...snake[0] };
 switch (direction){
case 'up':
head. y--;
break;
case 'down':
head.y++;
break;
case 'left':
head.x--;
break;
case 'right':
head.x++;
break;
}




snake.unshift(head);

//snake.pop();

if(head.x === food.x && head.y === food.y) {
food = generateFood();
increaseSpeed();
clearInterval(gameInterval); //clear past interval
gameInterval = setInterval(() => {
move();
checkCollision();
draw();
}, gameSpeedDelay);
}else{
snake.pop();
}
}





// Test moving
// setInterval(() => {
//   move(); // Move first
//   draw(); // Then draw again new position
// }, 200);








//start game function
function startGame(){
gameStarted = true// Keep track of a running game
instructionText.style.display ='none';
logo.style.display ='none';
gameInterval = setInterval(() => {
move();
checkCollision();
draw();
}, gameSpeedDelay);
}





//Keypress event listener
function handleKeyPress(event) {
if (
(!gameStarted && event.code === 'space')  ||
(!gameStarted && event.key === ' ')
){
startGame();
}else{
switch (event.key){
case'ArrowUp':
direction ='up';
break;
case 'ArrowDown':
direction ='down';
break;
case 'ArrowLeft':
direction = 'left';
break;
case 'ArrowRight':
direction ='right';
break;
}
}
}





document.addEventListener ('keydown', handleKeyPress);

function increaseSpeed(){
if(gameSpeedDelay > 150){
gameSpeedDelay -= 5;
}else if (gameSpeedDelay >100){
gameSpeedDelay -= 3;
}else if(gameSpeedDelay >50) {
gameSpeedDelay -= 2;
}else if(gameSpeedDelay >25) {
gameSpeedDelay -= 1;

}
}



function checkCollision(){
const head = snake[0];

 if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame();
  }

for(let i=1; i< snake.length; i++) {
if(head.x === snake[i].x && head.y === snake[i].y) {
resetGame();
}
}
}


function resetGame(){
updateHighScore();
stopGame();
snake =[{x: 10, y:10}];
food = generateFood();
direction ='right';
gameSpeedDelay = 200;
updateScore();
}

function updateScore(){
const currentScore = snake.length -1;
score.textContent = currentScore.toString().padStart(3, '0');
}



function stopGame(){
clearInterval(gameInterval);
gameStarted = false;
instructionText.style.display ='block';
logo.style.display ='block';
}




//function updateHighScore() {
  //const currentScore = snake.length - 1;
 // if (document.cookie.length > 0) {
    // Split the string and get the high score
    // score=###
   // let cookie_high = Number(document.cookie.substring(6));
 // } else {
   // let cookie_high = 0;
  //}
 // if (currentScore > highScore) {
   // highScore = currentScore;
   // highScoreText.textContent = highScore.toString().padStart(3, '0');
 // }
 // highScoreText.style.display = 'block';
//}
//}




//chat code
//will keep the previous high score
//function updateHighScore() {
 // const currentScore = snake.length - 1;

  // Get the high score from localStorage, default to 0 if not available
 // let savedHighScore = parseInt(localStorage.getItem('highScore')) || 0;

  // If current score is higher than the saved high score, update it
  //if (currentScore > savedHighScore) {
   // localStorage.setItem('highScore', currentScore);  // Save the new high score
   // savedHighScore = currentScore;  // Update the variable for the display
 // }

  // Update the high score text on screen
 // highScoreText.textContent = savedHighScore.toString().padStart(3, '0');
 // highScoreText.style.display = 'block';
//}



function updateHighScore(pageIdentifier) {
  const currentScore = snake.length - 1;

  // Get the high score for the current page from localStorage, default to 0 if n>
  let savedHighScore = parseInt(localStorage.getItem(pageIdentifier + '_highScore>

  // If current score is higher than the saved high score, update it
  if (currentScore > savedHighScore) {
    localStorage.setItem(pageIdentifier + '_highScore', currentScore);  // Save t>
    savedHighScore = currentScore;  // Update the variable for the display
  }

  // Update the high score text on screen
  highScoreText.textContent = savedHighScore.toString().padStart(3, '0');
  highScoreText.style.display = 'block';
}






