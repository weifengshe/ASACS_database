let deleteRequest = function (req, res, next) {
    
    let queryString = "DELETE FROM request WHERE id = '" + req.body.requestid + "'";
    logger.info(queryString);
    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;              
        res.status(200).send(JSON.stringify(results));
    }); 
  
}
module.exports = deleteRequest;
