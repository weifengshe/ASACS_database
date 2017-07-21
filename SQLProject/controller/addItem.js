let addItem = function (req, res, next) {
   
 
   let queryString = "INSERT INTO item (`name`, `numberofunits`, `categoryname`, `subcategoryname`, `expirationdate`,  `storagetype`, `bank_id` ) VALUES ("
       +"'" + req.body.name + "', '" + req.body.numberofunits+ "', '" + req.body.categoryname + "', '" + req.body.subcategoryname + "', '" + 
       req.body.expirationdate + "', '" + req.body.storagetype + "', '" + req.body.bank_id + "' )"

    logger.info(queryString);
    console.log(queryString);


    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;        
        res.status(200).send(JSON.stringify(results));
    });
}

module.exports = addItem;