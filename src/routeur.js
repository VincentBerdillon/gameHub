//* définition de nos routes et application de la logique de chaque route

//*import EXPRESS
const express = require("express");

//*importer le ROUTER d'express, sorte de tableau pour les routes
const router = express.Router();

//*importer le CONTROLLER
const controller=require("./controller");

//*renseigner nos différentes ROUTES
//router.get("/", chose à faire quand on requete cette adresse)

router.get("/", controller.homePage);
router.get("/game/:nomDuJeu", controller.gamePage);
router.get("/search", controller.searchPage);
router.get("/search/results", controller.resultsPage);

router.get("/login", controller.loginPage);
router.post("/login", controller.loginPostPage); //important pour récupérer les infos

//*Exporter
module.exports=router;
