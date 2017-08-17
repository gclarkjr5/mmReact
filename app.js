`use strict`

const express = require(`express`);
const app = express();
const routes = require(`./routes`)
const port = process.env.PORT || 5000;
// const port = 3000;

app.use(`/`, express.static(`public`));
app.use(`/api`, routes)

app.listen(port);

