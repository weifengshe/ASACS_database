let addClient = function (req, res, next) {
   
 
   let queryString = "INSERT INTO client (`fullname`, `idnumber`, `description`, `phonenumber` ) VALUES ("
       +"'" + req.body.fullname + "', '" + req.body.idnumber+ "', '" + req.body.description + "', '" + req.body.phonenumber + "' )"

    logger.info(queryString);
    console.log(queryString);


    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;        
        res.status(200).send(JSON.stringify(results));
    });
}

module.exports = addClient;