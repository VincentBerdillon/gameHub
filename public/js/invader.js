// ###############################################
// ################# Invader v 1.0 ###############
// #############################################
//
//
// ### Plan d'action ###
/*
 * 1 - Créer la grille
 *      - Créer une fonction qui génère une ligne
 *      - Créer une fonction qui génère une case
 *      - Créer la fonction qui génère la grille à partir des deux fonctions précédentes
 * 
 * 2 - Gérer le clic sur un pixel
 *      - Créer un écouteur d'évènement (event Handler)
 *      - Brancher les pixels avec l'écouteur d'évènement
 * 
 * 3 - Créer le formulaire
 *      - On va créer une fonction qui génère un input
 *      - On va créer une fonction qui va générer le formulaire, avec 2 inputs, mais aussi un bouton "Valider"
 *      - On va également créer un écouteur d'évent, et le brancher sur le bouton "Valider" *     
 * 
 * 4 - Un peu d'organisation
 *      - Ranger les variables dans un objet "app"
 *      - Ranger les fonctions dans cet objet
 *      - Ranger notre processus initial dans l'objet
 *      - Revoir comment on execute nos fonctions
 * 
 * 5 - La palette de couleurs
 *      - Créer une fonction qui génère ma palette, en fonction des couleurs disponibles dans app.styles
 *      - Brancher un écouteur d'event pour chacune des couleurs de la palette
 *      - Créer un écouteur d'event pour le choix de couleur
 *      
 */


