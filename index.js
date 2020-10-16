const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon');

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res, next) => {
    return res.status(200).send("Welcome to the server")
})

app.use("/pokemon", pokemon)

app.listen(process.env.port || 3000, () => console.log("server is running..."));
