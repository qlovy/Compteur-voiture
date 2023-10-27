/*DECLARATION VARIABLE*/

//Le canvas de l'accélérateur
const canvasAccelerator = document.querySelector("#accélérateur");
const widthA = canvasAccelerator.width = 150;
const heightA = canvasAccelerator.height = 400;
const ctxA = canvasAccelerator.getContext('2d');

//Le canvas du cadran de vitesse
const canvasSpeedCounter = document.querySelector("#cadranVitesse");
const ctxS = canvasSpeedCounter.getContext('2d');

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
}

Accelerator.prototype.drawRelease = function () {
    //La tige de la pédale d'accélérateur
    ctxA.fillStyle = this.upperIronColor;
    ctxA.fillRect(this.x + this.width/3, this.y, this.width/3, 400 - this.height);

    //La surface d'appui de la pédale d'accélérateur
    ctxA.fillStyle = this.ironColor;
    ctxA.fillRect(this.x, this.y + (400 - this.height), this.width,  this.height);

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

/*APPEL DES FONCTIONS*/
let accelerator = new Accelerator({});
accelerator.drawRelease();