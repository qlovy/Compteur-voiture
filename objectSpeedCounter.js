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
    this.i = config.i || 0;
}

SpeedCounter.prototype.drawBackground = function () {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // Fond du cadran
    this.ctx.fillStyle = this.backgroundColor;
    // le haut du cadran
    this.ctx.beginPath();
    this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius, degToRad(180), degToRad(360));
    this.ctx.fill();
    // le bas du cadran
    this.ctx.fillRect(this.x + this.width / 2 - this.radius, this.y + this.height / 2, this.radius * 2, 30);

    // la graduation
    this.ctx.fillStyle = this.graduationColor;
    for (let i = 0; i < 10; i++) {
        this.ctx.save();
        // Math.cos et Math.sin permet de calculer la distance en x et respectivement y pour le suivit du cercle.
        this.ctx.translate(this.width / 2 + Math.cos(Math.PI / 180 * this.angleGraduation * i + Math.PI) * (this.radius - 40), this.height / 2 + Math.sin(Math.PI / 180 * this.angleGraduation * i + Math.PI) * (this.radius - 40));
        this.ctx.rotate(Math.PI / 180 * this.angleGraduation * i + Math.PI);
        this.ctx.fillRect(0, -2, 15, 5);
        this.ctx.restore();
    }
}

SpeedCounter.prototype.drawRelease = function () {
    this.i = 0;
    this.drawBackground();
    // l'aiguille
    // le cercle de base
    this.ctx.fillStyle = this.pointerColor;
    this.ctx.beginPath();
    this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.pointerRadius, degToRad(0), degToRad(360));
    this.ctx.fill();

    // la pointe
    this.ctx.save();
    this.ctx.fillStyle = this.pointerColor;
    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.fillRect(0, 0, -100, 2);
    this.ctx.restore();

    /*
    this.ctx.save();
    this.ctx.fillStyle = this.pointerColor;
    this.ctx.translate(this.width/2, this.height/2 + this.pointerRadius);// Place le système d'axe au en bas du cercle de base
    this.ctx.beginPath();
    this.ctx.lineTo(-this.radius + 60, -this.pointerRadius);// La pointe
    this.ctx.lineTo(0, -2 * this.pointerRadius);// Le point le plus haut du cercle de base
    this.ctx.lineTo(0, 0);// On complète la forme
    this.ctx.fill();
    this.ctx.restore();
    */

    // l'axe de rotation
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.beginPath();
    this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 6, degToRad(0), degToRad(360));
    this.ctx.fill();
}

SpeedCounter.prototype.drawAcceleration = function () {
    this.drawBackground();
    // l'aiguille
    // le cercle de base
    this.ctx.fillStyle = this.pointerColor;
    this.ctx.beginPath();
    this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.pointerRadius, degToRad(0), degToRad(360));
    this.ctx.fill();

    // la pointe
    let angle = degToRad(this.i + 180);
    let dx = Math.cos(angle) * 100;
    let dy = Math.sin(angle) * 100;
    this.ctx.save();
    this.ctx.fillStyle = this.pointerColor;
    this.ctx.translate(this.width / 2, this.height / 2);// Place le système d'axe au centre du cercle de base
    this.ctx.beginPath();
    this.ctx.lineTo(dx, dy);
    this.ctx.lineTo(dx + 1, dy + 1);
    this.ctx.lineTo(1, 1);
    this.ctx.lineTo(0, 0);
    this.ctx.fill();
    this.ctx.restore();

    // l'axe de rotation
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.beginPath();
    this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 6, degToRad(0), degToRad(360));
    this.ctx.fill();
    this.i = this.i + 0.1;
}