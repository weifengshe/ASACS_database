let updateItem = function (req, res, next) {
    
    let queryString = "UPDATE item SET numberofunits = '" + req.body.numberofunits + "' WHERE item_id = '" + req.body.item_id + "'";
    logger.info(queryString);
    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;              
        res.status(200).send(JSON.stringify(results));
    }); 
  
}


module.exports = updateItem;