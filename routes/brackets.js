`use strict`

const express = require(`express`);
const routes = express.Router();
const csv = require(`fast-csv`);
const fs = require(`fs`);

module.exports = callback => {
    const keyStream = fs.createReadStream(`./brackets.csv`)
    let key = [];

    csv.fromStream(keyStream, { headers: true, objectMode: true })
        .on(`data`, (data) => {
            key.push(data)
        })
        .on(`end`, () => {
            callback(key)
        });
}