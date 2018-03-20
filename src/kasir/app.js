(function(){
    "use strict";

    var app = angular.module("myApp", ["ngClickCopy","myApp.controller","ngRoute", "ngCookies","720kb.datepicker"]);
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
        .when("/home",{
            templateUrl : "dashboard.html",
            controller  : "HomeCtrl",
        })
        .when("/cicilan",{
            templateUrl : "cicilan.html",
            controller  : "CicilanCtrl",
        })
        .when("/histori",{
            templateUrl : "histori.html",
            controller  : "HistoriCtrl",
        })
        .when("/invoice/:id/:idkunjungan", {
            templateUrl : "invoice.html",
            controller  : "InvoiceCtrl",
        })   
        .when("/invoice-history/:id/:idkunjungan", {
            templateUrl : "invoice-history.html",
            controller  : "InvoiceCtrl",
        })
        .when("/invoice-cicilan/:id/:idkunjungan", {
            templateUrl : "invoice-cicilan.html",
            controller  : "InvoiceCicilanCtrl",
        })     
        .otherwise({
            templateUrl : "dashboard.html",
            controller  : "HomeCtrl",
        });
    });

    
})();