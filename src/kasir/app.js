(function(){
    "use strict";

    var app = angular.module("myApp", ["ngClickCopy","cp.ngConfirm","myApp.controller","ngRoute", "ngCookies","720kb.datepicker"]);
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
        .when("/pembayaran",{
            templateUrl : "pembayaran.html",
            controller  : "PembayaranCtrl",
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

    app.factory('Excel',function($window){
        var uri='data:application/vnd.ms-excel;base64,',
            template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
            format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
        return {
            tableToExcel:function(tableId,worksheetName){
                var table=$(tableId),
                    ctx={worksheet:worksheetName,table:table.html()},
                    href=uri+base64(format(template,ctx));
                return href;
            }
        };
    })

    
})();