//*import du SERVEUR
const express = require("express");
const app = express();
const port = 3000;

//*import du ROUTEUR
const router=require("./src/routeur");

//Modules externes
app.set("view engine", "ejs");
app.set("views", "views");

//Récupération de mes données et partage à toutes les views
const gamesArray = require("./games.json");
app.locals.games = gamesArray;

//*Middlewares

app.use(express.static("public"));

app.use((req, res, next)=>{
   
    console.log(`[${Date()} ${req.ip}] ${req.path}`);

    next();
})

app.use(express.urlencoded({extended:true})); //traduire le body dans l'inspecteur network, payload, quand on utilise la méthode post

//* Indiquer au serveur le routeur à utiliser

app.use(router);


app.use((req, res, next)=>{
    console.log("erreur d'url");
    res.status(404).render("erreur");
});


app.listen((port), ()=>console.log(`écoute du port ${port}`));
