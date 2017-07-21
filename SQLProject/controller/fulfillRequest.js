const Promise = require('bluebird')

let fulfillRequest = function (req, res, next) {

    let queryString1 = "UPDATE request SET fulfillqty = '" + req.body.fulfillqty + "', status = '" + req.body.status + "' WHERE id = '" + req.body.requestid + "'";
    let queryString2 = "UPDATE item SET numberofunits = numberofunits - " + req.body.fulfillqty + " WHERE item_id = '" + req.body.item_id + "'";

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
        res.status(200).send("Request fullfills and inventory updates");
    }).catch((err => {
        res.status(500).send()
    }))
}

module.exports = fulfillRequest;
// let fulfillRequest = function (req, res, next) {
//     let queryString = "UPDATE request SET fulfillqty = '" + req.body.fulfillqty + "', status = '" + req.body.status + "' WHERE id = '" + req.body.requestid + "'";
//     logger.info(queryString);
//     pool.query(queryString, function (error, results, fields) {
//         if (error) throw error;              
//         res.status(200).send(JSON.stringify(results));
//     }); 
  
// }


// module.exports = fulfillRequest;