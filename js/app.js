
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (this.speed*dt);
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

        // no need for speed as movement is not automatic
var Player = function (x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png'; 
}

Player.prototype.update = function (dt) {
    // basically just copied enemy function here
}


// this prototype function handles the player movement
Player.prototype.handleInput = function (keyPress) {
     if (keyPress == 'left' && this.x > 0) {
        // console.log("pressed left!");
        this.x -=100;
    }

    if (keyPress == 'right' && this.x < 400) {
        // console.log("pressed right!");
        this.x +=100;
    }

    if (keyPress == 'up' && this.y > -20) {
        // console.log("pressed up!");
        this.y -=80;
    }

    if (keyPress == 'down' && this.y < 380) {
        // console.log("pressed down!");
        this.y +=80;
    }



};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var score = 1;
var winningPosition = false;

function increaseScore () {
    var scoreboard = document.getElementById('scoreboard');
    if (winningPosition == true) {
        score += 1;    
    }
} 


function success () {
    winningPosition = true;
    var modal = document.getElementById('success-modal');
    scoreboard.innerHTML = "Score: "+score;
    modal.style.display = 'block';
    setTimeout( function(){
        modal.style.display = 'none';
    }, 1500);
}



// create a resetPlayer() method

// moves the player back to the start when reaching the water after a short delay.
Player.prototype.resetPlayer = function() {
    if (this.y < 55) {
        console.log('made the water!')

       success();
       setTimeout(function(){
            player.y = 380;
            // insert score functionality here in udacious version
            increaseScore();
        }, 750);
       
    } 
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// only need one player object
var player = new Player (200, 380);
// create empty array to be accessed by createEnemies() function
var allEnemies = [];


// the function that generates the intial enemies on screen
function createEnemies () {
    console.log('creating enemies')
    for (var i = 0; i < 5; i++) {
        var enemy = new Enemy(enemySpawn(), enemyLocation(), enemySpeed());
        allEnemies.push(enemy);
                
    // console.log('bug logged');
    }
};

createEnemies();
    // this function checks the number of roaches on screen and add new ones once the roaches have passed through the game area
    // the function also handles the collisions, checking for them 20 times per second
window.setInterval(function checkRoaches() {
    for (var k = 0; k < allEnemies.length; k++) {
                if (allEnemies[k].x > 505) {
                    allEnemies.splice(k, 1);
                    var nextWave = new Enemy(enemySpawn(), enemyLocation(), enemySpeed());
                    allEnemies.push(nextWave);
                }
            }
                winningPosition = false;
                player.resetPlayer();
                collisions();
                // console.log(player.y, player.x);


  // console.log("checking...")
}, 50);

// this function determines whether a player has come into contact with the enemy. 
function collisions () {
     for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].y > player.y-20 && allEnemies[i].y < player.y+20 && allEnemies[i].x < player.x+60 && allEnemies[i].x > player.x-60) {
            player.y = 380;
            // console.log('collision occured!');
            // life lost function
        }
    }
}



// this function determines the speed of the roaches. The speed is random.
var roachSpeed;
function enemySpeed () {
    roachSpeed = (Math.random()*250)+100;
    return roachSpeed; 


}

// this function determines which of the three rows the roaches should travel along.
function enemyLocation() {
    tier = Math.round(Math.random()*3);
    if (tier === 3) {
        return 225;
    }
    else if (tier === 2) {
        return 140;
    }
    else if (tier === 1) {
        return 55;
    }
    else {
        console.log("got a zero");
        return enemyLocation();
    }
}

var spawn;

//this sets the enemy's spawn locations, which are at random points on the x-axis to the left of the game area.
function enemySpawn() {
     spawn = -Math.round((Math.random()*1000)+10);
         for (var j = 0; j < allEnemies.length; j++) {
            if (spawn > (allEnemies[j].x - 100) && spawn < (allEnemies[j].x + 100)) {
                enemySpawn();
            } else {
                return spawn;
            }           
         }
     }


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
    // console.log("something pressed");
});


