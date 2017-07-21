
let getWaitListReport = function (req, res, next) {
    let queryString = "SELECT id, rank, client.fullname, idnumber, description, phoneNumber FROM waitlist INNER JOIN client ON waitlist.client_id= client.client_id WHERE waitlist.site_id = " + "'" +  req.headers.siteid + "' ORDER BY rank ASC";
    logger.info(queryString);
    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;  
        if (results.length == 0) {
                        res.status(500).send("Empty waitlist");
                        return
                    }
                    let responseData = {
                        waitlist: []
                    };

                    for (i = 0; i < results.length; i++) {

                        let fdata = results[i];

                        responseData.waitlist.push({
                             "id": fdata.id,
                            "rank": fdata.rank,
                            "fullname": fdata.fullname,
                            "description": fdata.description,
                            "idnumber":fdata.idnumber,
                            "phonenumber": fdata.phonenumber
                        })
                    };
                    
                    res.status(200).send(JSON.stringify(Object.assign({}, {
                                    Data: responseData
                                })));
                            });
}



module.exports = getWaitListReport;