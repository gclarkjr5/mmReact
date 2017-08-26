`use strict`

const csv = require(`fast-csv`);
const fs = require(`fs`);
const _ = require(`lodash`);
const bracketWork = require(`./bracketWork`);

module.exports = callback => {
    let keyStream = fs.createReadStream(`./key.csv`);

    let Key = [];

    csv.fromStream(keyStream, { headers: true })
        .on(`data`, (data) => {
            Key.push(data)
        })
        .on(`end`, () => {
            _.forEach(Key, (value, key) => {
                if (value.Rank.length === 1) {
                    value.Rank = `0${value.Rank}`
                }
            });
            let p = _.map(Key, (value, key) => {
                _.forEach(value, (val, ky) => {
                    if (ky !== `Rank`) {
                        // Do Nothing
                        value[`${ky.charAt(0)}${value.Rank}`] = val
                        delete value[ky]
                    } else {
                        // delete value[ky]
                        // console.log(ky)
                    }
                });
                return value
            });
            bracketWork(Key, x => {
                callback(x)
            });
        });
}