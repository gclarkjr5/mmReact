`use strict`

const express = require(`express`);
const routes = express.Router();
const bodyParser = require(`body-parser`);

const keyData = require(`./key`);
const bracketData = require(`./brackets`);
const csvWork = require(`./keyWork`)

routes.use(bodyParser.json())

routes.route(`/key`)
    .get((req, res) => {
        keyData(x => {
            res.status(200).json(x)
        })
    })

routes.route(`/brackets`)
    .get((req, res) => {
        bracketData(x => {
            res.status(200).json(x)
        })
    })

routes.route(`/data`)
    .get((req, res) => {
        csvWork(null, data => {
            res.status(200).json(data)
        })
    })
    .post((req, res) => {
        const round = req.body.round
        csvWork(round, data => {
            res.status(200).json(data)
        })
        
    })

// Route for user to browse through the tournament to see how things played out


module.exports = routes;