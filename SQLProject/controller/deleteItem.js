const Promise = require('bluebird')
let deleteItem = function (req, res, next) {

    let queryString2 = "DELETE FROM item WHERE item_id = '" + req.body.item_id + "'"
    let queryString1 = "DELETE FROM request WHERE item_id = '" + req.body.item_id + "'"
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
        res.status(200).send("Item is deleted");
    }).catch((err => {
        res.status(500).send()
    }))
}


module.exports = deleteItem;