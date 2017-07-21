var moment = require('moment') 
let addLog = function (req, res, next) {

    let dateTime = moment().format('YYYY-MM-DD hh:mm:ss')
    let queryString = "INSERT INTO log (`client_id`, `site_id`, `logtime`, `description` ) VALUES (" +
        "'" + req.body.client_id + "', '" + req.headers.siteid + "', '" + dateTime + "', '" + req.body.description + "' )"

    logger.info(queryString);
    console.log(queryString);


    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(JSON.stringify(results));
    });
}

module.exports = addLog;