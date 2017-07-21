var forEach = require('async').forEach;

let getItemSearch = function (req, res, next) {

    let queryString1 = "SELECT * FROM item WHERE name LIKE '%" + req.body.searchstring + "%' ";
    // AND storagetype LIKE '%" + req.body.storagetype + "%' AND categoryname LIKE '%" + req.body.categoryname + "%' AND subcategoryname LIKE '%" + req.body.subcategoryname + "%' AND expirationdate > ' + req.body.expirationdate + '
    let whereclause = '';
    if (req.body.storagetype && req.body.storagetype != '') {
        whereclause = "AND storagetype =  +  '" + req.body.storagetype + "'"
    }

    if (req.body.categoryname && req.body.categoryname != '') {
        whereclause = "AND categoryname =  +  '" + req.body.categoryname + "'"
    }

    if (req.body.subcategoryname && req.body.subcategoryname != '') {
        whereclause = "AND subcategoryname =  +  '" + req.body.subcategoryname + "'"
    }


    if (req.body.expirationdatefrom && req.body.expirationdatefrom != '') {
        whereclause = "AND expirationdate >  +  '" + req.body.expirationdatefrom + "'"
    }

    if (req.body.expirationdateto && req.body.expirationdateto != '') {
        whereclause = "AND expirationdate <  +  '" + req.body.expirationdateto + "'"
    }

    if (req.body.expirationdatefrom && req.body.expirationdateto && req.body.expirationdatefrom != '' && req.body.expirationdatefrom != '') {
        whereclause = "AND expirationdate >  +  '" + req.body.expirationdatefrom + "'" + "AND expirationdate <  +  '" + req.body.expirationdateto + "'"
    }


    queryString = queryString1 + whereclause;

    logger.info(queryString);
    pool.query(queryString, function (error, results, fields) {
        if (error) throw error;
        let responseData = {
            item: []
        };

        for (i = 0; i < results.length; i++) {

            let fdata = results[i];

            responseData.item.push({
                "item_id": fdata.item_id,
                "name": fdata.name,
                "numberofunits": fdata.numberofunits,
                "categoryname": fdata.categoryname,
                "subcategoryname": fdata.subcategoryname,
                "expirationdate": fdata.expirationdate,
                "storagetype": fdata.storagetype,
                "bank_id": fdata.bank_id
            })
        };


        forEach(responseData.item, function (entity, callback) {
            let string = "SELECT * FROM foodbank WHERE bank_id = '" + entity.bank_id.toString() + "'"

            logger.info(string);
            pool.query(string, function (error, results, fields) {
                if (error) throw error;

                results.forEach(function (result) {
                    if (result.site_id === req.headers.siteid) {
                        entity.selfSite = true
                    } else {
                        entity.selfSite = false
                    }
                }, this);
                callback();
            })
        }, function () {

            res.status(200).send(JSON.stringify(Object.assign({}, {
                Data: responseData
            })));
        })
    })
}

module.exports = getItemSearch;