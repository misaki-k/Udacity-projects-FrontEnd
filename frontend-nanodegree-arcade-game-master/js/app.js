// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    //console.log(this);
    //collide function needed
    this.height = 50;
    this.width = 80;
  //var rect1 = {x: 5, y: 5, width: 50, height: 50}
  //var rect2 = {x: 20, y: 10, width: 10, height: 10}

  //if (rect1.x < rect2.x + rect2.width &&
  //   rect1.x + rect1.width > rect2.x &&
  //   rect1.y < rect2.y + rect2.height &&
  //   rect1.height + rect1.y > rect2.y) {
      // collision detected!
   // };

     //console.log("for loop executed");
     if(player.x < this.x + this.width &&
       player.x + player.width > this.x &&
       player.y < this.y + this.height &&
       player.height + player.y > this.y){
         player.x = 200;
         player.y = 405;
         //return player;
         //console.log("collision detected!!!");
       };

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  //Enemy.call(this, x, y);
  //Player.prototype = Object.create(Enemy.prototype);
  //Player.prototype.constructor = Player;
  this.sprite = "images/char-boy.png";
};
Player.prototype.update = function(dt) {
  //this.x = this.x;
  //this.y = this.y;
  this.height = 50;
  this.width = 50;

//  if(player.y = -10){
//    this.y = 200;
//    this.x = 405;
//}
  for(e = 0; e < allEnemies.length; e++) {
    if(this.x < allEnemies[e].x + allEnemies[e].width &&
      this.x + this.width > allEnemies[e].x &&
      this.y < allEnemies[e].y + allEnemies[e].height &&
      this.height + this.y > allEnemies[e].y){
        this.x = 200;
        this.y = 405;
        //return player;
      };
    };
};

Player.prototype.render =function() {
  //if(left) this.x -= 83;
  //if(up) this.y = this.y -= 101;
  //if(right) this.x = this.x += 83;
  //if(down) this.y = this.y += 101;

  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  //console.log("handleInput");
  //console.log(key);

  //canvas.width = 505;
  //canvas.height = 606;

if ((this.x > -2 && this.x < 303) && (this.y < 405 && this.y > -10)){
  switch (key) {
    case "left":
      this.x -= 101;
      break;
    case "up":
      this.y -= 83;
      break;
    case "right":
      this.x += 101;
      break;
    case "down":
      this.y += 83;
      break;
    default:
      console.log("Sorry, we are out of " + key + ".");
  }
 }
 else if((this.x > -2 && this.x >= 303) && (this.y >= 405 && this.y > -10)) {
   switch(key) {
     case "left":
       this.x -= 101;
       break;
     case "up":
       this.y -= 83;
       break;
     case "right":
       this.x += 0;
       break;
     case "down":
       this.y += 0;
       break;
      default:
        null;
   }
 }
 else if((this.x <= -2 && this.x < 303) && (this.y <= -10 && this.y < 405)) {
   switch(key){
     case "left":
       this.x -= 0;
       break;
     case "up":
       this.y -= 0;
       break;
     case "right":
       this.x += 101;
       break;
     case "down":
       this.y += 83;
       break;
     default:
       null;

   }
 }
 else if(this.y >= 405 && this.y > -10) {
   switch(key){
     case "left":
       this.x -= 101;
       break;
     case "up":
       this.y -= 83;
       break;
     case "right":
       this.x += 101;
       break;
     case "down":
       this.y += 0;
       break;
     default:
       null;

   }
 }
 else if((this.x <= -2 && this.x < 303) && (this.y <= -10 && this.y < 405)) {
   switch(key){
     case "left":
       this.x -= 0;
       break;
     case "up":
       this.y -= 0;
       break;
     case "right":
       this.x += 101;
       break;
     case "down":
       this.y += 83;
       break;
     default:
       null;

   }
 }
 else if(this.x >= 303) {
   switch(key){
     case "left":
       this.x -= 101;
       break;
     case "up":
       this.y -= 83;
       break;
     case "right":
       this.x += 0;
       break;
     case "down":
       this.y += 83;
       break;
     default:
       null;

   }
 }

 else if(this.x <= -2) {
   switch(key){
     case "left":
       this.x -= 0;
       break;
     case "up":
       this.y -= 83;
       break;
     case "right":
       this.x += 101;
       break;
     case "down":
       this.y += 83;
       break;
     default:
       null;

   }
 }
 else if(this.y <= -10) {
   switch(key){
     case "left":
       this.x -= 101;
       break;
     case "up":
       this.y -= 0;
       break;
     case "right":
       this.x += 101;
       break;
     case "down":
       this.y += 83;
       break;
     default:
       null;

   };
 };
};

// This class requires an update(), render() and
// a handleInput() method.

//var resetPlayer = function(){
//  Player.height = 171;
//  Player.width = 101;
//  Enemy.height = 171;
//  Enemy.width = 101;
//var rect1 = {x: 5, y: 5, width: 50, height: 50}
//var rect2 = {x: 20, y: 10, width: 10, height: 10}

//if (rect1.x < rect2.x + rect2.width &&
//   rect1.x + rect1.width > rect2.x &&
//   rect1.y < rect2.y + rect2.height &&
//   rect1.height + rect1.y > rect2.y) {
    // collision detected!
 // };
// for(e = 0; allEnemies[e] < allEnemies.length; e++) {
//   if(player.x < allEnemies[e].x + allEnemies[e].width &&
//     player.x + player.width > allEnemies[e].x &&
//     player.y < allEnemies[e].y + allEnemies[e].height &&
//     player.height + player.y > player.y > allEnemies[e].y){
//       player.x = 200;
//       player.y = 375;
//       return player;
//     };
//   };
//};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//var enemy = new Enemy(0, 150, 100);  start at x = 0, y = 150, speed = 100

var firstEnemy = new Enemy(0, 144.5, 100);
//firstEnemy = setInterval(firstEnemy, 10);
var secondEnemy = new Enemy(0, 227.5, 100);
//secondEnemy = setInterval(secondEnemy, 15);
var thirdEnemy = new Enemy(0, 61.5, 50);
//thirdEnemy = setInterval(thirdEnemy, 12);
var allEnemies = [firstEnemy, secondEnemy, thirdEnemy];

var player = new Player(200, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
