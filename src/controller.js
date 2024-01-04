//*logique métier pour chaque route

const gamesArray = require("../games.json");
const users = require("../users.json");

const controller = {

    homePage: (req, res)=>{
        res.render("index");
    },

    gamePage: (req, res)=>{
    const paramName = req.params.nomDuJeu;
    let goodGame;
    goodGame = gamesArray.find((game)=>game.name===paramName);

    if(!goodGame){
        res.status(404).render("erreur");
    }
        res.render("game", {game:goodGame});
    },

    searchPage : (req,res)=>{
        res.render("search")
    },

    resultsPage : (req, res)=>{
        
        //méthode déstructurée pour const gamesToFind = req.query.recherche et consol.log(gamesToFind)
        const {recherche}=req.query
        const results = gamesArray.filter((game)=>game.title.toLowerCase().includes(recherche.toLowerCase())); //je n'utilise pas find car si ma recherche est o, je veux lister tous les jeux avec o dedans - Filter retourne un tableau !
        res.render("searchResults", {results});
    },

    loginPage : (req, res)=>{
        res.render("login");
    },

    loginPostPage : (req, res)=>{
        //console.log(req.body);
        const {username, password} = req.body;
        
        let user = users.find((user)=>user.userName===username && user.password===password);
        if (user){
            res.redirect("/");
            res.end();
            return;
        };
        
        res.render("login", {nope:true});
    }
}

//*exporter

module.exports=controller;