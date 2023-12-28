function SpeedCounter(config) {
    // le canvas
    this.canvas = document.querySelector("#cadranVitesse");
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = 600;
    this.height = this.canvas.height = 400;
    // les cordonnées de référence
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