`use strict`

const csv = require(`fast-csv`);
const fs = require(`fs`);
const _ = require(`lodash`);

module.exports = callback => {
    let keyStream = fs.createReadStream(`./key.csv`);
    let stream = fs.createReadStream("./brackets.csv");

    let Master;
    let Rest = [];

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
        });

    csv.fromStream(stream, { headers: true })
        .on("data", function (data) {
            //  console.log(data);
            if (data.Name === `Master`) {
                Master = data
            } else {
                Rest.push(data)
            }
        })
        .on("end", function () {
            // Create an object of finished games, this will be used for calculating the Pts Remaining, ADVANCED
            // let finishedGamesPerRound = {};
            // _.forEach(Master, (value, key) => {
            //     let val = value.replace(/---/g, ``)
            //     if (key === `Name`) {
            //         //Do Nothing
            //     } else {
            //         if (val === ``) {
            //             //Do Nothing
            //         } else {
            //             finishedGamesPerRound[key] = val
            //         }
            //     }
            // });

            // Get the last finished round from Master; this will be compared against future rounds in the users to calculate Pts Remaining
            let lastFinishedRound = _.filter(Master, x => {
                return (_.includes(x, `---`) == false)
            }).pop().match(/.{1,3}/g);

            // Create the final objects for each user that will be used for HighCharts
            let FinalObjs = _.map(Rest, x => {
                _.forEach(x, (value, key) => {
                    if (key === `Name`) {
                        //Do Nothing
                    } else {
                        // Get the strings for each round in Master
                        let userString = value;
                        let masterString = Master[key];

                        // Divide the strings up into all of the games that were chosen
                        let userPicks = userString.match(/.{1,3}/g);
                        let masterPicks = masterString.match(/.{1,3}/g);

                        if (key === `Elite8`) {
                            // console.log(key)
                            // console.log(userPicks)
                            let arr = _.map(userPicks, (val, ky) => {
                                let obs = _.find(Key, o => {
                                    return o.hasOwnProperty(val)
                                });

                                return obs[val]
                            });
                            x[`Final Four`] = arr
                        } else if (key === `Final4`) {
                            let arr = _.map(userPicks, (val, ky) => {
                                let obs = _.find(Key, o => {
                                    return o.hasOwnProperty(val)
                                });
                                return obs[val]
                            });
                            x[`Top Two`] = arr
                        } else if (key === `CHAMPIONSHIP`) {
                            let arr = _.map(userPicks, (val, ky) => {
                                let obs = _.find(Key, o => {
                                    return o.hasOwnProperty(val)
                                });
                                return obs[val]
                            });
                            x[`Champion`] = arr
                        }
                        // console.log(masterPicks)

                        // Work with partially finished or completely unfinished rounds for Pts Remaining calculations
                        if (_.includes(masterPicks, "---")) {
                            // Amount of games in an unfinished round that the user has gotten right
                            let NumCorrectChoicesInUnfinishedRound = _.filter(userPicks, x => {
                                return _.includes(masterPicks, x)
                            }).length

                            // All of the games in unfinished rounds that does not match the master
                            let NonMatches = _.filter(userPicks, x => {
                                return (_.includes(masterPicks, x) == false)
                            });
                            // console.log(NonMatches)
                            let gamesPossibleInThisRound = _.intersection(NonMatches, lastFinishedRound).length

                            // Start do the calculations for each
                            if (_.includes(key, '64')) {
                                x[`${key}PtsSoFar`] = NumCorrectChoicesInUnfinishedRound * 1
                                x[`${key}PtsRemain`] = gamesPossibleInThisRound * 1

                            } else if (_.includes(key, '32')) {
                                x[`${key}PtsSoFar`] = NumCorrectChoicesInUnfinishedRound * 2
                                x[`${key}PtsRemain`] = gamesPossibleInThisRound * 2

                            } else if (_.includes(key, '16')) {
                                x[`${key}PtsSoFar`] = NumCorrectChoicesInUnfinishedRound * 4
                                x[`${key}PtsRemain`] = gamesPossibleInThisRound * 4

                            } else if (_.includes(key, '8')) {
                                x[`${key}PtsSoFar`] = NumCorrectChoicesInUnfinishedRound * 8
                                x[`${key}PtsRemain`] = gamesPossibleInThisRound * 8

                            } else if (_.includes(key, '4')) {
                                x[`${key}PtsSoFar`] = NumCorrectChoicesInUnfinishedRound * 16
                                x[`${key}PtsRemain`] = gamesPossibleInThisRound * 16

                            } else if (_.includes(key.toLowerCase(), 'championship')) {
                                // x[`${key}PtsSoFar`] = NumCorrectChoicesInUnfinishedRound * 32
                                x[`${key}PtsRemain`] = gamesPossibleInThisRound * 32

                            } else {
                                //Do Nothing
                            }

                        } else { // All Rounds that have finished
                            // Return all the matches that the user got right
                            let userMatches = _.filter(userPicks, x => {
                                return _.includes(masterPicks, x)
                            });

                            // How many matches?
                            x[`${key}NumberCorrect`] = userMatches.length;
                            let NumberCorrect = x[`${key}NumberCorrect`]

                            // Create the points for each round
                            if (_.includes(key, '64')) {
                                x[`${key}Points`] = NumberCorrect * 1;

                            } else if (_.includes(key, '32')) {
                                x[`${key}Points`] = NumberCorrect * 2;

                            } else if (_.includes(key, '16')) {
                                x[`${key}Points`] = NumberCorrect * 4;

                            } else if (_.includes(key, '8')) {
                                x[`${key}Points`] = NumberCorrect * 8;

                            } else if (_.includes(key, '4')) {
                                x[`${key}Points`] = NumberCorrect * 16;

                            } else if (_.includes(key.toLowerCase(), 'championship')) {
                                x[`${key}Points`] = NumberCorrect * 32;

                            } else {
                                //Do Nothing
                            }
                        }
                    }
                    // console.log(x)
                });
                // console.log(x)
                TotalCorrect = null;
                TotalPoints = null;
                PtsRemain = null;

                // Get the totals
                _.forEach(x, (value, key) => {
                    if (_.includes(key.toLowerCase(), "points")) {
                        TotalPoints += x[key]
                    } else if (_.includes(key.toLowerCase(), "correct")) {
                        TotalCorrect += x[key]
                    } else if (_.includes(key.toLowerCase(), "remain")) {
                        PtsRemain += x[key]
                    }
                });
                x.TotalCorrect = TotalCorrect;
                x.TotalPoints = TotalPoints;
                x.PtsRemain = PtsRemain
                // console.log(x)
                return _.pick(x, [`Name`, `Round64Points`, `Round64PtsSoFar`, `Round32Points`, `Round32PtsSoFar`,
                    `Sweet16Points`, `Sweet16PtsSoFar`, `Elite8Points`, `Elite8PtsSoFar`, `Final4Points`, `Final4PtsSoFar`, `Final Four`, `Top Two`, `Champion`, `CHAMPIONSHIPPoints`, `TotalCorrect`, `TotalPoints`, `PtsRemain`])
            });


            let orderObjs = _.orderBy(FinalObjs, [`TotalPoints`], [`desc`])
            let Participants = _.map(orderObjs, x => {
                return x.Name
            });

            let Round64 = _.map(orderObjs, x => {
                return x.Round64Points
            });
            let Round32 = _.map(orderObjs, x => {
                return x.Round32Points
            });
            let Sweet16 = _.map(orderObjs, x => {
                return x.Sweet16Points
            });
            let Elite8 = _.map(orderObjs, x => {
                return x.Elite8Points
            });
            let Final4 = _.map(orderObjs, x => {
                return x.Final4Points
            });
            let Championship = _.map(orderObjs, x => {
                return x.CHAMPIONSHIPPoints
            });
            let MaxPtsRemain = _.map(orderObjs, x => {
                return x.PtsRemain
            });

            let series = [{
                name: `Round64`,
                data: Round64
            }, {
                name: `Round32`,
                data: Round32
            }, {
                name: `Sweet16`,
                data: Sweet16
            }, {
                name: `Elite8`,
                data: Elite8
            }, {
                name: `Final4`,
                data: Final4
            }, {
                name: `CHAMPIONSHIP`,
                data: Championship
            }, {
                name: `MaxPtsRemain`,
                data: MaxPtsRemain
            }];
            let data = {
                categories: Participants,
                series: series
            }
            callback(data)
        });
}

