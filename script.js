/*DECLARATION VARIABLE*/



//Le canvas du cadran de vitesse
const canvasSpeedCounter = document.querySelector("#cadranVitesse");
const ctxS = canvasSpeedCounter.getContext('2d');
const widthS = canvasSpeedCounter.width = 600;
const heightS = canvasSpeedCounter.height = 400;


/*OBJECT ACCELERATOR*/



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

    // Dessin de la graduation, PS: faire de chaque côté du curseur
    for (let j = 0; j < 4; j++) {// Permet de faire traits
        for (let i = 1; i < this.nbGraduation; i++) {// Place les traits à équidistance et selon un certain angle et rayon
            ctxS.fillStyle = this.graduationColor;
            ctxS.beginPath();
            // this.x + width/2 permet d'être au centre du cercle, même chose pour y. j permet le décalage est donc les "traits".
            ctxS.arc(this.x + widthS / 2 + distanceInFromCircle('x', this.radius - 30 + j * 2, this.angleGraduation * i), this.y + heightS / 2 + distanceInFromCircle('y', this.radius - 30 + j * 2, this.angleGraduation * i), 2, degToRad(0), degToRad(360));
            ctxS.fill();
        }
    }
    //PS: Utilisé pushMatrix, translate, rotate, popMatrix ==> faire bouger le système d'axe et non la pièce

    // Dessin de l'aiguille
    //La forme de l'aiguille
    // Le cercle de base
    ctxS.fillStyle = this.pointerColor;
    ctxS.beginPath();
    ctxS.arc(this.x + widthS/2, this.y + heightS/2, this.pointerRadius, degToRad(0), degToRad(360));
    ctxS.fill();
    // La pointe
    ctxS.beginPath();
    ctxS.moveTo(widthS/2, heightS/2);
    ctxS.lineTo(widthS/2, heightS/2 + this.pointerRadius);
    ctxS.lineTo(widthS/2 - this.radius + 50, heightS/2);
    ctxS.lineTo(widthS/2, heightS/2 - this.pointerRadius);
    ctxS.lineTo(widthS/2, heightS/2);
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

window.onload = function () { accelerator.drawRelease() };

accelerator.canvas.addEventListener('mousedown', () => { accelerator.drawPressed() });
accelerator.canvas.addEventListener('mouseup', () => { accelerator.drawRelease() });

speedCoutner.draw();
