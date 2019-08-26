(function(){
    var serviceApp = angular.module('MyServiceModule',[]);

    serviceApp.factory('ProductService',['$http','$rootScope', function($http,$rootScope){
        return{
            getDefaultProduct: function(){ 
				return $http({method:'GET', url: "/getProduct"});
            },
            getMyProduct: function(dataobj){     
				return $http({ method:'POST', url: "/getProduct",headers: {'Content-Type': 'application/json'}, data: dataobj});
			} 
        };
    }]);

})();//execute this function