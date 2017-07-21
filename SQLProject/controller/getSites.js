let getSites = function (req, res, next) {
    let queryString = "SELECT * FROM site WHERE site_id = "+"'" + req.params.siteid + "'";
    logger.info(queryString);
    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;              
        res.status(200).send(JSON.stringify(results));
    }); 
  
}


module.exports = getSites;