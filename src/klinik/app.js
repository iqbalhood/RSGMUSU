(function(){
    "use strict";

    var app = angular.module("myApp", ["ngClickCopy","myApp.controller","ngRoute", "ngCookies",]);
    app.config(function($routeProvider) {
        $routeProvider
        .when("/home", {
            templateUrl : "dashboard.html",
            controller  : "HomeCtrl",
        })
        .when("/login", {
            templateUrl : "login.html",
            controller  : "LoginCtrl",
        })
        .when("/pasien", {
            templateUrl : "pasien.html",
            controller  : "PasienCtrl",
        })
        .when("/apotik", {
          templateUrl : "apotik.html",
          controller  : "ApotikCtrl",
        })
        .when("/obat", {
          templateUrl : "obat.html",
          controller  : "ObatCtrl",
        })
        .when("/dokter", {
          templateUrl : "dokter.html",
          controller  : "DokterCtrl",
        })
        .when("/users", {
          templateUrl : "users.html",
          controller  : "UsersCtrl",
        })
        .when("/data-pasien/:id", {
          templateUrl : "data-pasien.html",
          controller  : "DataPasienCtrl",
        })
       
        .when("/riwayat", {
          templateUrl : "riwayat.html",
          controller  : "RiwayatCtrl",
        })
        .when("/rekam-medis/:id/:idkunjungan", {
          templateUrl : "rekam-medis.html",
          controller  : "RekamMedisCtrl",
        })
        .when("/perawatan/:id/:idkunjungan", {
          templateUrl : "perawatan.html",
          controller  : "PerawatanCtrl",
        })
        .when("/pradiologi/:id/:idkunjungan", {
          templateUrl : "perawatan-radiologi.html",
          controller  : "PerawatanRadiologiCtrl",
        })
        .otherwise({
            templateUrl : "dashboard.html",
            controller  : "HomeCtrl",
        });
    });

    
})();