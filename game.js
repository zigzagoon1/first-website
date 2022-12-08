let context = '';
let canvas = '';
const circles = [];
const radius = 25;
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
    for (let i = 0; i <= 14; i++) {
        DrawCircle(x, y, radius, 1, '#000000', getRandomColor());
        x += radius * 2;
    }

}, false);

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

    function getRandomColor() {
        var chars = '0123456789ABCDEF';
        var color = '#';
        for (let i = 0; i < 6; i++) {
            color += chars[Math.floor(Math.random() * 16)];
        }
        return color;
    }


;//DrawCircle(150, 100, 50, 100, '#000000', '#111111');

// function draw() {

//     circles.forEach(function (circle) {
//         DrawCircle(circle.x, circle.y, radius, 5, circle.colour, circle.color);
//     })
    
// }