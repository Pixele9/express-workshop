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

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
    let pokeID = req.params.id
    if (pokeID < pokes.length && pokeID > 0) {
        res.status(200)
        res.send(pokemon[pokeID-1])
    } else {
        res.status(404)
        res.send("<h1>Pokemond ID not existent</h1>")
    }
})


app.get('/pokemon/:name', (req, res, next) => {
    const name = req.params.name
    pokemon.forEach(el => {
        if (el.name === name) {
           res.send(el) 
        }
    })
    res.send("<h1>Pokemon not found</h1>")
})

app.listen(process.env.port || 3000, () => console.log("server is running..."));
