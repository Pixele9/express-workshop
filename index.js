const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

let pokes = [] 
pokemon.forEach(el => pokes.push(el.name))

app.get("/", (req, res, next) => {
    res.status(200)
    res.send("Welcome to the server")
    return res.status(200).send("Welcome to the server")
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
    //pokemon.forEach(el => {
        //if (el.name.toUpperCase() === name.toUpperCase()) {
            //return res.status(200).send(el)
        //}
    //})
    const pk = pokemon.filter(p => {
        if(p.name.toUpperCase() === name.toUpperCase()) {
            return p 
        }

    })
    return res.status(404).send(pk)
    //return res.status(404).send("<h1>Pokemon not found</h1>")
})

app.listen(process.env.port || 3000, () => console.log("server is running..."));
