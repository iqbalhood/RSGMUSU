(function(){
    "use strict";
    var app = angular.module("myApp", ["ngClickCopy", "myApp.controller","ngRoute", "ngCookies","720kb.datepicker"]);


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
        .when("/detail-users/:id", {
          templateUrl : "data-pasien.html",
          controller  : "DetailUsersCtrl",
        })
        .when("/rekam-medis", {
          templateUrl : "rekam-medis.html",
          controller  : "RekamMedisCtrl",
        })
        .when("/klinik/:id", {
          templateUrl : "klinik.html",
          controller  : "KlinikCtrl",
        })
        .otherwise({
            templateUrl : "dashboard.html",
            controller  : "HomeCtrl",
        });
    });

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
    
      
   
    
    
    })();







