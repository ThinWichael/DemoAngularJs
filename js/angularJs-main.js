var app = angular.module('mainApp',['ngRoute','ngCookies','pascalprecht.translate','MyApiServiceModule']);

app.config(['$routeProvider','$translateProvider','$locationProvider','$httpProvider', function($routeProvider, $translateProvider, $locationProvider,$httpProvider){

    $routeProvider.when('/productlist/',{templateUrl:'/template/_main_product.html' })
    .when('/confirm/',{templateUrl:'/template/_main_product_confirm.html'})
    .when('/error/',{templateUrl:'/template/_error.html'})
    .otherwise({redirectTo:'/error/'});	

    //use the HTML5 History API
    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('MyHttpRequestInterceptor');
}]);

// before controller
app.run(['$rootScope', function($rootScope){

    var currency = getCookie("currency");

    var selectCurrency;
	if(currency === null){
        selectCurrency = "NTD"; // default	
	} else {
        selectCurrency = currency;
	}
				
	$rootScope.fields = {currency: selectCurrency};
}]);

//---Controller  ---  start line ---
app.controller({
    'Header_Controller' : ['$scope','$rootScope','$location','$route','$cookies','$window', function($scope, $rootScope, $location, $route, $cookies,$window){
        $rootScope.uid = $cookies.get("uid");
        // check Authorization
        
    }],
    'mainProduct_Controller':['$scope','$rootScope','ProductService','$location','$cookies','$window','$translate','$route', function($scope, $rootScope, ProductService,$location,$cookies,$window,$translate,$route){
    
    }],
    'mainProductConfirm_Controller':['$scope','$rootScope','ProductService','$location','$cookies','$window','$translate','$route', function($scope, $rootScope, ProductService,$location,$cookies,$window,$translate,$route){
    
    }],
    'errorController':['$scope','$rootScope','$location',function($scope,$rootScope,$location){
        
    }]
});//---end of Controller---

//---Controller --- end line ---

//for HTML tag expression in translate string
app.filter("htmlSafe",['$sce',function($sce){
	return function(htmlCode){ 
		return $sce.trustAsHtml(htmlCode);
	};
}]);

app.filter("currencyToMoneySign",[function(){
	return function(htmlCode){
		
		switch(htmlCode){
		case "TWD":
		case "USD":
		 return "$";
		 break;
		case "JPY":
			return "&yen;";
			break;
		case "EUR":
			return "&euro;";
			break;
		case "GBP":
			return "&pound;";
			break;
		default:
			return "$";
		 break;
		}
		
	};
}]);