const express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
require('./util/dbInsert');
require('./route')(app);

const port = 80;
http.listen(port, () => {
    console.log('on '+port);
});