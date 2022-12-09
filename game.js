let canvas = '';
let context = '';
const circles = [];
const radius = 25;
let gameStart = true;
let interval;
let collision;
let paddle;
let collisionDirection;
const clamp = (val, min = 0, max = 650) => Math.max(min, Math.min(max, val));

document.addEventListener("DOMContentLoaded", function() {
    canvas = document.getElementById("html-canvas");  
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    context = canvas.getContext("2d");
    let x = radius;
    let y = radius;
    for (let i = 0; i <= 14; i++) {
        DrawCircles(x, y, radius, 1, '#000000', getRandomColor());
        circles.push({x:x, y:y});
        x += radius * 2;
    }
    y += radius * 2;
    x = radius;
    for (let i = 0; i <= canvas.width / (radius * 2); i++) {
        DrawCircles(x, y, radius, 1, '#000000', getRandomColor());
        circles.push({x:x, y:y});
        x += radius * 2;
    }
    y+=radius * 2;
    x = radius;
    for (let i = 0; i < canvas.width / (radius * 2); i++) {
        DrawCircles(x, y, radius, 1, '#000000', getRandomColor());
        circles.push({x:x, y:y});
        x += radius * 2;
    }
    x = 350;
    y = 250;
    drawCircle(x, y, radius - 8, 1, '#000000', '#FFFFFF');
    DrawRectangle(rect.x);
canvas.addEventListener('click', () => interval = setInterval(moveCircle, 50));

}, false);

let rect = { 
    x: 300,
    y: 475,
    width: 100,
    height: 25
}

const circle = {
    radius: 17,
    x: 350,
    y: 250,
    direction: {
        x: 0,
        y: 0
    }
}

function DrawCircles(x, y, radius, border_size, border_colour, fill_colour) {
    context.beginPath();
    context.arc(x,y,radius,0,2*Math.PI);
    //context.clip();
    context.strokeStyle = border_colour;
    context.fillStyle = fill_colour;
    context.lineWidth = border_size;
    context.closePath();
    context.fill();
    context.stroke();
    }
function drawCircle() {
    context.clearRect(0, 475, 700, -325);
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
    context.strokeStyle = '#000000';
    context.lineWidth = 1;
    context.fillStyle = '#FFFFFF';
    context.closePath();
    context.fill();
    context.stroke();
}
function DrawRectangle(x) {
    canvas = document.getElementById("html-canvas")
    context = canvas.getContext('2d');
    context.clearRect(0, rect.y, 700, rect.height);
    context.beginPath();
    context.strokeStyle = '#000000';
    context.lineWidth = 1;
    context.fillStyle = '#FFFFFF'
    context.rect(clamp(x), rect.y, rect.width, rect.height);
    context.closePath();
    context.fill();
}

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

function movePaddle()
 {
    window.onmousemove = (e) => DrawRectangle(clamp(canvas.clientWidth / canvas.clientHeight) * e.x);
 }
 movePaddle();
 function moveCircle(){
    if (gameStart) {
        circle.y += radius / 2;
        circle.y = clamp(circle.y, 0, 475);
    }
    if (collision) {
        gameStart = false;
        collisionDirection = {x: circle.x - rect.x, y: circle.y - rect.y }
    }
    if (!gameStart){
    console.log("x: " + collisionDirection.x + " y: " + collisionDirection.y);

        if (collisionDirection.x >= 0) {
            circle.x += radius / 2;
            circle.x = clamp(circle.x, 0, 675);
        }
        if (collisionDirection.y >= 0) {
            circle.y -= radius / 2;
            circle.y = clamp(circle.y, 0, 475);
        }
        if (collisionDirection.x < 0) {
            circle.x -= radius / 2;
            circle.x = clamp(circle.x, 0, 675)
        }
        if (collisionDirection.y < 0) {
            circle.y += radius / 2;
            circle.y = clamp(circle.y, 0, 475);
        }
    }
    drawCircle();
    //checkPaddleCollision();
 }
 
 
function checkCircleCollision() {
    for (let i = 0; i < circles.length - 1; i++) {
        if (Math.abs(circles[i].x - circle.x) >= (circles[i].radius + circle.radius)) {
            if (Math.abs(circles[i]. y - circle.y) >= (circles[i].radius + circle.radius)) {
                collision = true;

            }
        }
    }
}

function checkPaddleCollision() {
    const distX = Math.abs(circle.x - rect.x - rect.width / 2);
    const distY = Math.abs(circle.y - rect.y - rect.height / 2);
    if (distX > (rect.width / 2 + circle.radius)) { collision =  false; }
    if (distY > (rect.width / 2 + circle.radius)) { collision = false; }

    if (distX <= (rect.width/2)) { collision = true; }
    if (distY <= (rect.width/2)) { collision = true; }

    const dx = distX - rect.width / 2;
    const dy = distY - rect.height / 2;
    collision = (dx*dx*dy*dy <= (circle.radius * circle.radius));
}
const collisionInterval = setInterval(checkPaddleCollision, 10);