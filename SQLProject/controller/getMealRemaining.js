const Promise = require('bluebird')

let getMealRemaining = function (req, res, next) {
    let queryStringNuts = "SELECT SUM(numberofunits) FROM item " +
        "WHERE subcategoryname = 'nuts' OR subcategoryname = 'grains' OR subcategoryname = 'beans' "
    let queryStringVeg = "SELECT SUM(numberofunits) FROM item " +
        "WHERE subcategoryname = 'vegetables' "
    let queryStringMeat = "SELECT SUM(numberofunits) FROM item " +
        "WHERE subcategoryname = 'meat' OR subcategoryname = 'seafood' OR subcategoryname = 'dairy' OR subcategoryname = 'eggs' "
    let result = {}
    new Promise((resolve, reject) => {

        pool.query(queryStringNuts, function (error, results, fields) {

            result.nuts = results[0]["SUM(numberofunits)"]
            resolve()
        })
    }).then(() => {
        return new Promise((resolve, reject) => {

            pool.query(queryStringVeg, function (error, results, fields) {
                result.veg = results[0]["SUM(numberofunits)"]
                resolve()
            })
        })

    }).then(() => {
        return new Promise((resolve, reject) => {
            pool.query(queryStringMeat, function (error, results, fields) {
                result.meat = results[0]["SUM(numberofunits)"]
                resolve()
            })
        })

    }).then(() => {

        let maxMeal = Math.max(result.nuts, result.meat, result.veg);
        let minMeal = Math.min(result.nuts, result.meat, result.veg);
        let responseData = {
            mealRemain: minMeal,
            vegetable: maxMeal - result.veg,
            protein: maxMeal - result.meat,
            nuts: maxMeal - result.nuts
        }
        res.status(200).send(JSON.stringify(Object.assign({},{Data:responseData})));
    }).catch((err => {
        res.status(500).send()
    }))





}
module.exports = getMealRemaining

// async.each(queryStrings, (query, callback) => {
//         logger.info(query);
//         pool.query(query, function (error, results, fields, query) {
//             if (error) throw error;
//             callback()
//         })
//     }
//     , (err) => {
//         if (!err) res.status(500).send()
//         else {
//             res.status(200).send(JSON.stringify(results));
//         }
//     })