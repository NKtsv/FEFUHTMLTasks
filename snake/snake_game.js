const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;

const CELL_SIZE = 20;
const TILE_COUNT = 30;

var space;
var spaceContext;

window.onload = function () {
    space = document.getElementById('gameSpace');
    spaceContext = space.getContext('2d');
    document.addEventListener("keydown",keyPush);
    setInterval(screenUpdate,1000/12);

}

var snake = {
    XVelocity:0,
    YVelocity:0,
    XPosition:10,
    YPosition:10,
    tail:5,
    trail:[]
};

var apple = {
    XPosition:5,
    Yposition:7
};

var nextPosition = {x:Math.floor(Math.random() * TILE_COUNT), y:Math.floor(Math.random() * TILE_COUNT)};

function screenUpdate () {
    snakeMove();
    bgrRecolour();
    snakeRecolour();
    trailAdjustment();   
    appleConsumption();     
    appleRecolour();
}

function snakeMove () {
    snake.XPosition += snake.XVelocity;
    snake.YPosition += snake.YVelocity;
    
    if (snake.XPosition < 0) {
        snake.XPosition = TILE_COUNT - 1;
    }
    if (snake.YPosition < 0) {
        snake.YPosition = TILE_COUNT - 1;
    }
    if (snake.XPosition >= TILE_COUNT) {
        snake.XPosition = 0;
    }
    if (snake.YPosition >= TILE_COUNT) {
        snake.YPosition = 0;
    }    
}

function bgrRecolour () {
    spaceContext.fillStyle = 'black';
    spaceContext.fillRect(0, 0, space.width, space.height);    
}

function snakeRecolour () {
    spaceContext.fillStyle = 'lime';
    for (var i = 0; i < snake.trail.length; i++) {
        spaceContext.fillRect(snake.trail[i].x * CELL_SIZE, 
                              snake.trail[i].y * CELL_SIZE, 
                              CELL_SIZE - 2, CELL_SIZE - 2);
        if (snake.trail[i].x == snake.XPosition && snake.trail[i].y == snake.YPosition){
            // gameend
            snake.tail = 5;
        }
    }    
}

function trailAdjustment () {
    snake.trail.push({x:snake.XPosition, y:snake.YPosition});
    while (snake.trail.length > snake.tail) {
        snake.trail.shift();
    }
}

function appleConsumption () {
    if (apple.XPosition == snake.XPosition && apple.Yposition == snake.YPosition) {
        snake.tail++;        
        while (!isValid()){
            nextPosition = {x:Math.floor(Math.random() * TILE_COUNT), y:Math.floor(Math.random() * TILE_COUNT)};   
        }
        apple.XPosition = nextPosition.x;
        apple.Yposition = nextPosition.y;        
    }
}

function isValid () {
    for(var i = 0; i < snake.trail.length; i++){
        if(snake.trail[i].x == nextPosition.x && snake.trail[i].y == nextPosition.y) {
            return false;
        }
    }
    return true;
}

function appleRecolour () {
    spaceContext.fillStyle = 'red';
    spaceContext.fillRect(apple.XPosition * CELL_SIZE, 
                          apple.Yposition * CELL_SIZE, 
                          CELL_SIZE - 2, CELL_SIZE - 2);
}

function keyPush (evt) {
    switch (evt.keyCode) {
        case LEFT_KEY:
            if(snake.XVelocity != 1){ 
                snake.XVelocity = -1;
                snake.YVelocity = 0;
            }
            break;

        case UP_KEY:
            if(snake.YVelocity != 1){ 
                snake.XVelocity = 0;
                snake.YVelocity = -1;
            }
            break;

        case RIGHT_KEY:
            if(snake.XVelocity != -1){ 
                snake.XVelocity = 1;
                snake.YVelocity = 0;
            }
            break;

        case DOWN_KEY:
            if(snake.YVelocity != -1){ 
                snake.XVelocity = 0;
                snake.YVelocity = 1;
            }
            break;
    }
}