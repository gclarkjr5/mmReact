`use strict`

const express = require(`express`);
const app = express();
const routes = require(`./routes`);
const port = process.env.PORT || 5000;


if (process.env.NODE_ENV === `production`) {
    app.use(express.static(`client/build`));
}

app.use(`/api`, routes)
app.listen(port);



