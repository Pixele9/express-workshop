const express = require('express');
const user = express.Router();
const db = require("../config/database"); 

user.post("/", async (req, res, next) => {
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

module.exports = user
