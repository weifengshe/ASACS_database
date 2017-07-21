var myApp = angular.module('myApp');

myApp.controller('HomePageController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('HomePageController loaded...');

	getHttpHeader =function(){
		var header = {};
		header["Content-Type"] = "application/json";
		//header["x-access-token"] = currentUser.accessToken;
		header["user"] = "d";
		header["password"] = "2";	
		return header;	

	}

	$scope.getReport = function(){

		var header = getHttpHeader();

		//
		$http.get('/api/remainingmeal',{headers:header}).then(function(response){
		

		//$http.get('/api/remainingmeal').then(function(response){
			console.log('remainingmeal');

			$scope.mealRemain = response.data.Data.mealRemain;
			$scope.vegetable = response.data.Data.vegetable;
			$scope.protein= response.data.Data.protein;
			$scope.nuts = response.data.Data.nuts;
			
		});
	}


	$scope.getBunks = function(){

		var header = getHttpHeader();

		$http.get('/api/availablebunkroom',{headers:header}).then(function(response){
			console.log('bunksreport');
			console.log(response);
			$scope.shelters = response.data.Data.shelters;	

		});
	}


	$scope.getBunks1 = function(){
	
			console.log('bunksreport1');
			$scope.number = "10";
			console.log($scope.number);
	}

}]);


