const Promise = require('bluebird')
var moment = require('moment')
let checkInClient = function (req, res, next) {

    let dateTime = moment().format('YYYY-MM-DD hh:mm:ss')
    let queryString1 = "INSERT INTO log (`client_id`, `site_id`, `logtime`, `description` ) VALUES (" +
        "'" + req.body.client_id + "', '" + req.headers.siteid + "', '" + dateTime + "', '" + req.body.description + "' )"

    let queryString2 = "UPDATE shelter SET currentused_maleBunk = currentused_maleBunk + " + req.body.male + ", currentused_femaleBunk = currentused_femaleBunk +" + req.body.female + ", currentused_mixBunk = currentused_mixBunk +" + req.body.mix + ", availableroom = availableroom -" + req.body.availableroom + " WHERE site_id = " + "'" + req.headers.siteid + "'";
    let queryString3 = "DELETE FROM waitlist WHERE client_id = '" + req.body.client_id + "' AND site_id = '" + req.headers.siteid + "'";
   
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
            if (req.body.availableroom > 0) {
                return new Promise((resolve, reject) => {
                    pool.query(queryString3, function (error, results, fields) {
                        if (error) reject(error);
                        resolve()
                    })
                })

            } else {
                res.status(200).send("Client checks in");
            }
        }).then(() => {
            res.status(200).send("Client checks in")
        })
        .catch((err => {
            res.status(500).send()
        }))
}

module.exports = checkInClient;