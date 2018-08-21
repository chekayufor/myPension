
var pensionApp = angular.module('pensionApp', ['ngRoute', 'ngAnimate']);

pensionApp.controller('ScrollingController', ['$scope','$location','$anchorScroll','$routeParams', function($scope, $location, $anchorScroll, $routeParams) {
       
    $scope.scrollTo = function (id) {
        $anchorScroll(id);  
      }
  }]);

pensionApp.controller('ContactController', ['$scope', '$location','$http', function($scope, $location, $http) {
    
      $scope.sendEmail = function() {

                console.log("TEST");
            //Request
            $http.post('/email', $scope.email) 
            .then(function onSuccess(response) {
                console.log("Sent ok");
            })
            .catch(function onError(responses) {
                console.log("Error");
            });

            $location.path("/contact-success");
        };
   
  }]); 
  
pensionApp.controller('CalculateController', ['$scope', function($scope) {
    
    $scope.calculatePencion = function(){
        
        $scope.result = $scope.calculate.Zz * $scope.calculate.Kz * $scope.calculate.Cm * $scope.calculate.Bc;
    }
  }]);
  
//routeProvider
  pensionApp.config(['$routeProvider', function($routeProvider){
    
    $routeProvider
    .when('/home',{
        templateUrl: 'views/home.html'
    })
    .when('/view1',{
        templateUrl: 'views/view1.html'
    })
    .when('/view2',{
        templateUrl: 'views/view2.html',
        controller: 'ScrollingController'
    })
    .when('/view3',{
        templateUrl: 'views/view3.html',
        controller: 'CalculateController'
    })
    .when('/view4',{
        templateUrl: 'views/view4.html',
        controller: 'ContactController'
    })
    .when('/view5',{
        templateUrl: 'views/view5.html'
    })
    .when('/view6',{
        templateUrl: 'views/view6.html'
    })
    .when('/contact-success',{
        templateUrl: 'views/contact-success.html',
        controller: 'ContactController'
    })
    .when('/view7',{
        templateUrl: 'views/view7.html'
    })
    .otherwise({
        redirectTo: '/home'
    })

   



}]);
