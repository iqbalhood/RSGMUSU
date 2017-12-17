(function(){
    "use strict";

    var app = angular.module("myApp", ["ngClickCopy","myApp.controller","ngRoute", "ngCookies",]);
    app.config(function($routeProvider) {
        $routeProvider
        .when("/home", {
            templateUrl : "dashboard.html",
            controller  : "HomeCtrl",
        })
        .when("/pasien", {
            templateUrl : "pasien.html",
            controller  : "PasienCtrl",
        })
        .when("/histori",{
          templateUrl : "histori.html",
          controller  : "HistoriCtrl",
        })
        .when("/invoice/:id/:idkunjungan", {
          templateUrl : "invoice.html",
          controller  : "InvoiceCtrl",
        })      
        .when("/data-pasien/:id", {
          templateUrl : "data-pasien.html",
          controller  : "DetailUsersCtrl",
        })
       
        .otherwise({
            templateUrl : "dashboard.html",
            controller  : "HomeCtrl",
        });
    });

    
})();