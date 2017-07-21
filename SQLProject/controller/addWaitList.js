const Promise = require('bluebird')

let addWaitList = function (req, res, next) {
    var selectString = "SELECT * FROM waitlist WHERE `site_id` = '" + req.headers.siteid + "'"


    logger.info(selectString);
    console.log(selectString);
    let max =0 
    new Promise((resolve, reject) => {

        pool.query(selectString, (error, results, fields) => {
            if (results.length == 0){
                max = 0
            }else{
            max = Math.max.apply(Math, results.map(function (o) {
                return o.rank;
            }))}
            resolve(max)
        })
    }).then((max) => {
        let rank = max + 1
        var queryString = "INSERT INTO waitlist (`client_id`, `site_id`, `rank` ) VALUES (" +
            "'" + req.body.client_id + "', '" + req.headers.siteid + "', '" + rank + "' )"

        logger.info(queryString);
        console.log(queryString);
        pool.query(queryString, function (error, results, fields) {
            if (error) throw error;
            res.status(200).send(JSON.stringify(results));
        });

    })


}

module.exports = addWaitList;