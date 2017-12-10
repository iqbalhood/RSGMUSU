(function(){
    "use strict";

    var app = angular.module("myApp", ["ngClickCopy","myApp.controller","ngRoute", "ngCookies",]);
    app.config(function($routeProvider) {
        $routeProvider
        .when("/home",{
            templateUrl : "dashboard.html",
            controller  : "HomeCtrl",
        })
        .when("/histori",{
            templateUrl : "histori.html",
            controller  : "HistoriCtrl",
        })
        .when("/invoice", {
          templateUrl : "invoice.html",
          controller  : "InvoiceCtrl",
        })
        .otherwise({
            templateUrl : "dashboard.html",
            controller  : "HomeCtrl",
        });
    });

    
})();