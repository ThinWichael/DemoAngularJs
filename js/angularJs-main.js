var app = angular.module('mainApp',['ngRoute','ngCookies','pascalprecht.translate','MyServiceModule']);

app.config(['$routeProvider','$translateProvider','$locationProvider','$httpProvider', function($routeProvider, $translateProvider, $locationProvider,$httpProvider){

    $routeProvider.when('/productlist/',{templateUrl:'/template/_main_product.html' })
    .when('/confirm/',{templateUrl:'/template/_main_product_confirm.html'})
    .when('/error/',{templateUrl:'/template/_error.html'})
    .otherwise({redirectTo:'/error/'});	

    //use the HTML5 History API
    $locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	  });

    $httpProvider.interceptors.push('myHttpRequestInterceptor');
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
		
	//if you want to bind $rootscope with ng-model, need to put the parameter here
	// it's a bug issue in angularJs
	$rootScope.fields = {currency: selectCurrency,
		                 userName: ""};
}]);

//---Controller  ---  start line ---
app.controller({
    'Header_Controller' : ['$scope','$rootScope','$location','$route','$cookies','$window', function($scope, $rootScope, $location, $route, $cookies,$window){
        $rootScope.uid = $cookies.get("uid");
        // check Authorization
        
    }],
    'mainProduct_Controller':['$scope','$rootScope','ProductService','$location','$cookies','$window','$translate','$route', function($scope, $rootScope, ProductService,$location,$cookies,$window,$translate,$route){
	
		$rootScope.fields.userName = "";
		$rootScope.products = []; //array
		$rootScope.buyingProduct = null;
		// post api
		$scope.getMyProductList = function(){
			var requestObj = {
				username: $rootScope.fields.userName
			};
			promise = ProductService.getMyProduct(requestObj);
			 promise.then(function(rs){
				 console.log(rs);
				 if(!!rs.data.user && rs.data.products.products.length > 0){
					$rootScope.fields.userName = rs.data.user;
					$rootScope.fields.currency = rs.data.currency;
					$rootScope.products = rs.data.products.products;
				 }
			 })
		}
		
		// select currency
		$scope.changeCurrency = function(){
			//do something if you want !!
		}

		// Buy product
		$scope.buyThisOne = function(product){
			console.log(product);
			
			$rootScope.buyingProduct = product;

			$location.path('/confirm/');
		}

    }],
    'mainProductConfirm_Controller':['$scope','$rootScope','ProductService','$location','$cookies','$window','$translate','$route', function($scope, $rootScope, ProductService,$location,$cookies,$window,$translate,$route){
	
        $scope.payPrice = null;

		if( !$rootScope.buyingProduct || $rootScope.buyingProduct === null){
			$location.path('/productlist/');
		}

		switch($rootScope.fields.currency){
			case "JPY":
				$scope.payPrice = $rootScope.buyingProduct.price.jpy;
				break;
			case "NTD":
				$scope.payPrice = $rootScope.buyingProduct.price.ntd;
				break;
			case "JPY":
				$scope.payPrice = $rootScope.buyingProduct.price.usd;
				break;
		}

		$scope.goPayment = function(){
			//to-do:
		}

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