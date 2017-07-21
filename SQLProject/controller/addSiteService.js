let addSiteService = {
    addShelter: function (req, res, next) {
        let queryString = "INSERT INTO shelter (`id`, `description`, `hoursoperation`, `conditionsforuse`," +
            " `capacity_maleBunk`, `currentused_maleBunk`, `capacity_femaleBunk`, `currentused_femaleBunk`, " +
            "`capacity_mixBunk`, `currentused_mixBunk`, `availableroom`, `site_id`  ) VALUES (" +
            "'" + req.headers.siteid + "', '" + req.body.description + "', '" + req.body.hoursoperation + "', '" +
            req.body.conditionsforuse + "', '" + req.body.capacity_maleBunk + "', 0, '" +
            req.body.capacity_femaleBunk + "', 0, '" + req.body.capacity_mixBunk + "', 0, '" +
            req.body.availableroom + "', '" + req.headers.siteid + "' )";

        logger.info(queryString);
        pool.query(queryString, function (error, results, fields) {
            if (error) throw error;
            res.status(200).send(JSON.stringify(results));
        });

    },

    addSoupkitchen: function (req, res, next) {
        let queryString = "INSERT INTO soupkitchen (`id`, `seatcount`, `capacity`, `description`, `hoursoperation`, `conditionsforuse`, `site_id` ) VALUES (" +
            "'" + req.headers.siteid + "', '" + req.body.seatcount + "', '" + req.body.capacity + "', '" + req.body.description + "', '" + req.body.hoursoperation + "', '" + req.body.conditionsforuse + "', '" + req.headers.siteid + "' )"

        logger.info(queryString);
        pool.query(queryString, function (error, results, fields) {
            if (error) throw error;
            res.status(200).send(JSON.stringify(results));
        });
    },

    addFoodpantry: function (req, res, next) {
        let queryString = "INSERT INTO foodpantry (`id`, `description`, `hoursoperation`, `conditionsforuse`, `site_id` ) VALUES (" +
            "'" + req.headers.siteid + "', '" + req.body.description + "', '" + req.body.hoursoperation + "', '" + req.body.conditionsforuse + "', '" + req.headers.siteid + "' )"

        logger.info(queryString);
        pool.query(queryString, function (error, results, fields) {
            if (error) throw error;
            res.status(200).send(JSON.stringify(results));
        });
    },


    addFoodbank: function (req, res, next) {
        let queryString = "INSERT INTO foodbank (bank_id, `site_id`) VALUES (" +
            "'" + req.headers.siteid + "', '" + req.headers.siteid + "' )"

        logger.info(queryString);
        pool.query(queryString, function (error, results, fields) {
            if (error) throw error;
            res.status(200).send(JSON.stringify(results));
        });
    }
}



module.exports = addSiteService;