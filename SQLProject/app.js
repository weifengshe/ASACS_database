// Library

var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var mySql = require('mysql');
var log4js = require('log4js');


process.on('uncaughtException', function (err) {
  console.log(err);
})
log4js.configure({
    appenders: [{
        type: 'file',
        filename: 'logs/log.txt',
        maxLogSize: 1024,
        backups: 3,
        category: 'normal'
    }],
    replaceConsole: false
});
logger = log4js.getLogger('normal');
logger.setLevel('INFO');


pool = mySql.createPool({
    connectionLimit: 10,
    host: '52.55.25.50',
    user: 'user',
    password: 'QWEasd123@',
    database: 'cs6400sp17team021'
});

//Routes

var api = require('./routes/api');

var app = express();
var port = '3000';


//bodyparser MW
app.use(bodyParser.json({
    limit: '1mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set HTTP Header
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token, x-uid');
    next();
});

app.use(log4js.connectLogger(logger, {
    level: log4js.levels.INFO
}));
app.use('/', express.static(__dirname + '/www'))


app.all('*', (req, res, next) => {
    if (req.method == "OPTIONS") {
        return res.status(200).send();
    } else {
        if (req.originalUrl === '/api/availablebunkroom' || req.originalUrl === '/api/remainingmeal') {
            next();
            return;
        }
        // check aginst user table for password authentication
        pool.query("SELECT site_id FROM user WHERE username = '" + req.headers.user + "' AND password = '" + req.headers.password + "'", (err, results, fields) => {
            if (results.length > 0) {

                req.headers.siteid = results[0].site_id
                next()

            } else res.status(500).send("wrong password");
        })

    }


});


app.use('/api', api);
// 404 

app.use(function (req, res, next) {
    return res.status(404).send("API Not Found");
})



app.listen(port, function () {
    console.log('Started server:' + port);
});