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


/*FONCTIONS DE L'ACCÉLÉRATEUR*/

//objet accélérateur
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

//fonction qui convetit les degrés en radiant pour la fonction arc()
const degTorad = function (degrees) {
    return degrees * Math.PI / 180;
}

function SpeedCounter (config) {
	this.x = config.x || 0;
	this.y = config.y || 0;
    this.radius = config.radius || 200;
	this.backgroundColor = config.color || 'rgb(0, 0, 0)';
	this.graduationColor = config.color || 'rgb(255, 255, 255)';
};

SpeedCounter.prototype.draw = function() {
    ctxS.fillStyle = this.backgroundColor;
    ctxS.arc(this.x + widthS/2, this.y + heightS/2, this.radius, degTorad(180), degTorad(360));
    ctxS.fill();
}

/*APPEL DES FONCTIONS*/
let accelerator = new Accelerator({});
let speedCoutner = new SpeedCounter({});

//dessin de la pédale en mode repos
accelerator.drawRelease();
canvasAccelerator.addEventListener('mousedown', (e) => {
        accelerator.drawPressed();
});

canvasAccelerator.addEventListener('mouseup', (e) => {
        accelerator.drawRelease();
});

speedCoutner.draw();