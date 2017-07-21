let getClientSearch = function (req, res, next) {
        // OR `idnumber = "+"'" + req.params.itemid + "'"
        // let queryString = "SELECT fullname, description FROM client WHERE `idnumber` OR `fullname` LIKE '%" + req.body.string + "%'";
        let queryString = "SELECT client_id, fullname, idnumber, phonenumber, description FROM client WHERE idnumber LIKE '%" + req.body.searchString + "%' OR fullname LIKE '%" + req.body.searchString + "%'";
       
        logger.info(queryString);
        pool.query(queryString, function (error, results, fields) {
                    if (error) throw error;
                    if (results.length > 4) {
                        res.status(500).send("Please enter a more unique search term");
                        return
                    }
                    let responseData = {
                        client: []
                    };

                    for (i = 0; i < results.length; i++) {

                        let fdata = results[i];

                        responseData.client.push({
                            "client_id": fdata.client_id,
                            "fullname": fdata.fullname,
                            "description": fdata.description,
                            "idnumber":fdata.idnumber,
                            "phonenumber": fdata.phonenumber
                        })
                    };
                    //res.status(200).send(JSON.stringify(responseData));  
                    res.status(200).send(JSON.stringify(Object.assign({}, {
                                    Data: responseData
                                })));
                            });
}

module.exports = getClientSearch;