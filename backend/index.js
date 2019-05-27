require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3001;
const db = require('db');
const api = require('api');
const server = express()
    .use(express.static(path.join(__dirname, 'client/build')))
    .use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        next()
    })
    .use('/api', api)
    .use((req, res) => res.sendFile(path.join(__dirname + '/client/build/index.html')))
    .listen(port, () => console.log(`Listening on ${port}`))
db.connect();