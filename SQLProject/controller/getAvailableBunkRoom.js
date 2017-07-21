let getAvailableBunkRoom = function (req, res, next) {
    let queryString = "SELECT `shortname`, `streetAddress`, `city`, `phonenumber`, `hoursoperation`, `conditionsforuse`, `capacity_maleBunk`, `capacity_femaleBunk`, `capacity_mixBunk`, `currentused_maleBunk`, `currentused_femaleBunk`, `currentused_mixBunk`, `availableroom` FROM (shelter INNER JOIN site ON shelter.site_id = site.site_id)";
    logger.info(queryString);
    pool.query(queryString, function (error, results, fields) {
        if (error) throw error; 
        let responseData = {shelters:[]};

       for(i=0; i<results.length; i++) {    

       let fdata = results[i]; 
       let femaleBunk = fdata.capacity_femaleBunk - fdata.currentused_femaleBunk;
       let maleBunk = fdata.capacity_maleBunk - fdata.currentused_maleBunk;
       let mixBunk = fdata.capacity_mixBunk - fdata.currentused_mixBunk;
       let room = fdata.availableroom;  
       if ((femaleBunk + maleBunk + mixBunk + room) != 0 ) {
      responseData.shelters.push({ 
         "siteName": fdata.shortname,
           "locations": fdata.streetAddress,
           "phoneNumber": fdata.phonenumber,
           "hours": fdata.hoursoperation,
           "conditions": fdata.conditionsforuse,
            "femaleBunk": femaleBunk,
            "maleBunk":  maleBunk,
            "mixedBunk": mixBunk,
            "room": room
      })};
      };
          //res.status(200).send(JSON.stringify(responseData));  
           res.status(200).send(JSON.stringify(Object.assign({},{Data:responseData})));         
        
    }); 
  
}


module.exports = getAvailableBunkRoom;


