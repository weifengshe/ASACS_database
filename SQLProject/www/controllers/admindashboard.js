var adminApp = angular.module('adminApp');

console.log('adminController before loaded...');

adminApp.controller('adminController', ['$rootScope','$scope', '$http', '$location', '$stateParams', '$state', function($rootScope,$scope, $http, $location, $stateParams,$state){
			console.log('adminController loaded...');
    

			checkLogin();
			function checkLogin(){
				if (!$rootScope.loggedInUser) $rootScope.loggedInUser = {}				
				if (!$rootScope.loggedInUser.userName){
					$state.go("login")
				}				
			}
			getHttpHeader =function(){
				var header = {};
				header["Content-Type"] = "application/json";
				//header["x-access-token"] = currentUser.accessToken;
				header["user"] = $scope.loggedInUser.userName ? $scope.loggedInUser.userName : ''
				header["password"] = $scope.loggedInUser.password ? $scope.loggedInUser.password : ''
				return header;	

			};
			
			$scope.startsort = function(){

				var tmpList = [];
				$scope.list = [];	
				$scope.newlist = [];


				var header = getHttpHeader();
				

				$http.get('/api/waitlistreport',{headers:header}).then(function(response){
					//tmpList = response.data.Data.waitlist;
					$scope.list = response.data.Data.waitlist;
					//console.log("ee");
				//	console.log($scope.list);

  				  	tmpList =  $scope.list;				 	 
				  
				  	$scope.sortableOptions = {

					    stop: function(e, ui) {
					      var logEntry = tmpList.map(function(i){
					        return i;
					     });
					      $scope.temp = {};
					  
					      $scope.temp.waitlist = logEntry;
			     
					      /*$scope.temp.waitlist = logEntry;*/
					      console.log( $scope.temp);
							var req2 = {
								method: 'PUT',
								url: '/api/waitlist',
								headers: header,
								data: $scope.temp
							}					
							$http(req2).then(function(response){
									if (response.status == 200){
										//$scope.successresult = "on";
										//$scope.successresult = "on";
										console.log("successresult");
										$state.reload();
									}else{
										//$scope.successresult = "off";
										$state.reload();
									}

							});
					    }
				  };


				});

			}


			$scope.removeWaiting = function(i){
				var header = getHttpHeader();			
				console.log(i);
				$scope.D = {};
				$scope.D.id = i;
				var req = {
					method: 'DELETE',
					url: '/api/waitlist',
					headers: header,
					data: $scope.D
				}					
				$http(req).then(function(response){
					if (response.status == 200){
										//$scope.successresult = "on";
										//$scope.successresult = "on";
										//console.log($scope.item.bank_id);
						$state.reload();
					}else{
						$scope.successresult = "off";
						//$state.reload();
					}

				});		
			}



		$scope.getReqReport = function(){
			
				$scope.requestReport=[]
				var header = getHttpHeader();

				$http.get('/api/requeststatusreport',{headers:header}).then(function(response){
					console.log('status');
					console.log(response.data.Data);
					$scope.requestReport = response.data.Data.requeststatus;


				});

		};		

		$scope.cancelReq = function(i){
		
					var header = getHttpHeader();
					console.log(i);
					$scope.D = {};
					$scope.D.requestid = i;
					var req = {
						method: 'DELETE',
						url: '/api/request',
						headers: header,
						data: $scope.D
					}					
					$http(req).then(function(response){
							if (response.status == 200){
								//$scope.successresult = "on";
								//$scope.successresult = "on";
								//console.log($scope.item.bank_id);
								$state.reload();
							}else{
								$scope.successresult = "off";
								//$state.reload();
							}

					});		
		}
			
		$scope.getOutReport = function(){
			
				$scope.outReport=[];
				var header = getHttpHeader();
				$scope.siteid = {};
				$scope.editstatus="off";
				$scope.successresult == {};



				$scope.siteid = $state.params.site_id;
 				$scope.sortType   = 'requestedqty'; // set the default sort type
  				//$scope.sortReverse  = false;  // set the default sort order
  				//$scope.searchFish   = '';     // set the default search/filter term
				$scope.outstanding = {};
				$scope.outstanding.storagetype = 'requestedqty';
				// $scope.outstanding.sortReverse = false;			
					var req = {
						method: 'POST',
						url: '/api/outstandingrequestreport/' + $scope.siteid,
						headers: header,
						data: $scope.outstanding
					}	

								
					$http(req).then(function(response){
							if (response.status == 200){
								//$scope.successresult = "on";
								//$scope.successresult = "on";
								//console.log($scope.item.bank_id);
								console.log(response.data.Data)	

								$scope.outReport =response.data.Data.report;
								//$state.reload();
							}else{
								$scope.successresult = "off";
									
								//$state.reload();
							}

					});	
				




				$scope.refreshout = function( i, j){

					$scope.sortType   = i;
					$scope.sortReverse = j;
					$scope.outstanding = {};
					if(i == 'storagetype'){
						$scope.outstanding.storagetype = 'storagetype';

					}else if(i == 'categoryname'){
						$scope.outstanding.categoryname = 'categoryname';
					}else if(i == 'subcategoryname'){
						$scope.outstanding.subcategoryname = 'subcategoryname';
					}else if(i == 'requestedqty'){
						$scope.outstanding.requestedqty = 'requestedqty';
					}

					//$scope.outstanding.sortReverse = j;
					var req = {
						method: 'POST',
						url: '/api/outstandingrequestreport/' + $scope.siteid,
						headers: header,
						data: $scope.outstanding
					}					
					$http(req).then(function(response){
							if (response.status == 200){
								//$scope.successresult = "on";
								//$scope.successresult = "on";
								//console.log($scope.item.bank_id);
								//$state.reload();
								$scope.outReport =response.data.Data.report;
							}else{
								$scope.successresult = "off";
								//$state.reload();
							}

					});	

				}





				$scope.displayForm = function(i){
					
					$scope.editstatus="on";
					$scope.filrqs = $scope.outReport[i];

				};


				$scope.accept = function(i,j,k){
				
					$scope.filrq ={};
					$scope.filrq.status = {};
					$scope.filrq.requestid = {};
					$scope.filrq.fulfillqty = {};
					$scope.filrq.item_id = {};

					$scope.filrq.status = "closed";
					$scope.filrq.requestid = i;
					$scope.filrq.fulfillqty = j;
					$scope.filrq.item_id = k;
				
					var req = {
						method: 'PUT',
						url: '/api/requestfulfill',
						headers: header,
						data: $scope.filrq
					}					
					$http(req).then(function(response){
							if (response.status == 200){
								//$scope.successresult = "on";
								//$scope.successresult = "on";
								//console.log($scope.item.bank_id);
								$state.reload();
							}else{
								$scope.successresult = "off";
								//$state.reload();
							}

					});


				};
				$scope.partial = function(){
					console.log("submitpatial");
					console.log($scope.partialqty);

					$scope.filrq ={};
					$scope.filrq.status = {};
					$scope.filrq.requestid = {};
					$scope.filrq.fulfillqty = {};
					$scope.filrq.item_id = {}

					$scope.filrq.status = "closed";
					$scope.filrq.requestid = $rootScope.outid;
					$scope.filrq.fulfillqty = $scope.partialqty;
					$scope.filrq.item_id = $rootScope.outitemid;				
					var req = {
						method: 'PUT',
						url: '/api/requestfulfill',
						headers: header,
						data: $scope.filrq
					}					
					$http(req).then(function(response){
							if (response.status == 200){
								//$scope.successresult = "on";
								//$scope.successresult = "on";
								//console.log($scope.item.bank_id);
								$state.reload();
							}else{
								$scope.successresult = "off";
								//$state.reload();
							}

					});


				};

				$scope.storeid = function(i,j){
					console.log("storeid");
					$rootScope.outid = i;
					$rootScope.outitemid = j;

					console.log(i);
	

				};




				$scope.deny = function(i){
				
					$scope.filrq ={};
					$scope.filrq.status = {};
					$scope.filrq.requestid = {};
					$scope.filrq.fulfillqty = {};

					$scope.filrq.status = "closed";
					$scope.filrq.requestid = i;
					$scope.filrq.fulfillqty = 0;
				
					var req = {
						method: 'PUT',
						url: '/api/requestfulfill',
						headers: header,
						data: $scope.filrq
					}					
					$http(req).then(function(response){
							if (response.status == 200){
								//$scope.successresult = "on";
								//$scope.successresult = "on";
								//console.log($scope.item.bank_id);
								$state.reload();
							}else{
								$scope.successresult = "off";
								//$state.reload();
							}

					});


				};

				$scope.fulfill = function(i){
					
					$scope.editstatus="on";
					$scope.filrqs = $scope.outReport [i];


					var req = {
						method: 'PUT',
						url: '/api/requestfulfill',
						headers: header,
						data: $scope.filrqs
					}

					$http(req).then(function(response){
						$scope.editstatus="off";
						window.history.back();

					});


				};
		};

					
			$scope.getBunks = function(){

				var header = getHttpHeader();

				$http.get('/api/availablebunkroom',{headers:header}).then(function(response){
					console.log('bunksreport');
					console.log(response);
					$scope.shelters = response.data.Data.shelters;	

				});
			};

			$scope.getService = function(){

				var header = getHttpHeader();
				$scope.shelterState = "Off";
				$scope.soupkitchenState = "Off";
				$scope.foodbankState = "Off";
				$scope.foodpantryState = "Off";
				$scope.count = 0;
				$http.get('/api/siteservice',{headers:header}).then(function(response){
					console.log('siteservice');
					console.log(response);

					if (response.data.hasOwnProperty("shelter") ){
						$scope.shelter = response.data.shelter;
						$scope.shelterState = "On";
						$scope.count ++;
					}else{
						$scope.shelterState = "Off";
					}

					if (response.data.hasOwnProperty("soupkitchen") ){
						$scope.count ++;
						$scope.soupkitchen  = response.data.soupkitchen ;
						$scope.soupkitchenState = "On";
					}else{
						$scope.soupkitchenState = "Off";
					}			

					if (response.data.hasOwnProperty("foodbank") ){
						$scope.count ++;
						$scope.foodbank = response.data.foodbank ;
						$scope.foodbankState = "On";
					}else{
						$scope.foodbankState = "Off";
					}		
					if (response.data.hasOwnProperty("foodpantry") ){
						$scope.count ++;
						$scope.foodpantry= response.data.foodpantry;
						$scope.foodpantryState = "On";
					}else{
						$scope.foodpantryState = "Off";
					}					
								
					
				});
			};

			$scope.getClientSearch = function(){

				var header = getHttpHeader();

				//
				$http.get('/api/client',{headers:header}).then(function(response){
				

				//$http.get('/api/client').then(function(response){
					console.log('client');

					$scope.client_id = response.data.Data.client_id;
					$scope.fullname = response.data.Data.fullname;
					$scope.idnumber= response.data.Data.idnumber;
					$scope.description = response.data.Data.description;
					$scope.phonenumber = response.data.Data.phonenumber;
					
				});
			};

			$scope.addShelter = function(){
				var header = getHttpHeader();
				console.log("add Shelter");

				var req = {
					method: 'POST',
					url: '/api/siteservice/shelter',
					headers: header,
					data: $scope.shelter
					}

				$http(req).then(function(response){
					window.history.back();

				});


				//$http.post('/api/siteservice/shelter',$scope.shelter, {headers:header}).then(function(response){
				//	window.location.href='#/';

				//});
			};

			$scope.addFoodpantry = function(){
				var header = getHttpHeader();
				console.log("add foodpantry");

				var req = {
					method: 'POST',
					url: '/api/siteservice/foodpantry',
					headers: header,
					data: $scope.foodpantry
					}

				$http(req).then(function(response){
					window.history.back();

				});
			};

			$scope.addSoupkitchen = function(){
				var header = getHttpHeader();
				console.log("add Soupkitchen");

				var req = {
					method: 'POST',
					url: '/api/siteservice/soupkitchen',
					headers: header,
					data: $scope.soupkitchen
					}

				$http(req).then(function(response){
					window.history.back();

				});
			};


			$scope.addFoodbank = function(){
				var header = getHttpHeader();
				console.log("add foodbank");
				
				var req = {
					method: 'POST',
					url: '/api/siteservice/foodbank',
					headers: header,
					
					}

				$http(req).then(function(response){
					//$scope.foodbankState = "On";
					$state.reload();
				});
			};


			$scope.deleteShelter = function(){
				var header = getHttpHeader();
				$http.delete('/api/siteservice/shelter',{headers:header}).then(function(response){
					if (response.status == 200){
						$scope.shelter = {}
						$scope.shelterState = "Off";
						$scope.count --;
					}

				});
			};

			$scope.deleteFoodbank = function(){
				var header = getHttpHeader();
				console.log("delete foodbank");

				$http.delete('/api/siteservice/foodbank',{headers:header}).then(function(response){
					if (response.status == 200){
						$state.reload();
					}

				});

				
			};

			$scope.deleteFoodpantry = function(){
				var header = getHttpHeader();
				//console.log("add foodbank");

				$http.delete('/api/siteservice/foodpantry',{headers:header}).then(function(response){
					if (response.status == 200){
						$scope.foodpantry = {}
						$scope.foodpantryState = "Off";
						$scope.count --;
					}

				});
			};

			$scope.deleteSoupkitchen = function(){
				var header = getHttpHeader();
				//console.log("add foodbank");

				$http.delete('/api/siteservice/soupkitchen',{headers:header}).then(function(response){
					if (response.status == 200){
						$scope.soupkitchen = {}
						$scope.soupkitchenState = "Off";		
						$scope.count --;
					}

				});
			};


			$scope.getShelter = function(){
				var header = getHttpHeader();

				$http.get('/api/siteservice',{headers:header}).then(function(response){
							console.log('siteservice');
							console.log(response);

					$scope.shelter = response.data.shelter;

				});

				console.log($scope.shelter);

			};

			$scope.updateShelter = function(){
				var header = getHttpHeader();
				console.log("update Shelter");

				var req = {
					method: 'PUT',
					url: '/api/siteservice/shelter',
					headers: header,
					data: $scope.shelter
					}

				$http(req).then(function(response){
					window.history.back();

				});

			};



			$scope.updateShelterRoom = function(){
				var header = getHttpHeader();
				console.log("update ShelterRoom");
				$scope.updateroom = {};
				$scope.updateroom.male = 0;
				$scope.updateroom.female = 0;				
				$scope.updateroom.mix = 0;
				$scope.updateroom.availableroom = -1 * $scope.updaterooms.availableroom;
					console.log($scope.updaterooms.availableroom);
					console.log($scope.updateroom.availableroom);
				var req = {
					method: 'PUT',
					url: '/api/updateroom',
					headers: header,
					data: $scope.updateroom
					}

				$http(req).then(function(response){
					window.history.back();

				});

			};


			$scope.getFoodpantry = function(){
				var header = getHttpHeader();

				$http.get('/api/siteservice',{headers:header}).then(function(response){
							console.log('siteservice');
							console.log(response);

					$scope.foodpantry = response.data.foodpantry;

				});

			};

			$scope.updateFoodpantry = function(){
				var header = getHttpHeader();
				console.log("update Foodpantry");

				var req = {
					method: 'PUT',
					url: '/api/siteservice/foodpantry',
					headers: header,
					data: $scope.foodpantry
					}

				$http(req).then(function(response){
					window.history.back();

				});

			};


			$scope.getSoupkitchen = function(){
				var header = getHttpHeader();

				$http.get('/api/siteservice',{headers:header}).then(function(response){
							console.log('siteservice');
							console.log(response);

					$scope.soupkitchen = response.data.soupkitchen;

				});

			};

			$scope.updateSoupkitchen = function(){
				var header = getHttpHeader();
				console.log("update soupkitchen");

				var req = {
					method: 'PUT',
					url: '/api/siteservice/soupkitchen',
					headers: header,
					data: $scope.soupkitchen
					}

				$http(req).then(function(response){
					window.history.back();

				});

			};

			$scope.shelterCheckout= function(){
				var header = getHttpHeader();
				console.log("Shelter Check Out");

				var req = {
					method: 'PUT',
					url: '/api/clientcheckout',
					headers: header,
					data: $scope.checkout
					}

				$http(req).then(function(response){
					console.log($scope.checkout);
					window.history.back();

				});

			};




			$scope.initLogin = function(){
				$scope.user = {}
				$scope.user.password = 'gatech123'
				$scope.user.username = 'emp1'
				$rootScope.loggedInUser = {}
				$scope.handleLogin = function(i){
					var header = getHttpHeader()
					$rootScope.loggedInUser = {}
					$scope.errorWrongPassword = '';
					header["user"] = $scope.user.username
					header["password"] = $scope.user.password

					$http.get('/api/login', {headers:header}).then(function(response){
						$rootScope.loggedInUser={}
						$rootScope.loggedInUser.userName = $scope.user.username
						$rootScope.loggedInUser.password = $scope.user.password
						$state.go("welcome")
					},function(err){
						$scope.user.password = 'gatech123'
						$scope.user.username = 'emp1'
						$scope.errorWrongPassword = 'Wrong Password'
					});

				}


			};
			$scope.initClientReport = function(){
				$scope.clientReport=[]
				$scope.getClientReport = function(i){
					var header = getHttpHeader()
					var clientId = i
					$http.get('/api/client/' + $scope.clientSearchResult[i].client_id ,{headers:header}).then(function(response){
						$scope.clientReport = response.data.Data.report;
						$scope.clientWL = response.data.Data.list;
					})

					console.log(i);

				}
				$scope.searchClient = function(){
					var header = getHttpHeader();
					$scope.clientSearchError = ''
					$scope.clientSearchResult=[]
					var req = {
						method: 'POST',
						url: '/api/client', 
						headers: header,
						data: {searchString:$scope.clientSearchString}
					}
					$http(req).then(function(response){
						$scope.clientSearchResult = response.data.Data.client;
					}, function(err){
						$scope.clientSearchError = err.data;
					})

				}	
				$scope.checkInClient = function(i){
					var header = getHttpHeader();
					console.log($scope.clientSearchResult[i].client_id);
					$state.go("sitemanagement.checkinclient",{'client_id':$scope.clientSearchResult[i].client_id});

				}	

				$scope.editClient = function(i){
					var header = getHttpHeader();
					console.log($scope.clientSearchResult[i].client_id);
					$state.go("sitemanagement.editclient",{'client_id':$scope.clientSearchResult[i].client_id,'fullname':$scope.clientSearchResult[i].fullname,'idnumber':$scope.clientSearchResult[i].idnumber,'description':$scope.clientSearchResult[i].description,'phonenumber':$scope.clientSearchResult[i].phonenumber});
					//$state.go("sitemanagement.editclient",{'client_id':$scope.clientSearchResult[i].client_id});

				}	
				$scope.addWaitingList= function(i){

					var header = getHttpHeader();
					console.log($scope.clientSearchResult[i].client_id);
					var req = {
						method: 'POST',
						url: '/api/waitlist', 
						headers: header,
						data: {client_id:$scope.clientSearchResult[i].client_id}
					}
					$http(req).then(function(response){
						$state.go("sitemanagement.waiting")
					}, function(err){
						//$scope.clientSearchError = err.data;
					})



				}


			};







			$scope.getClientInfo= function(){
				var header = getHttpHeader();
					
				$scope.client={};
				$scope.client.client_id = {};

				$scope.client.client_id = $state.params.client_id;

				$scope.client.fullname ={};
				$scope.client.fullname = $state.params.fullname;

				$scope.client.description ={};
				$scope.client.description = $state.params.description;
				$scope.client.idnumber ={};
				$scope.client.idnumber = $state.params.idnumber;	

				$scope.client.phonenumber ={};
				$scope.client.phonenumber = $state.params.phonenumber;


				$scope.client.oldfullname ={};
				$scope.client.oldfullname = $state.params.fullname;

				$scope.client.olddescription ={};
				$scope.client.olddescription = $state.params.description;
				$scope.client.oldidnumber ={};
				$scope.client.oldidnumber = $state.params.idnumber;	

				$scope.client.oldphonenumber ={};
				$scope.client.oldphonenumber = $state.params.phonenumber;
				



				$scope.client.modification ='';

				/*$scope.namechange ='';
				$scope.idchange ='';
				$scope.deschange ='';
				$scope.phonechange ='';

				console.log($scope.client);


				$scope.$watch('client.fullname', function (newValue, oldValue) {
				  // ...
				     if(angular.equals(newValue, oldValue)){
       					 return; // simply skip that
    					
    				}
    					$scope.namechange = oldValue;
    					console.log(oldValue);
				});

	

				$scope.$watch('client.idnumber', function (newValue, oldValue) {
				  // ...
				     if(angular.equals(newValue, oldValue)){
       					 return; // simply skip that
    					
    				}
    					$scope.idchange = oldValue;
    					console.log(oldValue);
				});


				/*$scope.$watch('client.idnumber', function(newValue, oldValue) {

  					$scope.idchange = oldValue;
				});
				$scope.$watch('client.description', function(newValue, oldValue) {

  					$scope.deschange = oldValue;
				});

				$scope.$watch('client.phonenumber', function(newValue, oldValue) {

  					$scope.phonechange = oldValue;
				});*/


	//			$scope.client.modification = $scope.namechange  + $scope.idchange + $scope.deschange  + $scope.phonechange ;

				$scope.updateClient = function(){
   				if(!angular.equals($scope.client.oldfullname, $scope.client.fullname)){
					$scope.client.modification = "old name " + $scope.client.oldfullname;
   				}
   				if(!angular.equals($scope.client.oldidnumber, $scope.client.idnumber)){
					$scope.client.modification = $scope.client.modification + ' old id ' + $scope.client.oldidnumber;
   				}
				if(!angular.equals($scope.client.olddescription, $scope.client.description)){
					$scope.client.modification = $scope.client.modification + ' old description '  + $scope.client.olddescription;
   				}

				if(!angular.equals($scope.client.oldphonenumber, $scope.client.phonenumber)){
					$scope.client.modification = $scope.client.modification + ' old phonenumber ' + $scope.client.phonenumber;
   				}

					var header = getHttpHeader();
					var req = {
						method: 'PUT',
						url: '/api/client',
						headers: header,
						data: $scope.client
					}	

					$http(req).then(function(response){
						//console.log($scope.logvalue);
						window.history.back();

						/*if (response.status == 200){
								//$scope.successresult = "on";
							$scope.client.successresult = "on";
								//console.log($scope.item.bank_id);
								//$state.reload();
						}else{
							$scope.client.successresult = "off";
								//$state.reload();
						}*/

					});


				}	



			},


			$scope.addLog = function(){
				var header = getHttpHeader();
				console.log("Check In");
				$scope.logvalue.client_id ={};
				$scope.logvalue.client_id = $state.params.client_id;
				console.log($scope.logvalue.male);

				var req = {
					method: 'PUT',
					url: '/api/clientcheckin',
					headers: header,
					data: $scope.logvalue
				}

					$http(req).then(function(response){
						console.log($scope.logvalue);
						//window.history.back();

						if (response.status == 200){
								//$scope.successresult = "on";
							$scope.logvalue.successresult = "on";
								//console.log($scope.item.bank_id);
								//$state.reload();
						}else{
							$scope.logvalue.successresult = "off";
								//$state.reload();
						}

					});

			}	





			$scope.submitNewClient = function(){
				var header = getHttpHeader();
				console.log("add submitNewClient");
				console.log($scope.client);
				var req = {
					method: 'POST',
					url: '/api/newclient',
					headers: header,
					data: $scope.client
					}

				$http(req).then(function(response){
					window.history.back();

				});

			}



			$scope.initFoodBank = function(){
				var header = getHttpHeader();

				$http.get('/api/siteservice',{headers:header}).then(function(response){
						console.log('siteservice');
						console.log(response);

					$scope.bank_id = response.data.foodbank.bank_id;

					//console.log($scope.bank_id);
				});

				$scope.addItem= function(){
						var header = getHttpHeader();
						console.log("add item");
			
						$scope.item.bank_id = $scope.bank_id;
						var req = {
							method: 'POST',
							url: '/api/newitem',
							headers: header,
							data: $scope.item
							}

						$http(req).then(function(response){
							if (response.status == 200){
								//$scope.successresult = "on";
								$scope.item = {};
								$scope.item.bank_id = $scope.bank_id;
								$scope.successresult = "on";
								//console.log($scope.item.bank_id);
								//$state.reload();
							}else{
								$scope.successresult = "off";
								//$state.reload();
							}

						})
					}			
			}

			$scope.initItemReport = function(){
				$scope.itemReport=[]
				$scope.successresult = {}
				$scope.item ={};
				$scope.item.searchstring ='';
				$scope.getItemReport = function(i){
					var header = getHttpHeader()
					var itemId = i
					$http.get('/api/client/' + $scope.clientSearchResult[i].client_id ,{headers:header}).then(function(response){
						$scope.clientReport = response.data.Data.report;
					})

					console.log(i);

				}
				$scope.searchItem = function(){
					var header = getHttpHeader();
					$scope.itemSearchError={};
					$scope.itemSearchResult=[];
					console.log("testitem");
					console.log($scope.item);
					if($scope.filter == 'storagetype'){

						$scope.item.categoryname = '';
						$scope.item.subcategoryname = '';
						$scope.item.expirationdatefrom  = '';
						$scope.item.expirationdateto= '';


					}else if($scope.filter == 'categoryname'){

						$scope.item.storagetype = '';
						$scope.item.subcategoryname = '';
						$scope.item.expirationdatefrom  = '';
						$scope.item.expirationdateto= '';


					}else if($scope.filter == 'subcategoryname'){
						$scope.item.storagetype = '';
						$scope.item.categoryname = '';
						$scope.item.subcategoryname = '';
						$scope.item.expirationdatefrom  = '';
						$scope.item.expirationdateto= '';



					}else if($scope.filter == 'expirationdate'){
						$scope.item.subcategoryname = '';
						$scope.item.storagetype = '';
						$scope.item.categoryname = '';
						$scope.item.subcategoryname = '';
	

					}
					var req = {
						method: 'POST',
						url: '/api/item', 
						headers: header,
						data: $scope.item
					}
					$http(req).then(function(response){
						//console.log("item find");
						//console.log(response.data);
						$scope.itemSearchResult = response.data.Data.item;
					}, function(err){
						$scope.itemSearchError = err.data;
					})




				}

				$scope.storerqsid = function(i,j){
					$rootScope.item_id = j;
					$rootScope.bank_id = i;
					console.log("store rqsid");
					console.log(i);
					console.log(j);
				}

				$scope.submitrequest = function(){
					var header = getHttpHeader();
			
	
					console.log("aa request");
					$scope.newrequest.item_id = {};
					$scope.newrequest.status = {};
					$scope.newrequest.bank_id = {};									
					$scope.newrequest.bank_id = $rootScope.bank_id;
					$scope.newrequest.item_id = $rootScope.item_id;
					$scope.newrequest.status = "pending";
							

					var req = {
						method: 'POST',
						url: '/api/request', 
						headers: header,
						data: $scope.newrequest
					}
					console.log("aa request11");
					$http(req).then(function(response){
						$scope.successresult = "on";
					}, function(err){
						$scope.successresult = "off";
					});
				}



				$scope.deleteitem= function(i){
					var header = getHttpHeader();
			
	
					console.log("deleteitem");
					$scope.deleteitem= {};
												
					$scope.deleteitem.item_id = i;
							

					var req = {
						method: 'DELETE',
						url: '/api/item', 
						headers: header,
						data: $scope.deleteitem
					}
	
					$http(req).then(function(response){
						//$scope.successresult = "on";
						$state.reload();
					}, function(err){
						//$scope.successresult = "off";
					});
				}



				$scope.updateNumber = function(i){
					$rootScope.item_id = i;
					console.log("store rqsid");
					console.log(i);
								
				}

				$scope.updateqty = function(){
					var header = getHttpHeader();
			
	
					console.log("update request");
					$scope.updaterequest.item_id = {};
					$scope.updaterequest.item_id = $rootScope.item_id;
				

					var req = {
						method: 'PUT',
						url: '/api/item', 
						headers: header,
						data: $scope.updaterequest
					}


					console.log("aa request11");
					$http(req).then(function(response){
						//$scope.successresult = "on";
						$state.reload();
					}, function(err){
						$scope.successresult = "off";
						//$state.reload();
					})
				}


			}


		



}]);
