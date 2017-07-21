let getItemByID = function (req, res, next) {
    let queryString = "SELECT * FROM item WHERE item_id = "+"'" + req.params.itemid + "'";
   
    logger.info(queryString);
    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;              
        res.status(200).send(JSON.stringify(results));
    }); 
  
}
module.exports = getItemByID;