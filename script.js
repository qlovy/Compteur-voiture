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

// Au chargement de la page, on dessine les éléments en position initiale
window.onload = function () { 
    accelerator.drawRelease();
    speedCoutner.drawRelease();
}

accelerator.canvas.addEventListener('mousedown', () => { 
    accelerator.drawPressed();
    speedCoutner.drawAcceleration();
})

accelerator.canvas.addEventListener('mouseup', () => { 
    accelerator.drawRelease();
    speedCoutner.drawRelease();
})