const Promise = require('bluebird')
var moment = require('moment')
let updateClient = function (req, res, next) {

    let dateTime = moment().format('YYYY-MM-DD hh:mm:ss')
    let queryString1 = "INSERT INTO log (`client_id`, `site_id`, `logtime`, `description` ) VALUES (" +
        "'" + req.body.client_id + "', '" + req.headers.siteid + "', '" + dateTime + "', '" + req.body.modification + "' )"

    let queryString2 = "UPDATE client SET fullname =  "+"'" + req.body.fullname + "', idnumber =  "+"'" + req.body.idnumber + "', description =  "+"'" + req.body.description + "', phonenumber =  "+"'" + req.body.phonenumber + "' WHERE client_id = "+"'" + req.body.client_id + "'";

    new Promise((resolve, reject) => {

        pool.query(queryString1, function (error, results, fields) {
            if (error) reject(error);
            resolve();
        })

    }).then(() => {
        return new Promise((resolve, reject) => {
            pool.query(queryString2, function (error, results, fields) {
                if (error) reject(error);
                resolve()
            })
        })

    }).then(() => {
        res.status(200).send("Client info has been modified");
    }).catch((err => {
        res.status(500).send()
    }))
}

module.exports = updateClient;