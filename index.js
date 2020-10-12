const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');


let pokes = [] 
pokemon.forEach(el => pokes.push(el.name))

app.get("/", (req, res, next) => {
    res.status(200)
    res.send("Welcome to the server")
})

app.get("/pokemon/names", (req, res, next) => {
    res.status(200)
    res.send(pokes)
})

app.get("/pokemon/all", (req, res, next) => {
    res.status(200)
    res.send(pokemon)
})

app.get('/pokemon/:id', (req, res, next) => {
    let pokeID = req.params.id-1
    if (pokeID < pokes.length && pokeID > 0) {
        res.status(200)
        res.send(pokemon[pokeID])
    } else {
        res.status(404)
        res.send("<h1>Pokemond ID not existent</h1>")
    }
})

app.listen(process.env.port || 3000, () => console.log("server is running..."));
