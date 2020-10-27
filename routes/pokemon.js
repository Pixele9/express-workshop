const express = require("express");
const pokemon = express.Router();

const db = require("../config/database"); 

pokemon.post("/", async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body

    if(pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = "insert into pokemon (pok_name, pok_height, pok_weight, pok_base_experience)"
        query += ` values( '${pok_name}', '${pok_height}', '${pok_weight}', '${pok_base_experience}' );`
        
        const rows = await db.query(query)
        
        if(rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Pokemon inserted" })
        }

        return res.status(500).json({ code: 500, message: "Something went wrong" })
    }
    
    return res.status(500).json({ code: 500, message: "Incomplete fields" }) 
})

pokemon.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `delete from pokemon where pok_id=${req.params.id}`

    const rows = await db.query(query)

    if(rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Pokemon deleted succesfully" })
    }

    return res.status(404).json({ code: 404, message: "Pokemon not found" })
})

pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("select * from pokemon")
    return res.status(200).send({ code: 200, message: pkmn })
})

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    let pokeID = req.params.id
    if (pokeID < pokes.length && pokeID > 0) {
        const pkmn = await db.query("select * from pokemon where pok_id="+pokeID+";")
        return res.status(200).send({ code: 404, message: pkmn })
    }
    
    return res.status(404).send({ code: 404, message: "Pokemon not found"})    
})

pokemon.get('pokemon/:name([A-Za-z]+)', (req, res, next) => {
    const name = req.params.name
    const pkmn = pk.filter(p => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    })
    
    if (pkmn.length > 0) {
        return res.status(200).send({ code: 200, message: pkmn })
    }

    return res.status(404).send({ code: 404, message: "Pokemon not found"})    
})

module.exports = pokemon;
