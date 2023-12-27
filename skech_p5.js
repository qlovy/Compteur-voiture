/*
Je vais créer la page HTML avec p5.js à part pour l'image car cela demande un web server.
*/

let h1, canvas, width = 1000, height = 500;

function setup() {
    canvas = createCanvas(width, height);
    canvas.position(500, 200, 'fixed');
}
function draw(){
    canvas.background(200);
}