const Promise = require('bluebird')
let deleteFoodbank = function (req, res, next) {


    let queryString3 = "DELETE FROM foodbank WHERE site_id = '" + req.headers.siteid + "'"
    let queryString2 = "DELETE FROM item WHERE bank_id = '" + req.headers.siteid + "'"
    let queryString1 = "DELETE FROM request WHERE bank_id = '" + req.headers.siteid + "'"
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
        return new Promise((resolve, reject) => {
            pool.query(queryString3, function (error, results, fields) {
                if (error) reject(error);
                resolve()
            })
        })
    }).then(() => {
        res.status(200).send("Foodbank is deleted");
    }).catch((err => {
        res.status(500).send()
    }))
}


module.exports = deleteFoodbank;