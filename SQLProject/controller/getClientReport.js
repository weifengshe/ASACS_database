var forEach = require('async').forEach;

let getClientReport = function (req, res, next) {

    let queryString = "SELECT fullname, client.description AS description, DATE_FORMAT(logtime,'%d/%m/%Y') AS niceDate , log.description AS service FROM client INNER JOIN log ON client.client_id= log.client_id " +
        "  WHERE client.client_id = '" + req.params.clientid + "' ORDER BY niceDate DESC";

    logger.info(queryString);
    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;
        let responseData = {
            report: [],
            list: []
        };

        for (i = 0; i < results.length; i++) {

            let fdata = results[i];

            responseData.report.push({
                "fullname": fdata.fullname,
                "description": fdata.description,
                "logtime": fdata.niceDate,
                "service": fdata.service,
            })
        };
        let string = "SELECT rank, waitlist.site_id AS waitatsite FROM client INNER JOIN " +
            " waitlist ON client.client_id= waitlist.client_id WHERE client.client_id = '" + req.params.clientid + "'";

        logger.info(string);
        pool.query(string, function (error, results2, fields) {
            if (error) throw error;
            for (i = 0; i < results2.length; i++) {

                let fdata = results2[i];

                responseData.list.push({
                    "rank": fdata.rank,
                    "waitatsite": fdata.waitatsite,
                    "selfSite": fdata.waitatsite === req.headers.siteid                  
                })
            }
            res.status(200).send(JSON.stringify(Object.assign({}, {
                Data: responseData
            })))
        })
    })

}

module.exports = getClientReport;