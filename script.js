/*DECLARATION VARIABLE*/

//Le canvas de l'accélérateur
const canvasAccelerator = document.querySelector("#accélérateur");
const widthA = canvasAccelerator.width = 150;
const heightA = canvasAccelerator.height = 400;
const ctxA = canvasAccelerator.getContext('2d');

//Le canvas du cadran de vitesse
const canvasSpeedCounter = document.querySelector("#cadranVitesse");
const ctxS = canvasSpeedCounter.getContext('2d');
const widthS = canvasSpeedCounter.width = 600;
const heightS = canvasSpeedCounter.height = 400;


/*OBJECT ACCELERATOR*/

function Accelerator(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 150;
    this.height = config.height || 340;
    this.upperIronColor = config.color || 'rgb(127, 140, 141)';
    this.ironColor = config.color || 'rgb(149, 165, 166)';
    this.gripColor = config.color || 'rgb(44, 62, 80)';
    this.strokeColor = config.color || 'rgb(0, 0, 0)';
}

Accelerator.prototype.drawRelease = function () {
    //Rafraichissement du fond
    ctxA.fillStyle = 'rgb(255, 255 , 255)';
    ctxA.fillRect(this.x, this.y, widthA, heightA);

    //La tige de la pédale d'accélérateur

    //Le rectangle avec remplissage sans trait
    ctxA.fillStyle = this.upperIronColor;
    ctxA.fillRect(this.x + this.width / 3, this.y, this.width / 3, 400 - this.height);

    //Le rectangle en trait sans remplissage
    ctxA.strokeStyle = this.strokeColor;
    ctxA.lineWidth = 2.5;
    ctxA.strokeRect(this.x + this.width / 3, this.y, this.width / 3, 400 - this.height);

    //La surface d'appui de la pédale d'accélérateur

    //Le rectangle sans trait avec remplissage
    ctxA.fillStyle = this.ironColor;
    ctxA.fillRect(this.x, this.y + (400 - this.height), this.width, this.height);

    //Le rectangle en trait sans remplissage
    ctxA.strokeStyle = 'rgb(0, 0, 0)';
    ctxA.lineWidth = 3;
    ctxA.strokeRect(this.x + 2.5, this.y + (400 - this.height), this.width - 4, this.height - 1);

    //La surface d'adérance de la pédale.
    ctxA.fillStyle = this.gripColor;
    for (let i = 0; i < 7; i++) {
        ctxA.beginPath();
        let x = 20;
        let step = 42;
        ctxA.moveTo(x, (400 - this.height) + 43 + step * i);
        ctxA.lineTo(x + 110, (400 - this.height) + 43 + step * i);
        ctxA.lineTo(x + 110, (400 - this.height) + 43 + step * i + 4);
        ctxA.lineTo(x, (400 - this.height) + 43 + step * i + 4);
        ctxA.fill();
    }
}

Accelerator.prototype.drawPressed = function () {
    //Rafraichissement du fond
    ctxA.fillStyle = 'rgb(255, 255 , 255)';
    ctxA.fillRect(this.x, this.y, widthA, heightA);

    //La tige de la pédale d'accélérateur

    //Le rectangle avec remplissage sans trait
    ctxA.fillStyle = this.upperIronColor;
    ctxA.beginPath();
    ctxA.moveTo(48, 0);
    ctxA.lineTo(98, 0);
    ctxA.lineTo(100, 45);
    ctxA.lineTo(48, 45);
    ctxA.lineTo(50, 0);
    ctxA.fill();

    //Le rectangle en trait sans remplissage
    ctxA.strokeStyle = 'rgb(0, 0, 0)';
    ctxA.lineWidth = 2.5;
    ctxA.beginPath();
    ctxA.moveTo(99, 0);
    ctxA.lineTo(100, 45);
    ctxA.lineTo(50, 45);
    ctxA.lineTo(52, 0);
    ctxA.stroke();

    //La surface d'appui de la pédale d'accélérateur

    //Le rectangle sans trait avec remplissage
    ctxA.fillStyle = this.ironColor;
    ctxA.lineWidth = 3;
    ctxA.moveTo(101, 45);
    ctxA.lineTo(145, 45);
    ctxA.lineTo(147, 370);
    ctxA.lineTo(3, 370);
    ctxA.lineTo(5, 45);
    ctxA.lineTo(101, 45);
    ctxA.fill();

    //Le rectangle en trait sans remplissage
    ctxA.strokeStyle = 'rgb(0, 0, 0)';
    ctxA.lineWidth = 3;
    ctxA.moveTo(101, 45);
    ctxA.lineTo(145, 45);
    ctxA.lineTo(147, 370);
    ctxA.lineTo(3, 370);
    ctxA.lineTo(5, 45);
    ctxA.lineTo(101, 45);
    ctxA.stroke();

    //La surface d'adérance de la pédale.
    ctxA.fillStyle = this.gripColor;
    for (let i = 0; i < 7; i++) {
        ctxA.beginPath();
        let x = 20;
        let step = 42;
        ctxA.moveTo(x, 83 + step * i);
        ctxA.lineTo(x + 110, 83 + step * i);
        ctxA.lineTo(x + 110, 83 + step * i + 4);
        ctxA.lineTo(x, 83 + step * i + 4);
        ctxA.fill();
    }
}

