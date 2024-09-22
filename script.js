/*FONCTIONS GENERALES*/

// convertit les degrés en radiant pour la fonction arc()
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

/*APPEL DES FONCTIONS*/
const accelerator = new Accelerator({});
const speedCoutner = new SpeedCounter({});

// Au chargement de la page, on dessine les éléments en position initiale
window.onload = function () {
    accelerator.drawRelease();
    speedCoutner.drawRelease();
}

// contient le numéro de processus
let id = null;

// Quand on appuie sur la pédale d'accélérateur
accelerator.canvas.addEventListener('mousedown', () => {
    if (id === null) {
        // Défini une boucle sous form d'intervalle régulière de 100 ms
        id = setInterval(
            () => {
                accelerator.drawPressed();          // Dessin de la pédale appuyée
                speedCoutner.drawAcceleration();    // Dessin de l'aiguille qui tourne
            },
            25
        )
    }
})

accelerator.canvas.addEventListener('mouseup', () => {
    // Arrête la boucle
    clearInterval(id);
    id = null;
    accelerator.drawRelease();
    speedCoutner.drawRelease();
})