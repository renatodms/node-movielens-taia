const express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    bodyParser = require('body-parser'),
    route = require('./route');

app.use(bodyParser.json());
route(app);

const port = 80;
http.listen(port, () => {
    console.log('on '+port);
});