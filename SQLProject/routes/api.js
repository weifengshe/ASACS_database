var express = require('express');
var router = express.Router();
const getSites = require('../controller/getSites');
const getItemSearch = require('../controller/getItemSearch');
const getItemByID = require('../controller/getItemByID');
const getAvailableBunkRoom = require('../controller/getAvailableBunkRoom');
const getMealRemaining = require('../controller/getMealRemaining');
const getSiteService = require('../controller/getSiteService');
const editSiteService = require('../controller/editSiteService');
const addSiteService = require('../controller/addSiteService');
const deleteSiteService = require('../controller/deleteSiteService');

const updateRoomNum = require('../controller/updateRoomNum');
const updateBunkNum = require('../controller/editSiteService');
const getClientSearch = require('../controller/getClientSearch');
const addClient = require('../controller/addClient');
const updateClient = require('../controller/updateClient');
const addLog = require('../controller/addLog');
const updateLog = require('../controller/updateLog');
const getWaitListReport = require('../controller/getWaitListReport');
const addWaitList = require('../controller/addWaitList');
const deleteWaitList = require('../controller/deleteWaitList');
const updateWaitList = require('../controller/updateWaitList');
const getOutstandingRequestReport = require('../controller/getOutstandingRequestReport');
const getRequestStatusReport = require('../controller/getRequestStatusReport');
const addItem = require('../controller/addItem');
const updateItem = require('../controller/updateItem');
const addRequest = require('../controller/addRequest');
const fulfillRequest = require('../controller/fulfillRequest');
const getLogin = require('../controller/getLogin');
const getClientReport = require('../controller/getClientReport');
const checkInClient = require('../controller/checkInClient');
const checkOutClient = require('../controller/checkOutClient');
const deleteRequest = require('../controller/deleteRequest');
const deleteFoodbank = require('../controller/deleteFoodbank');
const deleteItem = require('../controller/deleteItem');

// will support query for other used in future if take admin-clerk mode into consideration. 
router.get('/sites/:siteid', function (req, res, next) {
    logger.info(req.params.siteid);
    getSites(req, res, next);
});

router.get('/item/:itemid', function (req, res, next) {
    logger.info(req.params.itemid);
    getItemByID(req, res, next);
});

router.get('/remainingmeal', function (req, res, next) {
  getMealRemaining(req, res, next);
});


router.get('/availablebunkroom', function (req, res, next) {  
    getAvailableBunkRoom(req, res, next);
});

router.get('/login', function (req, res, next) {  
    getLogin(req, res, next);
});

router.get('/siteservice', function (req, res, next) {
    
    getSiteService(req, res, next);
});
// edit different service types
// router.put('/siteserviceedit/:siteid', function (req, res, next) {
//     logger.info(req.body);
//     editSiteService(req, res, next);
// });
router.put('/siteservice/shelter', function (req, res, next) {
    logger.info(req.body);
    editSiteService.updateShelter(req, res, next);
});

router.put('/siteservice/soupkitchen', function (req, res, next) {
    logger.info(req.body);
    editSiteService.updateSoupkitchen(req, res, next);
});

router.put('/siteservice/foodpantry', function (req, res, next) {
    logger.info(req.body);
    editSiteService.updateFoodpantry(req, res, next);
});

router.put('/siteservice/foodbank', function (req, res, next) {
    logger.info(req.body);
    editSiteService.updateFoodbank(req, res, next);
});


// add different service types
router.post('/siteservice/shelter', function (req, res, next) {
    logger.info(req.body);
    addSiteService.addShelter(req, res, next);
});

router.post('/siteservice/soupkitchen', function (req, res, next) {
    logger.info(req.body);
    addSiteService.addSoupkitchen(req, res, next);
});

router.post('/siteservice/foodpantry', function (req, res, next) {
    logger.info(req.body);
    addSiteService.addFoodpantry(req, res, next);
});

router.post('/siteservice/foodbank', function (req, res, next) {
    logger.info(req.body);
    addSiteService.addFoodbank(req, res, next);
});

// router.delete('/siteservice/:siteid', function (req, res, next) {
//     logger.info(req.body);
//     deleteSiteService(req, res, next);
// });
// delete different service types
router.delete('/siteservice/shelter', function (req, res, next) {
    logger.info(req.body);
    deleteSiteService.deleteShelter(req, res, next);
});

router.delete('/siteservice/soupkitchen', function (req, res, next) {
    logger.info(req.body);
    deleteSiteService.deleteSoupkitchen(req, res, next);
});

router.delete('/siteservice/foodpantry', function (req, res, next) {
    logger.info(req.body);
    deleteSiteService.deleteFoodpantry(req, res, next);
});

router.delete('/siteservice/foodbank', function (req, res, next) {
    logger.info(req.body);
    deleteFoodbank(req, res, next);
});

router.put('/clientcheckin', function (req, res, next) {
     logger.info(req.body);
    checkInClient(req, res, next);
});

router.put('/clientcheckout', function (req, res, next) {
     logger.info(req.body);
    checkOutClient(req, res, next);
});


router.put('/updateroom', function (req, res, next) {
     logger.info(req.body);
    updateRoomNum(req, res, next);
});

router.put('/updatebunk', function (req, res, next) {
     logger.info(req.body);
    updateBunkNum(req, res, next);
});

router.post('/client', function (req, res, next) {
    logger.info(req.body.string);
    getClientSearch(req, res, next);
});

router.get('/client/:clientid', function (req, res, next) {
    logger.info(req.params.clientid);
    getClientReport(req, res, next);
});

router.post('/newclient', function (req, res, next) {
    logger.info(req.body);
    addClient(req, res, next);
});

router.put('/client', function (req, res, next) {
    logger.info(req.body);
    updateClient(req, res, next);
});

router.post('/log', function (req, res, next) {
    logger.info(req.body);
    addLog(req, res, next);
});

router.put('/log', function (req, res, next) {
    logger.info(req.body);
    updateLog(req, res, next);
});

router.post('/item', function (req, res, next) {
    logger.info(req.body.description);
    getItemSearch(req, res, next);
});

router.post('/newitem', function (req, res, next) {
    logger.info(req.body);
    addItem(req, res, next);
});

router.put('/item', function (req, res, next) {
    logger.info(req.body);
    updateItem(req, res, next);
});

router.delete('/item', function (req, res, next) {
    logger.info(req.body);
    deleteItem(req, res, next);
});

router.post('/request', function (req, res, next) {
    logger.info(req.body);
    addRequest(req, res, next);
});

router.delete('/request', function (req, res, next) {
    logger.info(req.body);
    deleteRequest(req, res, next);
});


router.get('/waitlistreport', function (req, res, next) {
    getWaitListReport(req, res, next);
});

router.post('/waitlist', function (req, res, next) {
    logger.info(req.body);
    addWaitList(req, res, next);
});

router.delete('/waitlist', function (req, res, next) {
    logger.info(req.body);
    deleteWaitList(req, res, next);
});

router.put('/waitlist', function (req, res, next) {
    logger.info(req.body);
    updateWaitList(req, res, next);
});

router.post('/outstandingrequestreport/:siteid', function (req, res, next) {
    logger.info(req.body);
    getOutstandingRequestReport(req, res, next);
});

router.put('/requestfulfill', function (req, res, next) {
    logger.info(req.body);
    fulfillRequest(req, res, next);
});

router.get('/requeststatusreport', function (req, res, next) {
    
    getRequestStatusReport(req, res, next);
});

module.exports = router;