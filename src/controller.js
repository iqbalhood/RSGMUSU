
var app = angular.module('myApp.controller', []);


app.controller("HomeCtrl", function ($scope,$window) {
    

    console.log("I AM AT HOME CONTROLLER");

});


app.controller("PasienCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {
   
    $scope.shTable  = true;
    $scope.shForm   = false;
    $scope.id ="";

   // $http.get("config/daftar_pasien.php").then(function (response) {
   $http.get("apidb/pasien/list_data.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
    });

    $scope.no = Math.floor((Math.random() * 10000) + 1);

    $scope.submitForm = function() {
        

        if($scope.id){
            console.log(" ID YANG DIEDIT "+ $scope.id);
            console.log($scope.id);
            console.log($scope.name);
            console.log($scope.kelamin);
            console.log($scope.phone);
            $http({
                
                 method: 'POST',
                 url:  'apidb/pasien/postedit.php',
                 data: {newId: $scope.id, newName: $scope.name, newPhone: $scope.phone  , newKelamin: $scope.kelamin}
                 
            }).then(function (response) {

                console.log(response);
                // on success
                if(response.status==200){
                    $route.reload();    
                }
            });


        }else{

            $http({
                
                 method: 'POST',
                 url:  'apidb/pasien/post.php',
                 data: {newName: $scope.name, newPhone: $scope.phone  , newKelamin: $scope.kelamin}
                 
            }).then(function (response) {
                // on success
                if(response.status==200){
                    $route.reload();    
                }
            });

        }
    };



    $scope.showForm = function() {
        $scope.shTable  = false;
        $scope.shForm   = true;
    };

    $scope.editForm = function(x) {
            $scope.shTable  = false;
            $scope.shForm   = true;
            console.log("This Is x value "+x);
            $http({
                method: 'POST',    
                url: 'apidb/pasien/get.php',
                data: {newId: x}
            }).then(function (response) {
                
                // on success
                $scope.people           = response.data;
                $scope.id               =  $scope.people.id;
                $scope.name             =  $scope.people.name;
                $scope.phone            =  $scope.people.phone;
                $scope.kelamin          =  $scope.people.jenis_kelamin;
               
                
            }, function (response) {
                
                // on error
                console.log(response.data,response.status);
                
            });
        
    };


    $scope.deleteForm = function(x) {
       // console.log("This Is delete x value "+x);
        $http({
            
            method: 'POST',
            url:  'apidb/pasien/delete.php',
            data: { recordId : x }
            
        }).then(function (response) {
      
           $route.reload();  
      
        }, function (response) {
            
            console.log(response.data,response.status);
            
        });
      };

    $scope.cancelForm = function() {
        
        $scope.shTable  = true;
        $scope.shForm   = false;
        $scope.id               =  "";
        $scope.name             =  "";
        $scope.phone            =  "";
        $scope.kelamin          =  "";
        
    };

    setTimeout(function(){
        $('#mytablePasien').dataTable({
            "bPaginate": true,
            "bLengthChange": true,
            "aLengthMenu": [ 30, 50, 100 ],
            "bFilter": true,
            "bSort": true,
            "bInfo": true,
            "bRetrieve": true,
            "bAutoWidth": false,
            "sEmptyTable": "",
        });
        }, 4000);

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


app.controller("ApotikCtrl", function ($scope,$cookies,$window) {
    
     
   
 
 });
 app.controller("DokterCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {
    
    $scope.shTable  = true;
    $scope.shForm   = false;
    $scope.id ="";

    // $http.get("config/daftar_pasien.php").then(function (response) {
    $http.get("apidb/dokter/list_data.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
    });

    $scope.no = Math.floor((Math.random() * 10000) + 1);
    
        $scope.submitForm = function() {
            
    
            if($scope.id){
                console.log(" ID YANG DIEDIT "+ $scope.id);
                console.log($scope.id);
                console.log($scope.name);
                console.log($scope.kelamin);
                console.log($scope.phone);
                $http({
                    
                     method: 'POST',
                     url:  'apidb/dokter/postedit.php',
                     data: {newId: $scope.id, newName: $scope.name, newPhone: $scope.phone  , newKelamin: $scope.kelamin}
                     
                }).then(function (response) {
    
                    console.log(response);
                    // on success
                    if(response.status==200){
                        $route.reload();    
                    }
                });
    
    
            }else{
    
                $http({
                    
                     method: 'POST',
                     url:  'apidb/dokter/post.php',
                     data: {newName: $scope.name, newPhone: $scope.phone  , newKelamin: $scope.kelamin}
                     
                }).then(function (response) {
                    // on success
                    if(response.status==200){
                        $route.reload();    
                    }
                });
    
            }
        };
    
    
    
        $scope.showForm = function() {
            $scope.shTable  = false;
            $scope.shForm   = true;
        };
    
        $scope.editForm = function(x) {
                $scope.shTable  = false;
                $scope.shForm   = true;
                console.log("This Is x value "+x);
                $http({
                    method: 'POST',    
                    url: 'apidb/dokter/get.php',
                    data: {newId: x}
                }).then(function (response) {
                    
                    // on success
                    $scope.people           = response.data;
                    $scope.id               =  $scope.people.id;
                    $scope.name             =  $scope.people.name;
                    $scope.phone            =  $scope.people.phone;
                    $scope.kelamin          =  $scope.people.jenis_kelamin;
                   
                    
                }, function (response) {
                    
                    // on error
                    console.log(response.data,response.status);
                    
                });
            
        };
    
    
        $scope.deleteForm = function(x) {
           // console.log("This Is delete x value "+x);
            $http({
                
                method: 'POST',
                url:  'apidb/dokter/delete.php',
                data: { recordId : x }
                
            }).then(function (response) {
          
               $route.reload();  
          
            }, function (response) {
                
                console.log(response.data,response.status);
                
            });
          };
    
        $scope.cancelForm = function() {
            
            $scope.shTable  = true;
            $scope.shForm   = false;
            $scope.id               =  "";
            $scope.name             =  "";
            $scope.phone            =  "";
            $scope.kelamin          =  "";
            
        };


});

app.controller("ObatCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {
    
    $scope.shTable  = true;
    $scope.shForm   = false;
    $scope.id ="";

   // $http.get("config/daftar_pasien.php").then(function (response) {
   $http.get("apidb/obat/list_data.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
   });
   
   

   setTimeout(function(){
    $('#mytableObat').dataTable({
        "bPaginate": true,
        "bLengthChange": true,
        "aLengthMenu": [ 30, 50, 100 ],
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bRetrieve": true,
        "bAutoWidth": false,
        "sEmptyTable": "",
    });
    }, 4000);
   
 
 });
