/*
* L'objet de l'accélérateur
* */
function Accelerator(config) {
    //Le canvas
    this.canvas = document.querySelector("#accélérateur");
    this.width = this.canvas.width = config.width || 300;
    this.height = this.canvas.height = config.height || 400;
    this.ctx = this.canvas.getContext('2d');

    // les cordonnées de référence
    this.x = config.x || 0;
    this.y = config.y || 0;

    // les couleurs des différents éléments
    this.upperIronColor = config.color || 'rgb(127, 140, 141)'; // PS: passer de rgb à hexa
    this.ironColor = config.color || 'rgb(149, 165, 166)';
    this.gripColor = config.color || 'rgb(44, 62, 80)';
}

Accelerator.prototype.rectangle = function (type) {
    if (type === 'f')
        // rectangle qui fait la dimension du canvas
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    else
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
}

Accelerator.prototype.drawRelease = function () {
    let lineWidth = 6;
    let scale = 1 / 4;
    //Rafraichissement du fond
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.rectangle('f');

    // La tige
    this.ctx.save();    // sauvegarde l'état du canvas
    this.ctx.fillStyle = this.upperIronColor;   // change la couleur de remplissage
    this.ctx.lineWidth = lineWidth; // l'épaisseur des lignes
    this.ctx.translate(this.width / 2 - this.width / 2 * scale, lineWidth);
    this.ctx.scale(scale, scale);   // mise à l'échelle du système d'axe en x et y.
    this.rectangle('f');    // dessine le rectangle en couleur avec le nouveau système d'axe
    this.rectangle('s');    // dessine le rectangle avec des lignes
    this.ctx.restore(); // rétablit le dernier état du canvas

    // la pédale
    this.ctx.save();
    lineWidth = 1.5;
    let w = 180;
    let h = 300;
    this.ctx.fillStyle = this.ironColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.translate(this.width / 2 - w / 2, this.height / 2 - h / 3);
    this.ctx.fillRect(this.x, this.y, w, h - lineWidth);
    this.ctx.strokeRect(this.x, this.y, w, h - lineWidth);

    // la surface d'adhérence de la pédale
    lineWidth = 2;
    let pas = 40;
    this.ctx.lineWidth = lineWidth;
    for (let i = 0; i < 7; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(20, 30 + pas * i);
        this.ctx.lineTo(w - 20, 30 + pas * i);
        this.ctx.stroke();
    }
    this.ctx.restore();
}

Accelerator.prototype.drawPressed = function () {
    let lineWidth = 6;
    let scale = 1 / 4;
    //Rafraichissement du fond
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.rectangle('f');

    // La tige
    this.ctx.save();    // sauvegarde l'état du canvas
    this.ctx.fillStyle = this.upperIronColor;   // change la couleur de remplissage
    this.ctx.lineWidth = lineWidth; // l'épaisseur des lignes
    this.ctx.translate(this.width / 2 - this.width / 2 * scale, lineWidth);
    this.ctx.scale(scale, scale);   // mise à l'échelle du système d'axe en x et y.
    this.rectangle('f');    // dessine le rectangle en couleur avec le nouveau système d'axe
    this.rectangle('s');    // dessine le rectangle avec des lignes
    this.ctx.restore(); // rétablit le dernier état du canvas

    // la pédale
    this.ctx.save();
    lineWidth = 1.5;
    let w = 180;
    let h = 300;
    this.ctx.fillStyle = this.ironColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.translate(this.width / 2 - w / 2, this.height / 2 - h / 2);
    this.ctx.fillRect(this.x, this.y, w, h - lineWidth);
    this.ctx.strokeRect(this.x, this.y, w, h - lineWidth);

    // la surface d'adhérence de la pédale
    lineWidth = 2;
    let pas = 40;
    this.ctx.lineWidth = lineWidth;
    for (let i = 0; i < 7; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(20, 30 + pas * i);
        this.ctx.lineTo(w - 20, 30 + pas * i);
        this.ctx.stroke();
    }
    this.ctx.restore();
}