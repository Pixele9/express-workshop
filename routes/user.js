const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require("../config/database"); 

user.post("/signup", async (req, res, next) => {
    const { user_name, user_mail, user_password } = req.body; 

    if (user_name, user_mail, user_password ) {
        let query = "insert into user (user_name, user_mail, user_password) "
        query += `values('${user_name}', '${user_mail}', '${user_password}')`

        const rows = await db.query(query)

        if(rows.affectedRows) {
            return res.status(200).json({code:200, message: `User ${user_name} successfuly signed up`})
        }

        return res.status(500).json({code:500, message: "Something went wrong"})
    }
    return res.status(500).json({code:500, message: "Incomplete fields"})
})

user.post("/login", async (req, res, next) => {
    const { user_mail, user_password} = req.body
    const query = `select * from user where user_mail = '${user_mail}' and user_password = '${user_password}';` 
    const rows = await db.query(query)
    
    if(user_mail && user_password) {
        if(rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey")

            return res.status(200).json({ code: 200, message: token })
        } else {
            return res.status(401).json({ code: 401, message: "Mail or password incorrect" })
        }
    }
    return res.status(500).json({ code: 500, message: "Incomplte fields" })
})

user.get("/", async (req, res, next) => {
    const query = "select * from user;"
    const rows = await db.query(query)
    
    return res.status(200).json({ code: 200, message: rows })
})

module.exports = user
