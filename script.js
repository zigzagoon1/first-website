const body = document.querySelector("#background");
console.log(document.querySelector("h1"));
let bodyBackground = body.style.background;
const randomColors = ["cadetblue","purple", "blue", "red", "pink", "yellow", "green", "cyan", "white", "orange", "brown"];
let currentIndex = randomColors[bodyBackground];
body.addEventListener("click", ChangeBackgroundColor)

function createRandomIndex(currentIndex) {
    const numColors = randomColors.length;
    let index = Math.floor(Math.random()*numColors);
    while (index === currentIndex){
        index = Math.floor(Math.random()*numColors);
    }
    return index;
}
function ChangeBackgroundColor() {
    const nextIndex = createRandomIndex(currentIndex);
    body.style.background = randomColors[nextIndex];
    currentIndex = nextIndex;
}