const app = {

    //* ####################
    //* --- Variables ---
    //* ####################

    GRID_SIZE: 8,                                               // SCREAMING_SNAKE_CASE => Généralement utilisé pour définir des settings
    PIXEL_SIZE: 30,                                             // Aussi appelée UPPER_SNAKE_CASE
    gridElement: document.querySelector('#invader'),            // On sélectionne les éléments HTML qu'on va utiliser 
    formElement: document.querySelector('.configuration'),      //
    paletteElement: document.querySelector('.palette'),         //
    activeStyle: "black",                                       // Ici, on créé un slot de mémoire dans lequel on va stocker la couleur choisie lorsqu'on cliquera sur une des couleurs de la palette
    styles: [                                                   // Ce tableau permet de stocker les couleurs possibles dans notre appli
        'red',
        'yellow',
        'green',
        'blue',
        'gray',
        'black'
    ],

    //* ####################
    //* --- Processus ---
    //* ####################

    /**
     * app.init()
     * 
     * Démarre la voiture.
     * 
     * HOW DO YOU TURN THIS ON
     * 
     */
    init: function() {                                          // La méthode app.init(), c'est comme tourner la clé dans sa voiture. On tourne la clé, la voiture démarre. Pas de clé tournée, pas de palais...
        app.generateGrid(app.GRID_SIZE, app.PIXEL_SIZE);        // Quand la voiture démarre : - On génère la grille 
        app.generateForm();                                     //                            - On génère le formulaire
        app.generatePalette();                                  //                            - On génère la palette de couleurs
    },
    

    //* ####################
    //* --- Fonctions ---
    //* ####################

    // --------------------
    // --- Génération de grille ---
    // --------------------

    /**
     * generateRow(parent)
     * 
     * Génère une ligne dans un élément parent fourni en argument, puis nous la retourne sous la forme d'un élément HTML
     * 
     * @param {HTMLElement} parent 
     * @returns {HTMLDivElement}
     * 
     */
    generateRow: function(parent) {                         // Cette fonction va générer une ligne dans un parent donné
        const row = document.createElement('div');          // On créé l'élément div qui sera notre ligne
        row.classList.add('row');                           // On donne une classe à notre ligne
        parent.appendChild(row);                            // On greffe l'élément "row" à une div parente fournie en paramètre de la fonction
        return row;                                         // On return la row pour l'utiliser dans la fonction generatePixel plus tard
    },

    /**
     * generatePixel(parent, pixelSize)
     * 
     * Génère un pixel dans un élément parent fourni en argument
     * 
     * @param {HTMLElement} parent 
     * @param {Number} pixelSize 
     * 
     */
    generatePixel: function (parent, pixelSize) {
        const pixel = document.createElement('div');        // On créé l'élément div qui sera notre pixel
        pixel.classList.add('pixel');                       // On donne une classe à notre pixel
        pixel.classList.add('pixel--gray');
        pixel.style.width = pixelSize + "px";               // On donne une hauteur et une largeur à notre pixel
        pixel.style.height = pixelSize + "px";
        pixel.addEventListener('click', app.handlePixelClick);// On branche l'écouteur "handlePixelClick" sur le pixel 
        parent.appendChild(pixel);                          // On greffe ce pixel sur la ligne parente
    },

    /**
     * generateGrid(gridSize, pixelSize)
     * 
     * Génère une grille à partir d'une taille de grille et d'une taille de case
     * 
     * @param {Number} gridSize 
     * @param {number} pixelSize 
     * 
     */
    generateGrid: function (gridSize, pixelSize) {
        for (let i = 0; i < gridSize; i++) {                // On répète cette boucle "gridSize" fois
            const row = app.generateRow(app.gridElement);   // Pour chaque tour de boucle, on créé une ligne
            for (let j = 0; j < gridSize; j++) {            // Pour chaque ligne, on créé "gridSize" fois de pixel
                app.generatePixel(row, pixelSize);    
            }        
        }    
    },

    // --------------------
    // --- Génération de formulaire ---
    // --------------------

    /**
     * generateInput(placeholder)
     * 
     * Génère un input de type number avec un placeholder paramétrable
     * @param {String} placeholder 
     * 
     */
    generateInput: function (placeholder) {
        const input = document.createElement('input');                  // On créé un élément de type input
        input.type = "number";                                          // On lui donne un placeholder
        input.placeholder = placeholder;                                // On détermine le type d'input
        app.formElement.appendChild(input);                             // On le greffe au formulaire
    },

    /**
     * generateForm()
     * 
     * Génère un formulaire qui contiendra 2 inputs avec un bouton.
     *  
     * Cette fonction branche également un EventListener au form
     * pour réagir à la soumission de formulaire.
     * 
     */
    generateForm: function () {
        app.generateInput("Taille de la grille");                       // On crée l'input "taille de la grille"
        app.generateInput("Taille des pixels");                         // On crée l'input "Taille des pixels"

        const button = document.createElement('button');                // On crée le bouton "Valider" du formulaire
        button.textContent = "Valider";                                 // On lui donne un contenu textuel
        app.formElement.appendChild(button);                            // On greffe le bouton au formulaire
        app.formElement.addEventListener('submit', app.handleSubmit);   // On branche un écouteur d'évenements au formulaire

    },

    // --------------------
    // --- Génération de palette ---
    // --------------------

    /**
     * generatePalette()
     * 
     * Cette fonction va générer plusieurs boutons dans notre palette.
     * Chaque bouton aura un style différent !
     * 
     */
    generatePalette: function() {
        for(const style of app.styles) {                            // La boucle for..of permet d'itérer sur un tableau, sans avoir besoin de se prendre la tête sur comment va se comporter l'itérateur. On lit "Pour chaque style contenu dans le tableau app.styles"
            app.generatePaletteButton(style);
        }    
    },

    /**
     * generatePaletteButton(style)
     * 
     * Crée un bouton qui possèdera une couleur (fourni par le paramètre style)
     * 
     * On branche un écouteur d'évènement unique à chaque bouton.
     * 
     * On veut que chaque bouton "mémorise" sa couleur. On lui branche donc 
     * un écouteur qui sera une fonction anonyme, unique pour chaque bouton,
     * et donc avec une couleur unique pour chaque écouteur !
     * 
     * @param {String} style 
     * 
     */
    generatePaletteButton: function(style) {
        const button = document.createElement('button');            // On créé un bouton
        button.classList.add('palette__color');                     // On lui donne son style de base (un rond avec une bordure noire)
        button.classList.add('palette__color--'+ style);            
        button.addEventListener('click', function(event) {          // On créé une réaction (écouteur) unique grâce à cette fonction anonyme. Chaque écouteur aura une valeur différente pour style : un bouton bleu = style bleu, bouton vert = style vert, etc...
            console.log("La couleur choisie est : " + style);       // Lorsque cette réaction est déclenchée, on va : Afficher un message en console
            app.activeStyle = style;                                // Attribuer la couleur du bouton dans app.activeStyle
        })
        app.paletteElement.appendChild(button);                     // On ajoute le bouton dans l'élément div.palette
    },

    /**
     * removeAllStyles(targetElement)
     * 
     * Retire les couleurs d'un pixel
     * 
     * @param {HTMLElement} targetElement 
     */
    removeAllStyles: function(targetElement) {
        for(const style of app.styles) {                            // Cette boucle va se répéter autant de fois qu'il y a de couleurs dans le tableau app.styles
            targetElement.classList.remove('pixel--'+style);        // Elle prend chaque couleur et la retire des classes de l'élément ciblé
        }
    },



    //* ####################
    //* --- Ecouteurs d'évènements ---
    //* ####################

    /**
     * handlePixelClick(event)
     * 
     * Ecouteur d'évènement pour réagir au clic sur un pixel.
     * 
     * Retire les couleurs du pixel puis lui ajoute la couleur sélectionnée dans la palette
     * 
     * @param {Event} event 
     * 
     */
    handlePixelClick: function (event) {
        const targetPixel = event.target;                           // On récupère le pixel ciblé par le clic        
        app.removeAllStyles(targetPixel);                           // On enlève toutes les couleurs appliquées au pixel. Il n'y a qu'une seule couleur sur le pixel, mais cette méthode est la plus efficace pour
        targetPixel.classList.add('pixel--'+app.activeStyle);       // Notre pixel est maintenant tout nu... Il faut vite lui donner une couleur ! On concatène le préfixe 'pixel--' avec le contenu de la prop app.activeStyle. Cette prop contient la couleur choisie par l'utilisateur. Par exemple, si l'user a choisi du green, la classe appliquée sera 'pixel--green'
    },

    /**
     * handleSubmit(event)
     * 
     * Ecouteur d'évènement pour réagir à la soumission du formulaire.
     * 
     * Empêche le comportement par défaut de l'évènement, vide l'élément
     * **div#invader**, puis génère la grille avec les données du formulaire
     * 
     * @param {Event} event 
     * 
     */
    handleSubmit: function (event) {
        event.preventDefault();                                     // Les évènements possèdent parfois des comportements par défaut. Par exemple, quand on clique sur un lien, ça nous dirige vers une autre page. On peut empêcher ça avec event.preventDefault()
        app.gridElement.textContent = "";                           // On vide le conteneur "#invader"
        const gridSizeValue = Number(event.target[0].value);        // On récupère la valeur de l'input concernant la taille de la grille
        const pixelSizeValue = Number(event.target[1].value);       // On récupère la valeur de l'input concernant la taille des pixels // On pourrait aussi sélectionner la valeur comme ceci : event.target.childNodes[0].value
        app.generateGrid(gridSizeValue, pixelSizeValue);            // On génère la grille avec les tailles fournies dans le formulaire
    },


}



app.init();         