
var app = angular.module('myApp.controller', []);

app.controller("HomeCtrl", function ($scope,$cookies,$interval,$http, $route,$timeout, $routeParams, $window) {
   
});

app.controller("HistoriCtrl", function ($scope,$cookies,$interval,$http, $route,$timeout, $routeParams, $window) {
   
});

app.controller("InvoiceCtrl", function ($scope,$cookies,$interval,$http, $route,$timeout, $routeParams, $window) {
    
});

app.controller("BodyCtrl", function ($scope,$cookies,$window) {
    var usernameCookie = $cookies.get('username');
    var aksesCookie = $cookies.get('akses');

    console.log("COOKIES GET USRE" + usernameCookie);
    console.log("COOKIES GET AKSES" + aksesCookie);

    $scope.user  = usernameCookie;
    $scope.akses = aksesCookie;


    $scope.logout = function(){   
        $window.location.href = "index.html";
    };
});

