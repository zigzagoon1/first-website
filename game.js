let canvas = '';
let context = '';
const circles = [];
const radius = 25;

const clamp = (val, min = 0, max = 600) => Math.max(min, Math.min(max, val));

document.addEventListener("DOMContentLoaded", function() {
    canvas = document.getElementById("html-canvas");  
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    context = canvas.getContext("2d");
    let x = radius;
    let y = radius;
    for (let i = 0; i <= 14; i++) {
        DrawCircle(x, y, radius, 1, '#000000', getRandomColor());
        x += radius * 2;
    }
    y += radius * 2;
    x = radius;
    for (let i = 0; i <= canvas.width / (radius * 2); i++) {
        DrawCircle(x, y, radius, 1, '#000000', getRandomColor());
        x += radius * 2;
    }
    y+=radius * 2;
    x = radius;
    for (let i = 0; i < canvas.width / (radius * 2); i++) {
        DrawCircle(x, y, radius, 1, '#000000', getRandomColor());
        x += radius * 2;
    }
    x = 350;
    y = 250;
    DrawCircle(x, y, radius - 8, 1, '#000000', '#FFFFFF');
    DrawRectangle(x);
}, false);

let rect = { 
    x: 300,
    y: 475,
    width: 100,
    height: 25
}

function DrawCircle(x, y, radius, border_size, border_colour, fill_colour) {
    context.beginPath();
    context.arc(x,y,radius,0,2*Math.PI);
    context.strokeStyle = border_colour;
    context.fillStyle = fill_colour;
    context.lineWidth = border_size;
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
    window.onmousemove = (e) => DrawRectangle(clamp(canvas.clientWidth/ canvas.clientHeight) * e.x); //x = clamp(canvas.clientWidth / canvas.clientWidth) * e.x;
    //requestAnimationFrame(DrawRectangle);
    
 }
 movePaddle();
 
function checkCircleCollision() {

}

function checkPaddleCollision() {

}