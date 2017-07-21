
let deleteSiteService = {
    // deleteShelter: function (req, res, next) {
    //     let queryString = "DELETE FROM shelter WHERE site_id = '" + req.headers.siteid + "'"
    //     logger.info(queryString);
    //     pool.query(queryString, function (error, results, fields) {
    //         if (error)
    //             throw error;
    //         res
    //             .status(200)
    //             .send("Successful deletion");
    //     });

    // },

    deleteSoupkitchen: function (req, res, next) {
        let queryString = "DELETE FROM soupkitchen WHERE site_id = '" + req.headers.siteid + "'"

        logger.info(queryString);
        pool.query(queryString, function (error, results, fields) {
            if (error)
                throw error;
            res
                .status(200)
                .send("Successful deletion");
        });
    },

    deleteFoodpantry: function (req, res, next) {
        let queryString = "DELETE FROM foodpantry WHERE site_id = '" + req.headers.siteid + "'"
        logger.info(queryString);
        pool.query(queryString, function (error, results, fields) {
            if (error)
                throw error;
            res
                .status(200)
                .send("Successful deletion");
        });
    },

    deleteShelter: function (req, res, next) {
        let queryString1 = "DELETE FROM shelter WHERE site_id = '" + req.headers.siteid + "'"
        let queryString2 = "DELETE FROM waitlist WHERE site_id = '" + req.headers.siteid + "'"
       
    new Promise((resolve, reject) => {

            pool.query(queryString1, function (error, results, fields) {
                if (error) reject(error);
                resolve();
            })

        }).then(() => {
            return new Promise((resolve, reject) => {
                pool.query(queryString2, function (error, results, fields) {
                    if (error) reject(error);
                    resolve()
                })
            })

        }).then(() => {
            res.status(200).send("Shelter is deleted")
        })
        .catch((err => {
            res.status(500).send()
        }))
}

}
module.exports = deleteSiteService;