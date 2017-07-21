var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'HomePageController',
		templateUrl: 'views/home.html'
	})
	.when('/home', {
		controller:'HomePageController',
		templateUrl: 'views/home.html'
	})
	.when('/home/meal', {
		controller:'HomePageController',
		templateUrl: 'views/mealreport.html'
	})
	.when('/home/bunks', {
		controller:'HomePageController',
		templateUrl: 'views/bunks.html'
	})
	.when('/admindashboard.html/baidu', {
		controller:'SidebarController',
		templateUrl: 'welcome.html'
	})
	.when('/sites', {
		controller:'SitesController',
		templateUrl: 'views/sites.html'
	})
	.otherwise({
		redirectTo: '/'
		})	
	
});