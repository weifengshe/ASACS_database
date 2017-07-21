let getOutstandingRequestReport = function (req, res, next) {

    let queryString1 = "SELECT request.item_id AS itemid, name, storagetype, categoryname, subcategoryname," +
        " numberofunits, id AS requestid, requestedqty, fulfillqty, status FROM ( item INNER JOIN request ON item.item_id= request.item_id)" +
        " INNER JOIN foodbank ON item.bank_id= foodbank.bank_id WHERE site_id = '" + req.headers.siteid + "'";
    let sort = '';
    if (req.body.storagetype && req.body.storagetype != '') {
        sort = " ORDER BY " + "" + req.body.storagetype + ""
         
    }
    if (req.body.categoryname && req.body.categoryname != '') {
        sort = " ORDER BY " + "" + req.body.categoryname + ""
         
    }

    if (req.body.subcategoryname && req.body.subcategoryname != '') {
        sort = " ORDER BY " + "" + req.body.subcategoryname + ""
         
    }
    if (req.body.requestedqty && req.body.requestedqty != '') {
        sort = " ORDER BY " + "" + req.body.requestedqty + ""
         
    }


    let queryString = queryString1 + sort;
    logger.info(queryString);
    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;
        let responseData = {
            report: []
        };
        for (i = 0; i < results.length; i++) {
            let fdata = results[i];
            responseData.report.push({
                "item_id": fdata.itemid,
                "name": fdata.name,
                "storagetype": fdata.storagetype,
                "categoryname": fdata.categoryname,
                "subcategoryname": fdata.subcategoryname,
                "numberofunits": fdata.numberofunits,
                "requestid": fdata.requestid,
                "requestedqty": fdata.requestedqty,
                "fulfillqty": fdata.fulfillqty,
                "status": fdata.status

            })
        };
        //res.status(200).send(JSON.stringify(responseData));  
        res.status(200).send(JSON.stringify(Object.assign({}, {
            Data: responseData
        })));

    });

}
module.exports = getOutstandingRequestReport;

// let updateItem = function (req, res, next) {
//     let bankid = "SELECT bankid FROM foodbank WHERE site_id = "+"'" + req.body.siteid + "'";
//     let queryString = "UPDATE item SET numberofunits =  "+"'" + req.body.numberofunits + "' WHERE bank_id = bankid";
//     logger.info(queryString);
//     pool.query(queryString, function (error, results, fields) {
//         if (error) throw error;              
//         res.status(200).send(JSON.stringify(results));
//     }); 

// }

//let queryString = "UPDATE item SET numberofunits =  "+"'" + req.body.numberofunits + "' WHERE item_id =  "+"'" + req.body.itemid";
//let queryString = "UPDATE request SET withdrawqty =  "+"'" + req.body.withdrawqty + "' AND status =  "+"'" + req.body.status + "' WHERE item_id =  "+"'" + req.body.itemid";