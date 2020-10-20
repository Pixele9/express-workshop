const express = require("express");
const pokemon = express.Router();

const db = require("../config/database.js"); 

pokemon.post("/", (req, res, next) => {
    // return res.status(200).send("You are in /pokemon POST")
    return res.status(200).send(req.body)
})

pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("select * from pokemon")
    return res.status(200).send(pkmn)
})

pokemon.get('/:id([0-9]{1,3})', (req, res, next) => {
    let pokeID = req.params.id
    if (pokeID < pokes.length && pokeID > 0) {
        return res.status(200).send(pk[pokeID-1])
    } else {
        res.status(404).send("<h1>Pokemond ID not existent</h1>")
    }
})

pokemon.get('pokemon/:name([A-Za-z]+)', (req, res, next) => {
    const name = req.params.name
    const pkmn = pk.filter(p => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    })
    
    if (pkmn.length > 0) {
        return res.status(200).send(pkmn)
    }

    return (pk.length > 0) ? res.status(200).send(pk) : res.status(404).send("Pokemón no encontrado");
})

module.exports = pokemon;
