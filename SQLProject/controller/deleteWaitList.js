let deleteWaitList = function (req, res, next) {
    
    let queryString = "DELETE FROM waitlist WHERE id = '" + req.body.id + "'";
    logger.info(queryString);
    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;              
        res.status(200).send(JSON.stringify(results));
    }); 
  
}
module.exports = deleteWaitList;

