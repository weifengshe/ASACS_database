let editSiteService = {
    updateShelter: function (req, res, next) {
        let queryString = "UPDATE shelter SET description =  "+"'" + req.body.description + "', hoursoperation =  "+"'" + req.body.hoursoperation + "', conditionsforuse =  "+"'" + req.body.conditionsforuse + "', capacity_maleBunk = '" + req.body.capacity_maleBunk + "', capacity_femaleBunk = '" + req.body.capacity_femaleBunk + "', capacity_mixBunk  =  '" + req.body.capacity_mixBunk + "', availableroom =  '" + req.body.availableroom + "' WHERE site_id = '" + req.headers.siteid + "'";

        logger.info(queryString);
        pool.query(queryString, function (error, results, fields) {
            if (error) throw error;
            res.status(200).send("Successful edit");
        });

    },
   

    updateSoupkitchen: function (req, res, next) {
        let queryString = "UPDATE soupkitchen SET seatcount =  '" + req.body.seatcount + "', capacity =  '" + req.body.capacity + "', description =  '" + req.body.description + "', hoursoperation =  '" + req.body.hoursoperation + "', conditionsforuse =  '" + req.body.conditionsforuse + "'  WHERE site_id = '" + req.headers.siteid + "'";

        logger.info(queryString);
        pool.query(queryString, function (error, results, fields) {
            if (error) throw error;
            res.status(200).send("Successful edit");
        });
    },

        updateFoodpantry: function (req, res, next) {
         let queryString = "UPDATE foodpantry SET description =  "+"'" + req.body.description + "', hoursoperation =  "+"'" + req.body.hoursoperation + "', conditionsforuse =  "+"'" + req.body.conditionsforuse + "' WHERE site_id = " + "'" + req.headers.siteid + "'";
   
        logger.info(queryString);
        pool.query(queryString, function (error, results, fields) {
            if (error) throw error;
            res.status(200).send("Successful edit");
        });
    },


        updateFoodbank: function (req, res, next) {
         let queryString = "UPDATE foodbank SET site_id =  "+"'" + req.body.site_id + "' WHERE site_id = " + "'" + req.headers.siteid + "'";

        logger.info(queryString);
        pool.query(queryString, function (error, results, fields) {
            if (error) throw error;
            res.status(200).send("Successful edit");
        });
    }
}



module.exports = editSiteService;