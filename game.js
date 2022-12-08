const Crafty = require("craftyjs/src/core/core");

//let tinycolor = require('tinycolor2');
let context = '';
let canvas = '';
const circles = [];
const radius = 25;
Crafty.init(500,700);

document.addEventListener("DOMContentLoaded", function() {
    canvas = document.getElementById("html-canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    context = canvas.getContext("2d");
    let x = radius;
    let y = radius;
    for (let i = 0; i <= 14; i++) {
        const circle = DrawCircle(x, y, radius, 1, '#000000', getRandomColor());
        circles.push(circle);
        x += radius * 2;
    }
    y += radius * 2;
    x = radius;
    for (let i = 0; i <= canvas.width / (radius * 2); i++) {
        const circle = DrawCircle(x, y, radius, 1, '#000000', getRandomColor());
        circles.push(circle);
        x += radius * 2;
    }
    y+=radius * 2;
    x = radius;
    for (let i = 0; i < canvas.width / (radius * 2); i++) {
        const circle = DrawCircle(x, y, radius, 1, '#000000', getRandomColor());
        circles.push(circle);
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

        //const c = color.substring(1); //strip #
        // const rgb = parseInt(color, 16); //convert rrggbb to decimal
        // const r = (rgb >> 16) & 0xff; //extract red
        // const g = (rgb >> 8) & 0xff; //extract green
        // const b = (rgb >> 0) & 0xff; //extract blue
        // const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; //get brightness value
        // tinycolor.init();
        // console.log(tinycolor(color).getBrightness());
        return color;
    }