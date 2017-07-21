let getRequestStatusReport = function (req, res, next) {
    //let queryString = "SELECT * FROM request WHERE username = '" + req.headers.user + "'";
    let queryString = "SELECT id AS requestid, requestedqty, fulfillqty, status, name FROM request INNER JOIN " +
        " item ON request.item_id = item.item_id WHERE username = '" + req.headers.user + "'";
    logger.info(queryString);
    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;  
        let responseData = {
            requeststatus: []
        };
        for (i = 0; i < results.length; i++) {
            let fdata = results[i];
            responseData. requeststatus.push({
                "requestid": fdata.requestid,
                "requestedqty": fdata.requestedqty,
                "fulfillqty": fdata.fulfillqty,
                "status": fdata.status,
                "name": fdata.name

            })
        };
        //res.status(200).send(JSON.stringify(responseData));  
        res.status(200).send(JSON.stringify(Object.assign({}, {
            Data: responseData
        })));            
       
    }); 
  
}

module.exports = getRequestStatusReport;






