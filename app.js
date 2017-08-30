`use strict`

const express = require(`express`);
const app = express();
const routes = require(`./routes`)
const port = process.env.PORT || 5000;
// const cors = require(`cors`);

// app.use(cors());

app.use(`/`, express.static(`public`));
app.use(`/api`, routes)

app.listen(port);