/*
OBJET SPEEDCOUNTER
*/

function SpeedCounter(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.radius = config.radius || 200;
    this.backgroundColor = config.color || 'rgb(0, 0, 0)';
    this.graduationColor = config.color || 'rgb(255, 255, 255)';
    this.nbGraduation = config.nbGraduation || 9;
    this.angleGraduation = config.angleGraduation || 180 / this.nbGraduation;
    this.pointerColor = config.pointerColor || 'rgb(255, 0, 0)';
    this.pointerRadius = config.pointerRadius || 20;
};

SpeedCounter.prototype.draw = function () {
    // Fond du cadran
    ctxS.fillStyle = this.backgroundColor;
    ctxS.fillRect(this.x+ widthS/2 - this.radius, this.y + heightS/2, this.radius*2, 30);
    ctxS.beginPath();
    ctxS.arc(this.x + widthS / 2, this.y + heightS / 2, this.radius, degToRad(180), degToRad(360));
    ctxS.fill();

    // Dessin de la graduation
    for (let j = 0; j < 4; j++) {// Permet de faire traits
        for (let i = 1; i < this.nbGraduation; i++) {// Place les traits à équidistance et selon un certain angle et rayon
            ctxS.fillStyle = this.graduationColor;
            ctxS.beginPath();
            // this.x + width/2 permet d'être au centre du cercle, même chose pour y. j permet le décalage est donc les "traits".
            ctxS.arc(this.x + widthS / 2 + distanceInFromCircle('x', this.radius - 30 + j * 2, this.angleGraduation * i), this.y + heightS / 2 + distanceInFromCircle('y', this.radius - 30 + j * 2, this.angleGraduation * i), 2, degToRad(0), degToRad(360));
            ctxS.fill();
        }
    }

    // Dessin de l'aiguille
    //La forme de l'aiguille
    // Le cercle de base
    ctxS.fillStyle = this.pointerColor;
    ctxS.beginPath();
    ctxS.arc(this.x + widthS/2, this.y + heightS/2, this.pointerRadius, degToRad(0), degToRad(360));
    ctxS.fill();
    // La pointe
    let distance = this.widthPointer(this.angleGraduation, this.pointerRadius, 3);
    let Cx = this.x + widthS/2;
    let Cy = this.y + heightS/2;
    ctxS.fillStyle = this.pointerColor;
    ctxS.beginPath();
    // On se place à la fin du triangle
    ctxS.moveTo(distance[distance.length - 1].x + Cx, distance[distance.length-1].y + Cy);
    for (let i=0 ; i<distance.length ; i++){
        console.log("x: "+distance[i].x);
        console.log("y: "+distance[i].y);
        ctxS.lineTo(distance[i].x + Cx, distance[i].y + Cy);
    }
    ctxS.fill();
    //L'axe de rotation de l'aiguille
    ctxS.fillStyle = 'rgb(255, 255, 255)';
    ctxS.beginPath();
    ctxS.arc(this.x + widthS/2, this.y + heightS/2, 6, degToRad(0), degToRad(360));
    ctxS.fill();

}

SpeedCounter.prototype.widthPointer = function(angle, radius, nbPoints){
    let points = [];
    angle = angle + 180;
    for (let i=0; i<nbPoints ; i++){
        points.push({x: 0, y: 0});
    }
    let angleWidth = 90;
    // Le point le plus bas
    points[0] = {x: radius * Math.cos(degToRad(angleWidth - angle)),y: radius * Math.sin(degToRad(angleWidth - angle))};
    // Le point au millieu
    points[1] = {x: (radius + 100 )* Math.cos(degToRad(angle)), y: (radius + 100) * Math.sin(degToRad(angle))};
    // Le point le plus haut
    points[2] = {x: radius * Math.cos(degToRad(angleWidth + angle)), y: radius * Math.sin(degToRad(angleWidth + angleWidth))};
    return points;
}

/*FONCTIONS GENERALES*/

// convertit les degrés en radiant pour la fonction arc()
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

// Calcul la distance en x ou y pour suivre le cercle.
function distanceInFromCircle(c, radius, degrees) {
    //Si l'axe demandé est x
    if (c === "x") {
        return radius * Math.cos(degToRad(180 + degrees));
    } else {
        return radius * Math.sin(degToRad(180 + degrees));
    }
}

/*APPEL DES FONCTIONS*/
let accelerator = new Accelerator({});
let speedCoutner = new SpeedCounter({});

//dessin de la pédale en mode repos
accelerator.drawRelease();

// gestion animation de la pédale d'accélérateur
canvasAccelerator.addEventListener('mousedown', (e) => {
    accelerator.drawPressed();
});

canvasAccelerator.addEventListener('mouseup', (e) => {
    accelerator.drawRelease();
});

speedCoutner.draw();