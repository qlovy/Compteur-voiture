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
}

SpeedCounter.prototype.draw = function () {
    // Fond du cadran
    this.ctx.fillStyle = this.backgroundColor;
    // le haut du cadran
    this.ctx.beginPath();
    this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius, degToRad(180), degToRad(360));
    this.ctx.fill();
    // le bas du cadran
    this.ctx.fillRect(this.x + this.width/2 - this.radius, this.y + this.height/2, this.radius*2, 30);

    this.ctx.save();
    this.ctx.fillStyle = this.pointerColor;
    this.ctx.translate(120, 200);
    for (let i=0; i<3; i++){    // regarder exemple Khan academy
        this.ctx.rotate(Math.PI/180 * this.angleGraduation);
        this.ctx.fillRect(0, 0, 15, 5);
    }
    this.ctx.restore();


    /*
    // Dessin de la graduation, PS: faire de chaque côté du curseur
    for (let j = 0; j < 4; j++) {// Permet de faire traits
        for (let i = 1; i < this.nbGraduation; i++) {// Place les traits à équidistance et selon un certain angle et rayon
            this.ctx.fillStyle = this.graduationColor;
            this.ctx.beginPath();
            // this.x + width/2 permet d'être au centre du cercle, même chose pour y. j permet le décalage est donc les "traits".
            this.ctx.arc(this.x + this.width / 2 + distanceInFromCircle('x', this.radius - 30 + j * 2, this.angleGraduation * i), this.y + this.height / 2 + distanceInFromCircle('y', this.radius - 30 + j * 2, this.angleGraduation * i), 2, degToRad(0), degToRad(360));
            this.ctx.fill();
        }
    }*/
    /*
    // Dessin de l'aiguille
    //La forme de l'aiguille
    // Le cercle de base
    this.ctx.fillStyle = this.pointerColor;
    this.ctx.beginPath();
    this.ctx.arc(this.x + this.width/2, this.y + this.height/2, this.pointerRadius, degToRad(0), degToRad(360));
    this.ctx.fill();
    // La pointe
    this.ctx.beginPath();
    this.ctx.moveTo(this.width/2, this.height/2);
    this.ctx.lineTo(this.width/2, this.height/2 + this.pointerRadius);
    this.ctx.lineTo(this.width/2 - this.radius + 50, this.height/2);
    this.ctx.lineTo(this.width/2, this.height/2 - this.pointerRadius);
    this.ctx.lineTo(this.width/2, this.height/2);
    this.ctx.fill();
    //L'axe de rotation de l'aiguille
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.beginPath();
    this.ctx.arc(this.x + this.width/2, this.y + this.height/2, 6, degToRad(0), degToRad(360));
    this.ctx.fill();
    */
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