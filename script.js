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

function Accelerator (config) {
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
    ctxA.fillRect(this.x + this.width/3, this.y, this.width/3, 400 - this.height);

    //Le rectangle en trait sans remplissage
    ctxA.strokeStyle = this.strokeColor;
    ctxA.lineWidth = 2.5;
    ctxA.strokeRect(this.x + this.width/3, this.y, this.width/3, 400 - this.height);

    //La surface d'appui de la pédale d'accélérateur

    //Le rectangle sans trait avec remplissage
    ctxA.fillStyle = this.ironColor;
    ctxA.fillRect(this.x, this.y + (400 - this.height), this.width,  this.height);
    
    //Le rectangle en trait sans remplissage
    ctxA.strokeStyle = 'rgb(0, 0, 0)';
    ctxA.lineWidth = 3;
    ctxA.strokeRect(this.x + 2.5, this.y + (400 - this.height), this.width - 4,  this.height - 1);

    //La surface d'adérance de la pédale.
    ctxA.fillStyle = this.gripColor;
    for (let i = 0; i < 7; i ++){
        ctxA.beginPath();
        let x = 20;
        let step = 42;
        ctxA.moveTo(x,   (400 - this.height) + 43 + step * i);
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
    for (let i = 0; i < 7; i ++){
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

function SpeedCounter (config) {
	this.x = config.x || 0;
	this.y = config.y || 0;
    this.radius = config.radius || 200;
	this.backgroundColor = config.color || 'rgb(0, 0, 0)';
	this.graduationColor = config.color || 'rgb(255, 255, 255)';
    this.nbGraduation = config.nbGraduation || 6;
    this.angleGraduation = config.angleGraduation || 180/this.nbGraduation;
};

SpeedCounter.prototype.draw = function() {
    // Fond du cadran
    ctxS.fillStyle = this.backgroundColor;
    ctxS.beginPath();
    ctxS.arc(this.x + widthS/2, this.y + heightS/2, this.radius, degToRad(180), degToRad(360));
    ctxS.fill();
    
    // Premier point de la graduation
    for (let i=0 ; i<7 ; i++){
        let diagonal = distanceDiagonal(this.radius - 30, this.angleGraduation * i);
        ctxS.fillStyle = 'rgb(255, 0, 0)';
        ctxS.beginPath();
        ctxS.arc(this.x + widthS/2 - this.radius + distanceIn("x", this.angleGraduation, diagonal), this.y + heightS/2 - distanceIn("y", this.angleGraduation, diagonal), 5, degToRad(0), degToRad(360)); // placer les ronds tous les 20 degrés
        ctxS.fill();
    }

}

/*FONCTIONS GENERALES*/

// convertit les degrés en radiant pour la fonction arc()
function degToRad (degrees) {
    return degrees * Math.PI / 180;
}

// calcule la distance en diagonale dans un secteur
function  distanceDiagonal(radius, degrees){
    return Math.sin(degToRad(degrees/2)) * radius * 2; // Calcul le dernier côté du triangle isocèle, côté AB, triangle ABO isocèle
}

// calcule la distance en X en fonction de la diagonale
function distanceIn(c, degrees, diagonal){
    let radian = degToRad((180 - degrees)/2);
    if (c === "x"){
        // A commenter + plus schéma ?
        return Math.cos(radian) * diagonal;
    }else{
        return Math.sin(radian) * diagonal;
    }
}

// PS: Condencé les deux fonctions de distance

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