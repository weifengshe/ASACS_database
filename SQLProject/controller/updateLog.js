let updateLog = function (req, res, next) {
    
    let queryString = "UPDATE log SET logtime =  "+"'" + req.body.logtime + "', description =  "+"'" + req.body.description + "' WHERE client_id = "+"'" + req.body.clientid + "'";
    logger.info(queryString);
    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;              
        res.status(200).send(JSON.stringify(results));
    }); 
  
}
module.exports = updateLog;