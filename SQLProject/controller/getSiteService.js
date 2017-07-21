// let getSiteService = function (req, res, next) {
//    // let queryString = "SELECT * FROM shelter, foodpantry, soupkitchen, foodbank WHERE shelter.site_id = "+"'" + req.params.siteid + "'"; 
//    //let queryString = "SELECT * FROM (shelter AS s INNER JOIN foodpantry AS p ON s.site_id= p.site_id)" +
//         " INNER JOIN foodbank AS b ON s.site_id= b.site_id INNER JOIN soupkitchen AS k ON s.site_id= k.site_id WHERE s.site_id = '" + req.params.siteid + "' OR p.site_id = '" + req.params.siteid + "' OR b.site_id = '" + req.params.siteid + "' OR k.site_id = '" + req.params.siteid + "'";
   

// }
const Promise = require('bluebird')

let getSiteService = function (req, res, next) {
    let queryStrings = "SELECT * FROM shelter WHERE site_id = "+"'" + req.headers.siteid + "'";
    let queryStringp = "SELECT * FROM foodpantry WHERE site_id = "+"'" + req.headers.siteid + "'";
    let queryStringk = "SELECT * FROM soupkitchen WHERE site_id = "+"'" + req.headers.siteid + "'";
    let queryStringb = "SELECT * FROM foodbank WHERE site_id = "+"'" + req.headers.siteid + "'";
    let result = {}
    new Promise((resolve, reject) => {

        pool.query(queryStrings, function (error, results, fields) {

            result.s = results[0]
            if (error) reject(error);
            resolve();
        })
    }).then(() => {
        return new Promise((resolve, reject) => {

            pool.query(queryStringp, function (error, results, fields) {
                result.p = results[0]
                if (error) reject(error);
                resolve()
            })
        })

    }).then(() => {
        return new Promise((resolve, reject) => {
            pool.query(queryStringk, function (error, results, fields) {
               result.k = results[0]
                if (error) reject(error);
                resolve()
            })
        })
}).then(() => {
        return new Promise((resolve, reject) => {
            pool.query(queryStringb, function (error, results, fields) {
                result.b = results[0]
                if (error) reject(error);
                resolve()
            })
        })
    }).then(() => {

        
        let responseData = {
            shelter: result.s,
            foodpantry: result.p,
            soupkitchen: result.k,
            foodbank: result.b
        }
        res.status(200).send(JSON.stringify(responseData));
    }).catch((err => {
        res.status(500).send()
    }))





}
   
module.exports = getSiteService;
