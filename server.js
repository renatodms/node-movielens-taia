const express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
require('./util/dbInsert');
require('./route')(app);

const port = 80;
http.listen(port, () => {
    console.log('on '+port);
});