const express = require("express");
const pokemon = express.Router();

const { pk } = require('../pokedex.json');

pokemon.post("/", (req, res, next) => {
    //return res.status(200).send("You are in /pokemon POST")
    return res.status(200).send(req.body.name)
})

pokemon.get("/names", (req, res, next) => {
    return res.status(200).send(pokes)
})

pokemon.get("/", (req, res, next) => {
    res.status(200).send(pk)
})

pokemon.get('/:id([0-9]{1,3})', (req, res, next) => {
    let pokeID = req.params.id
    if (pokeID < pokes.length && pokeID > 0) {
        return res.status(200).send(pokemon[pokeID-1])
    } else {
        res.status(404).send("<h1>Pokemond ID not existent</h1>")
    }
})


pokemon.get('/:name([A-Za-z]+)', (req, res, next) => {
    const name = req.params.name
    const pk = pokemon.filter(p => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    })
    
    if (pk.length > 0) {
        return res.status(200).send(pk)
    }

    return (pk.length > 0) ? res.status(200).send(pk) : res.status(404).send("Pokemón no encontrado");
})

module.exports = pokemon
