const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const databaseClient = require('./config/database');


const app = express();

const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));


MongoClient.connect(databaseClient.url, (err, client) => {
    if (err) return console.log(err);

    require('./app/routes')(app, client.db(databaseClient.name));
    app.listen(port, () => {
        console.log("We are live on " + port);
    });
})