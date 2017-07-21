var async = require('async')
let updateWaitList = function (req, res, next) {

    let newList = req.body.waitlist
    async.forEach(newList, function (item, callback) {
        let ind = -1;
        for (var i = 0; i < newList.length; i++) {
            if (newList[i].id === item.id) {
                ind = i;
                break;
            }
        }
        if (ind != -1) {
            let updateString = "UPDATE waitlist SET rank =  '" + ind + "' WHERE id = '" + item.id + "'"
            logger.info(updateString);
            pool.query(updateString, function (error, results, fields) {
                if (error) throw error;
                callback()
            })
        } else {
            callback()
        }

    }, function (err) {
        if (err) throw err
        res.status(200).send();
    })

}


module.exports = updateWaitList;