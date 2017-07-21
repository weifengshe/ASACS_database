let addRequest = function (req, res, next) {
   
 
   let queryString = "INSERT INTO request (`requestedqty`, `fulfillqty`, `status`, `item_id`, `username`, `bank_id` ) VALUES ("
       +"'" + req.body.requestedqty + "', 0, '" + req.body.status + "', '" + req.body.item_id + "', '" + req.headers.user + "', '" + req.body.bank_id + "' )"

    logger.info(queryString);
    console.log(queryString);


    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;        
        res.status(200).send(JSON.stringify(results));
    });
}

module.exports = addRequest;