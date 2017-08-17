`use strict`

const express = require(`express`);
const routes = express.Router();

const keyData = require(`./key`);
const bracketData = require(`./brackets`);

routes
    .get(`/key`, (req, res) => {
        keyData(x => {
            res.status(200).json(x)
        })
    })

routes
    .get(`/brackets`, (req, res) => {
        bracketData(x => {
            res.status(200).json(x)
        })
    })

const csvWork = require(`./csvWork`)

// routes.get('/', (req, res) => {
//     res.status(200).json({ message: 'Connected!' });
// });

routes
    .get(`/data`, (req, res) => {
        csvWork(data => {
            res.status(200).json(data)
        })
    })

module.exports = routes;