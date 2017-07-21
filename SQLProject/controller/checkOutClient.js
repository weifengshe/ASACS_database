let checkOutClient = function (req, res, next) {
    let queryString = "UPDATE shelter SET currentused_maleBunk = currentused_maleBunk - " + req.body.male + ", currentused_femaleBunk = currentused_femaleBunk -" + req.body.female + ", currentused_mixBunk = currentused_mixBunk -" + req.body.mix + ", availableroom = availableroom +" + req.body.availableroom + " WHERE site_id = " + req.headers.siteid + "";
   
    logger.info(queryString);
    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;              
        res.status(200).send(JSON.stringify(results));
    }); 
  
}


module.exports = checkOutClient;