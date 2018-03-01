(function(){
    "use strict";

    var app = angular.module("myApp", ["ngClickCopy", "myApp.controller","ngRoute", "ngCookies","720kb.datepicker"]);
    app.directive("datepicker", function () {
      return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
          var updateModel = function (dateText) {
            scope.$apply(function () {
              ngModelCtrl.$setViewValue(dateText);
            });
          };
          var options = {
            dateFormat: "dd/mm/yy",
            onSelect: function (dateText) {
              updateModel(dateText);
            }
          };
          elem.datepicker(options);
        }
      }
    });
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
        .when("/layanan/:id", {
          templateUrl : "layanan.html",
          controller  : "LayananCtrl",
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
        .when("/rekam-medis/:id/:idkunjungan", {
          templateUrl : "rekam-medis.html",
          controller  : "RekamMedisCtrl",
        })
        .when("/layanan-medis", {
          templateUrl : "layanan.html",
          controller  : "LayananMedisCtrl",
        })
        .when("/klinik/:id", {
          templateUrl : "klinik.html",
          controller  : "KlinikCtrl",
        })
        .when("/search", {
          templateUrl : "search.html",
          controller  : "SearchCtrl",
         })
        .otherwise({
            templateUrl : "dashboard.html",
            controller  : "HomeCtrl",
        });
    });

    
})();