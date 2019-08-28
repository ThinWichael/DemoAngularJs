(function(){
    var serviceApp = angular.module('MyServiceModule',[]);

    serviceApp.factory('ProductService',['$http','$rootScope', function($http,$rootScope){
        return{
            getDefaultProduct: function(){ 
				return $http({method:'GET', url: "http://127.0.0.1:8080/getProduct"});
            },
            getMyProduct: function(dataobj){     
				return $http({ method:'POST', url: "http://127.0.0.1:8080/getProduct",headers: {'Content-Type': 'application/json'}, params: dataobj});
			} 
            // getMyProduct: function(dataobj){     
			// 	return $http({ method:'POST', url: "http://127.0.0.1:8080/getProduct",headers: {'Content-Type': 'application/json'}, data: dataobj});
			// } 
        };
    }]);

    serviceApp.factory('myHttpRequestInterceptor',['$rootScope','$location','$cookies', function($rootScope,$location,$cookies){
		return {
			request: function(config){
				// if(typeof $rootScope.authorization !== 'undefined' && $rootScope.authorization !== null){
					
				// }else if(typeof $cookies.get("auth") !== 'undefined' && $cookies.get("auth") !== null){ 
				// 	$rootScope.authorization = $cookies.get("auth");
				// } 
				// config.headers['transactionId'] = $rootScope.transactionId;
                // config.headers['authorization'] = $rootScope.authorization;
                console.log("Hello , pass the interceptor");
				return config;
			}
		}
	}])

})();//execute this function