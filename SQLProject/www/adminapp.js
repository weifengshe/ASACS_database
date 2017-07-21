
var adminApp = angular.module('adminApp',['ui.router','ui.sortable']);

adminApp.config(['$urlRouterProvider', '$stateProvider',function($urlRouterProvider, $stateProvider){
	
	console.log('start');

	$urlRouterProvider.otherwise('/welcome');

    $stateProvider
    .state('welcome', {
        url: '/welcome',
        controller:'adminController',
        templateUrl: 'welcome.html'
    })

	.state('sitemanagement', {
		url:'/sitemanagement',
		controller:'adminController',
		templateUrl: 'sitemanagement.html'
	})
	.state('itemmanagement', {
		url:'/itemmanagement',
		controller:'adminController',
		templateUrl: 'itemmanagement.html'
	})

	.state('sitemanagement.service', {
		url:'/service',
		controller:'adminController',
		templateUrl: 'service_detail.html'
	})

	.state('sitemanagement.shelter', {
		url:'/shelter',
		controller:'adminController',
		templateUrl: 'sheltermanagement.html'
	})

	.state('sitemanagement.bank', {
		url:'/bank',
		controller:'adminController',
		templateUrl: 'add_item.html'
	})
	.state('sitemanagement.client', {
		url:'/client',
		controller:'adminController',
		templateUrl: 'clientreport.html'
	})
	.state('sitemanagement.waiting', {
		url:'/waiting',
		controller:'adminController',
		templateUrl: 'waitinglistreport.html'
	})

	.state('sitemanagement.addshelter', {
		url:'/addshelter',
		controller:'adminController',
		templateUrl: 'add_shelter.html'
	})
	.state('sitemanagement.addfoodbank', {
		url:'/addfoodbank',
		controller:'adminController',
		templateUrl: 'add_foodbank.html'
	})
	.state('sitemanagement.addfoodpantry', {
		url:'/addfoodpantry',
		controller:'adminController',
		templateUrl: 'add_foodpantry.html'
	})
	.state('sitemanagement.addsoupkitchen', {
		url:'/addsoupkitchen',
		controller:'adminController',
		templateUrl: 'add_soupkitchen.html'
	})

	.state('sitemanagement.editshelter', {
		url:'/editshelter',
		controller:'adminController',
		templateUrl: 'edit_shelter.html'
	})
	.state('sitemanagement.editfoodpantry', {
		url:'/editfoodpantry',
		controller:'adminController',
		templateUrl: 'edit_foodpantry.html'
	})
	.state('sitemanagement.editsoupkitchen', {
		url:'/editsoupkitchen',
		controller:'adminController',
		templateUrl: 'edit_soupkitchen.html'
	})
	.state('sitemanagement.modifyroom', {
		url:'/modifyroom',
		controller:'adminController',
		templateUrl: 'edit_shelter_room.html'
	})
	.state('sitemanagement.checkin', {
		url:'/checkin',
		controller:'adminController',
		templateUrl: 'clientreport.html'
	})
	.state('sitemanagement.checkout', {
		url:'/sheltercheckout',
		controller:'adminController',
		templateUrl: 'shelter_checkout.html'
	})
	.state('sitemanagement.checkinclient', {
		url:'/checkinclient/:client_id',
		controller:'adminController',
		templateUrl: 'add_log.html'
	})

	.state('sitemanagement.editclient', {
		url:'/editclient/:client_id/:fullname/:description/:phonenumber/:idnumber',
		//url:'/editclient/:client_id',
		controller:'adminController',
		templateUrl: 'edit_client.html'
	})

	.state('sitemanagement.addclient', {
		url:'/addclient',
		controller:'adminController',
		templateUrl: 'add_client.html'
	})


	.state('itemmanagement.itemsearch', {
		url:'/itemmanagement',
		controller:'adminController',
		templateUrl: 'itemreport.html'
	})
	.state('itemmanagement.requestreport', {
		url:'/requestreport',
		controller:'adminController',
		templateUrl: 'requestreport.html'
	})
	.state('itemmanagement.outstandingreport', {
		url:'/outsandingreport/:site_id',
		controller:'adminController',
		templateUrl: 'outstandingreport.html'
	})


	.state('login', {
		url:'/login',
		controller:'adminController',
		templateUrl: 'login.html'
	})	

}]);
 
