let updateBunkNum = function (req, res, next) {
    
    let queryString = "UPDATE shelter SET currentused_maleBunk =  "+"'" + req.body.male + "', currentused_femaleBunk =  "+"'" + req.body.female + "', currentused_mixBunk =  "+"'" + req.body.mix + "' WHERE site_id = "+"'" + req.body.siteid + "'";
    logger.info(queryString);
    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;              
        res.status(200).send(JSON.stringify(results));
    }); 
  
}


module.exports = updateBunkNum;