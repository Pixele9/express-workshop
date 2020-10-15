const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

let pokes = [] 
pokemon.forEach(el => pokes.push(el.name))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res, next) => {
    res.status(200)
    res.send("Welcome to the server")
    return res.status(200).send("Welcome to the server")
})

app.post("/pokemon", (req, res, next) => {
    //return res.status(200).send("You are in /pokemon POST")
    return res.status(200).send(req.body.name)
})

app.get("/pokemon/names", (req, res, next) => {
    return res.status(200).send(pokes)
})

app.get("/pokemon", (req, res, next) => {
    res.status(200).send(pokemon)
})

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
    let pokeID = req.params.id
    if (pokeID < pokes.length && pokeID > 0) {
        return res.status(200).send(pokemon[pokeID-1])
    } else {
        res.status(404).send("<h1>Pokemond ID not existent</h1>")
    }
})


app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {
    const name = req.params.name
    const pk = pokemon.filter(p => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    })
    
    if (pk.length > 0) {
        return res.status(200).send(pk)
    }

    return (pk.length > 0) ? res.status(200).send(pk) : res.status(404).send("Pokemón no encontrado");
})

app.listen(process.env.port || 3000, () => console.log("server is running..."));
