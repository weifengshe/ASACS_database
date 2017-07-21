var myApp = angular.module('myApp');

myApp.controller('SitesController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('SitesController loaded...');

	$scope.getSites = function(){
	
		$http.get('/api/sites/').then(function(response){
			
			$scope.sites = response.data;
			//console.log($scope.sites);

		});
	}

}]);