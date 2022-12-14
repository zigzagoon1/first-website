let canvas = '';
let context = '';
let circles = [];
console.log(circles);
const radius = 25;
let gameStart = true;
let moveCircleBool = false;
let interval;
let collision;
let paddle;
let collisionDirection;
const colors = [];
const clamp = (val, min = 0, max = 650) => Math.max(min, Math.min(max, val));

function isNear(circle1, circle2) {
    if (circle1.position.x + circle1.radius <= circle2.position.x + radius && circle1.position.x - circle1.radius >= circle2.position.x - radius && circle1.position.y - circle1.radius <= circle2.position.y + circle2.radius) {
        return true;
    }
    return false;
}
//create canvas context once content is loaded; make game not start until canvas is clicked
document.addEventListener("DOMContentLoaded", function() {
    canvas = document.getElementById("html-canvas");  
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    context = canvas.getContext("2d");
    let x = radius;
    let y = radius;
    for (let i = 0; i < 42; i++){
        colors.push(getRandomColor());
    }
    initCircles();
canvas.addEventListener("click", () => { moveCircleBool = true; })
}, false);

//rect for the paddle
const rect = { 
    x: 300,
    y: 475,
    width: 100,
    height: 25
}

class Vector2 {
    constructor({position}) {
        this.position = position
    }
}

function getDistance(one, two) {
    const distanceX = one.position.x - two.position.x;
    const distanceY = two.position.y - one.position.y;
    return new Vector2({
        position: {
            x: distanceX,
            y: distanceY
        }
    })
}

//class to create all the target circles in the game as well as the moving circle
class circle  {
    constructor({ position, velocity, radius, color }) {
        this.position = position
        this.velocity = velocity 
        this.radius = radius
        this.color = color;
    }
    draw() {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.stroke();
    }
    update() {
        this.position.x = clamp(this.position.x + this.velocity.x, 0, 700);
        this.position.y = clamp(this.position.y + this.velocity.y, 0, 500);
        //console.log("x: " + this.position.x + " y: " + this.position.y);
    }
}
//this is the moving circle
const gameCircle = new circle( {
    position: {
        x: 350,
        y: 250
    },
    velocity: {
        x: 0,
        y: 0
    },
    radius: 17,
    color: 'white'
})
//initialize circles array and draw , called once
function initCircles() {
    let x = radius;
    let y = radius;
    for (let i = 0; i < 14; i++) {
        circles[i] = new circle({
        position:{
            x: x,
            y: y
        }, 
        velocity: { 
            x:0,
            y:0
        }, 
        radius:25, 
        color: colors[i] });
        circles[i].draw();
        x += radius * 2
}
y += radius * 2;
x = radius;
for (let i = 14; i < 28; i++) {
    circles[i] = new circle({
        position:{
            x: x,
            y: y
        }, 
        velocity: { 
            x:0,
            y:0
        }, 
        radius:25, 
        color: colors[i] });
        circles[i].draw();
    x += radius * 2;
}
y+=radius * 2;
x = radius;
for (let i = 28; i < 42; i++) {
    circles[i] = new circle({
        position:{
            x: x,
            y: y
        }, 
        velocity: { 
            x:0,
            y:0
        }, 
        radius:25, 
        color: colors[i] });
        circles[i].draw();
x += radius * 2;
}
}
//draw all circles at top of game window
function DrawCircles() {
    for (let i = 0; i < circles.length; i++) {
        if (circles[i] != null) {
        circles[i].draw();
        }
    }
}
function destroyCircle(circle) {
    context.clearRect(circle.position.x, circle.position.y, circle.radius, circle.radius);
}
//draw paddle based on values from rect
function DrawRectangle(x) {
    canvas = document.getElementById("html-canvas")
    context = canvas.getContext('2d');
    context.beginPath();
    context.strokeStyle = '#000000';
    context.lineWidth = 1;
    context.fillStyle = '#FFFFFF'
    context.rect(clamp(x), rect.y, rect.width, rect.height);
    
    context.closePath();
    context.fill();
    rect.x = x;
}
//continuously wipe clean and redraw the game window
function animate() {
    context.clearRect(0, 0, 700, 500);
    if (moveCircleBool) {
        if (gameStart) {
            gameCircle.velocity.y = 2;
            gameCircle.velocity.x = 1;
        }
        checkCollision();
        checkCircleCollision();
         gameCircle.update();
     }
    gameCircle.draw();
    DrawCircles();
    DrawRectangle(rect.x);
    window.onmousemove = (e) => DrawRectangle(clamp((canvas.clientWidth / canvas.clientHeight) * e.x / 2, 0, 600));
}
const animation = setInterval(animate, 10);

function getRandomColor() {
    var chars = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
        color += chars[Math.floor(Math.random() * 16)];
    }
    if (tinycolor(color).getBrightness() < 100) {
        return tinycolor(color).lighten(25).toString();
    }
    else if (tinycolor(color).getBrightness() > 220) {
        return tinycolor(color).darken(25).toString();
    }
    return color;
}
function checkCircleCollision() {
    if (gameCircle.velocity.y < 0) {
        for(let i = 0; i < circles.length; i++) {
            if (circles[i] != null) {
                if (isNear(gameCircle, circles[i])) {
                    gameCircle.velocity.y = 3;
                    destroyCircle(circles[i]);
                    circles[i] = null;
                }
            }
        }
    }
}
function checkCollision() {
    //if middle of circle is in between left side x and right side x of paddle, change y direction 
    if (gameCircle.position.x >= rect.x && gameCircle.position.x < rect.x + rect.width && gameCircle.position.y + gameCircle.radius >= rect.y) {
        gameStart = false;
        gameCircle.velocity.y = -3;
    }
    //if right side of circle hits between top and bottom of paddle on left side, change x and slightly change y
    if (gameCircle.position.x + gameCircle.radius >= rect.x && gameCircle.position.x <= rect.x && gameCircle.position.y >= rect.y) {
        gameStart = false;
        gameCircle.velocity.x = -3;
        gameCircle.velocity.y = -3;
    }
    //if left side of circle hits between top and bottom of paddle on right side, change x and slightly change y
    if (gameCircle.position.x - gameCircle.radius <= rect.x + rect.width && gameCircle.position.y >= rect.y && gameCircle.position.x >= rect.x + rect.width) {
        gameStart = false; 
        gameCircle.velocity.x = 3;
        gameCircle.velocity.y = -3;
    }
    //if circle hits right side of canvas, change direction
    if (gameCircle.position.x + gameCircle.radius >= canvas.clientWidth) {
        gameCircle.velocity.x = -3;
    }
    //if circle hits left side of canvas, change direction
    if (gameCircle.position.x - gameCircle.radius <= 0) {
        gameCircle.velocity.x = 3;
    }
    //if circle hits top of canvas, change direction
    if (gameCircle.position.y - gameCircle.radius <= 0) {
        gameCircle.velocity.y = 3;
    }
    if (gameCircle.position.y >= 500) {
        clearInterval(animation);
    }
}