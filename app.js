`use strict`

const express = require(`express`);
const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

const csvWork = require(`./csvWork`);

app.use(`/`, express.static(`public`));

app.get(`/`, (req, res) => {
    res.send('Hello World')
});

app.get(`/data`, (req, res) => {
    csvWork(data => {
        res.status(200).json(data)
    })
})

app.listen(port);

