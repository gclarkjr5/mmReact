`use strict`

const express = require(`express`);
const routes = express.Router();

const keyData = require(`./key`);
const bracketData = require(`./brackets`);
const csvWork = require(`./csvWork`)


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
        csvWork(data => {
            res.status(200).json(data)
        })
    })
    .post((req, res) => {
        res.json(req.body)
    })

// Route for user to browse through the tournament to see how things played out


module.exports = routes;