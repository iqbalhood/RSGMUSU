
var app = angular.module('myApp.controller', []);


app.controller("HomeCtrl", function ($scope,$cookies,$interval,$http, $route,$timeout, $routeParams, $window) {
    var klinikCookie = $cookies.get('klinik');
    $scope.tipeKlinik = klinikCookie;

    console.log("HOME CTRL COOKIE" + $scope.tipeKlinik);
    $http.get("../apidb/kunjungan/list_data.php?id="+klinikCookie).then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
       });

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


app.controller("PasienCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {
   
    $scope.shTable  = true;
    $scope.shForm   = false;
    $scope.id ="";

   // $http.get("config/daftar_pasien.php").then(function (response) {
   $http.get("../apidb/pasien/list_data.php").then(function (response) {
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
                 url:  '../apidb/pasien/postedit.php',
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
                 url:  '../apidb/pasien/post.php',
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
                url: '../apidb/pasien/get.php',
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
            url:  '../apidb/pasien/delete.php',
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
    var klinikCookie = $cookies.get('klinik');

    console.log("COOKIES GET USRE" + usernameCookie);
    console.log("COOKIES GET AKSES" + aksesCookie);
    console.log("COOKIES GET Klinik" + klinikCookie);

    $scope.user  = usernameCookie;
    $scope.akses = aksesCookie;
    $scope.akses_klinik = klinikCookie;


    $scope.logout = function(){   
        $window.location.href = "index.html";
    };

});


app.controller("ApotikCtrl", function ($scope,$cookies,$window) {
    
     
   
 
});


app.controller("KlinikCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {
   
    $scope.shTable  = true;
    $scope.shForm   = false;
      
   $http.get("../apidb/kunjungan/list_data.php?id="+$routeParams.id).then(function (response) {
    $scope.myData = response.data.event;
    console.log(response.data.event);
   });

   console.log("Controller Works");



   
 
});



 app.controller("DokterCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {
    
    $scope.shTable  = true;
    $scope.shForm   = false;
    $scope.id ="";

    // $http.get("config/daftar_pasien.php").then(function (response) {
    $http.get("../apidb/dokter/list_data.php").then(function (response) {
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
                     url:  '../apidb/dokter/postedit.php',
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
                     url:  '../apidb/dokter/post.php',
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
                    url: '../apidb/dokter/get.php',
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
                url:  '../apidb/dokter/delete.php',
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
            $('#mytableDokter').dataTable({
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

app.controller("ObatCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {
    
    $scope.shTable  = true;
    $scope.shForm   = false;
    $scope.id ="";

  
   $http.get("../apidb/obat/list_data.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
   });
   
   $scope.showForm = function() {
            $scope.shTable  = false;
            $scope.shForm   = true;
        };
		
		$scope.editForm = function(x) {
            $scope.shTable  = false;
            $scope.shForm   = true;
			$scope.id = x;
			$http({
                method: 'POST',    
                url: '../apidb/obat/get.php',
                data: {newId: x}
            }).then(function (response) {
                console.log(response);
                // on success
                $scope.people           = response.data;
                $scope.id               =  $scope.people.id;
                $scope.name             =  $scope.people.name;
                $scope.quantity            =  $scope.people.quantity;
                $scope.satuan          =  $scope.people.satuan;
                $scope.harga          =  $scope.people.harga;
                
            }, function (response) {
                
                // on error
                console.log(response.data,response.status);
                
            });
        };
		
		$scope.deleteForm = function(x) {
       // console.log("This Is delete x value "+x);
        $http({
            
            method: 'POST',
            url:  '../apidb/obat/delete.php',
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
        $scope.quantity            =  "";
        $scope.satuan          =  "";
		$scope.harga          =  "";
        
    };
		
		$scope.submitForm = function(){
			if($scope.id){
            console.log(" ID YANG DIEDIT "+ $scope.id);
            console.log($scope.id);
            console.log($scope.name);
            console.log($scope.kelamin);
            console.log($scope.phone);
            $http({
                
                 method: 'POST',
                 url:  '../apidb/obat/postedit.php',
                 data: {newId: $scope.id, newName: $scope.name, newQuantity: $scope.quantity  , newSatuan: $scope.satuan, newHarga: $scope.harga}
                 
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
                 url:  '../apidb/obat/post.php',
                 data: {newName: $scope.name, newQuantity: $scope.quantity  , newSatuan: $scope.satuan, newHarga: $scope.harga}
                 
            }).then(function (response) {
                // on success
                if(response.status==200){
                    $route.reload();    
                }
            });
		}
		};
		
	

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

 app.controller("UsersCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {
    
    $scope.shTable  = true;
    $scope.shForm   = false;
    $scope.id ="";

   // $http.get("config/daftar_pasien.php").then(function (response) {
   $http.get("../apidb/users/list_data.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
   });
   
   

   setTimeout(function(){
    $('#mytableUsers').dataTable({
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

app.controller("DataPasienCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {
  
        $scope.klinikForm = false;
        $scope.id_pasien = $routeParams.id;

        var d = new Date();
        var n = d.getTime();

        $scope.id_kunjungan = n;

        $http({
            method: 'POST',    
            url: '../apidb/pasien/get.php',
            data: {newId: $routeParams.id}
        }).then(function (response) {
            
            // on success
            $scope.people           = response.data;
            $scope.id               =  $scope.people.id;
            $scope.namaPasien       =  $scope.people.name;
            $scope.phone            =  $scope.people.phone;
            $scope.kelamin          =  $scope.people.jenis_kelamin;
           
            
        }, function (response) {
            
            // on error
            console.log(response.data,response.status);
            
        });

         
        $http.get("../apidb/klinik/list_rekam_medis.php").then(function (response) {
            $scope.rekamMedisPasien = response.data.event;
            console.log($scope.rekamMedisPasien);
        });

       

    

         // $http.get("config/daftar_pasien.php").then(function (response) {
        $http.get("../apidb/dokter/list_data.php").then(function (response) {
            $scope.dataDokter = response.data.event;
            console.log(response.data.event);
        });


        $scope.showKlinik = function() {
            $scope.klinikForm = true;
        };

        $scope.cancelFormKlinik= function(){
            $scope.klinikForm = false;
        };

        $scope.submitForm= function(){
            $http({
                
                 method: 'POST',
                 url:  '../apidb/datapasien/submit_ke_klinik.php',
                 data: {idKunjungan: $scope.id_kunjungan, idKlinik: $scope.klinik  , dokterPendamping: $scope.dokterpendamping, dokterPendamping: $scope.dokterpendamping, idDokter: $scope.dokterpraktisi, idPasien: $scope.id_pasien }
                 
            }).then(function (response) {
                // on success
                if(response.status==200){
                    $route.reload();    
                }
            });
        };



});


app.controller("RekamMedisCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {

    $scope.idPasien = $routeParams.id;

    //GET DATA PASIEN

    $http({
        method: 'POST',    
        url: '../apidb/pasien/get.php',
        data: {newId: $routeParams.id}
    }).then(function (response) {
        
        // on success
        $scope.people           =  response.data;
        $scope.id               =  $scope.people.id;
        $scope.name             =  $scope.people.name;
        $scope.phone            =  $scope.people.phone;
        $scope.kelamin          =  $scope.people.jenis_kelamin;
       
        
    }, function (response) {
        
        // on error
        console.log(response.data,response.status);
        
    });


    //GET DATA REKAM MEDIS 

    $http({
        method: 'POST',    
        url: '../apidb/klinik/get_rekam_medis.php',
        data: {newId: $routeParams.idkunjungan}
    }).then(function (response) {
        
        // on success

        $scope.rm           =  response.data;
        $scope.namaDokter   =  $scope.rm.nama_dokter;
        $scope.amnese       =  $scope.rm.amnese;
        $scope.diagnosa     =  $scope.rm.diagnosa;
        
    }, function (response) {
        
        // on error
        console.log(response.data,response.status);
        
    });





    
    
});


app.controller("PerawatanCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {
    
        $scope.daftarObat       = [];
        $scope.daftarLayanan    = [];

        $scope.status = "Tidak Ada";
        $scope.warna = "#ffffff";

        $scope.colorC18 = "#ffffff";
        $scope.colorT18 = "#ffffff";
        $scope.colorB18 = "#ffffff";
        $scope.colorR18 = "#ffffff";
        $scope.colorL18 = "#ffffff";
     
        $http.get("../apidb/obat/list_data.php").then(function (response) {
            $scope.dataObat = response.data.event;
            console.log(response.data.event);
        });

        $http({
            method: 'POST',    
            url: '../apidb/pasien/get.php',
            data: {newId: $routeParams.id}
        }).then(function (response) {
            
            // on success
            $scope.people           = response.data;
            $scope.id               =  $scope.people.id;
            $scope.namaPasien       =  $scope.people.name;
            $scope.phone            =  $scope.people.phone;
            $scope.kelamin          =  $scope.people.jenis_kelamin;
           
            
        }, function (response) {
            
            // on error
            console.log(response.data,response.status);
            
        });



        $http({
            method: 'POST',    
            url: '../apidb/kunjungan/get.php',
            data: {newId: $routeParams.idkunjungan}
        }).then(function (response) {
            
            // on success
            $scope.datakunjungan    = response.data;
            $scope.namadokter       =  $scope.datakunjungan.dokter;
            $scope.iddokter         =  $scope.datakunjungan.iddokter;

            console.log("Dokternya " + $scope.dokter);
           
            
        }, function (response) {
            
            // on error
            console.log(response.data,response.status);
            
        });

        

        $http.get("../apidb/layanan/list_data.php?id=2").then(function (response) {
            $scope.dataLayanan = response.data.event;
            console.log(response.data.event);
        });



        $scope.FormObat = function(x) {
            $scope.shTable  = false;
            $scope.shForm   = true;
			$scope.id = x;
			$http({
                method: 'POST',    
                url: '../apidb/obat/get.php',
                data: {newId: x}
            }).then(function (response) {
                console.log(response);
                // on success
                $scope.people           = response.data;
                $scope.id               =  $scope.people.id;
                $scope.name             =  $scope.people.name;
                $scope.quantity         =  1;
                $scope.satuan           =  $scope.people.satuan;
                $scope.harga            =  $scope.people.harga;
                
            }, function (response) {
                
                // on error
                console.log(response.data,response.status);
                
            });
        };


        $scope.FormLayanan = function(x) {
            $scope.shFormLayanan   = true;
			$scope.id = x;
			$http({
                method: 'POST',    
                url: '../apidb/layanan/get.php',
                data: {newId: x}
            }).then(function (response) {
                console.log(response);
                // on success
                $scope.peopleLayanan    =  response.data;
                $scope.idLayanan        =  $scope.peopleLayanan.id;
                $scope.nameLayanan      =  $scope.peopleLayanan.layanan;            
                $scope.bahanLayanan     =  $scope.peopleLayanan.bahan;
				$scope.harga_bahan      =  $scope.peopleLayanan.harga_bahan;
				$scope.harga_koas       =  $scope.peopleLayanan.harga_koas;
				$scope.harga_drg        =  $scope.peopleLayanan.harga_drg;
				$scope.harga_drgsp      =  $scope.peopleLayanan.harga_drgsp;
                
            }, function (response) {
                
                // on error
                console.log(response.data,response.status);
                
            });
        };

        $scope.cancelFormObat = function() {
       
            $scope.shForm         = false;
            $scope.id             =  "";
            $scope.name           =  "";
            $scope.quantity       =  "";
            $scope.satuan         =  "";
            $scope.harga          =  "";
            
        };

        $scope.cancelFormLayanan = function() {
            $scope.shFormLayanan  = false;
            $scope.idLayanan        =  "";
            $scope.nameLayanan      =  "";           
            $scope.bahanLayanan     =  "";
            $scope.harga_bahan      =  "";
            $scope.harga_koas       =  "";
            $scope.harga_drg        =  "";
            $scope.harga_drgsp      =  "";
        };

        $scope.submitForm = function(){
            var obj = { name: $scope.name, mid: $scope.id, quantity: $scope.quantity, satuan: $scope.satuan, harga: $scope.harga  };
             //Jika array daftar obat kosong jangan lakukan apa2
            if($scope.daftarObat.length != 0){
                //Jika Data Obat Sudah ada maka cek apakah  ada nama obat  yang sama di array
                var index = $scope.daftarObat.map(function (item) {
                    return item.name;
                }).indexOf($scope.name);
                //  Pakai ini untuk cek indexnya console.log("INDEX FIND " +  index);

                // Jika benar obat memang sudah ada kita ganti quantitynya 
                if(index != -1){ 
                    console.log ("harus diganti");
                    var hasil = parseInt($scope.daftarObat[index].quantity) + parseInt($scope.quantity);
                    $scope.daftarObat[index].quantity = hasil;
                }else{
                    $scope.daftarObat.push(obj);
                }

            }else{
                // Jika Belum ada obat maka buatlah data obatnya 
                $scope.daftarObat.push(obj);
            }
            $scope.shForm = false;   
        };


        $scope.hapusdaftarObat = function(x){
            //console.log("ID OBAT YANG DIMAKSUD "+ x);
            $scope.daftarObat.splice(x,1);
        };

        $scope.hapusdaftarLayanan = function(x){
            //console.log("ID OBAT YANG DIMAKSUD "+ x);
            $scope.daftarLayanan.splice(x,1);
        };

        $scope.updateJasa = function(){

            

            if($scope.pelaksana == '0'){
                $scope.jasa  = $scope.harga_koas;

            }

            if($scope.pelaksana == '1'){
                $scope.jasa  = $scope.harga_drg;  

            }

            if($scope.pelaksana == '2'){
                $scope.jasa  = $scope.harga_drgsp;

            }


          


        };

        $scope.submitFormLayanan = function(){
            var obj = { name: $scope.nameLayanan, harga: $scope.harga_bahan , jasa : $scope.jasa  };
            if($scope.daftarLayanan.length != 0){

                 //Jika Data Obat Sudah ada maka cek apakah  ada nama obat  yang sama di array
                 var index = $scope.daftarLayanan.map(function (item) {
                    return item.name;
                 }).indexOf($scope.nameLayanan);

                   // Jika benar obat memang sudah ada kita ganti quantitynya 
                if(index != -1){ 
                    console.log ("harus diganti");
                    var hasil = parseInt($scope.daftarLayanan[index].harga_bahan) + parseInt($scope.harga_bahan);
                    $scope.daftarLayanan[index].harga_bahan = hasil;

                    var hasilJasa = parseInt($scope.daftarLayanan[index].jasa) + parseInt($scope.jasa);
                    $scope.daftarLayanan[index].jasa = hasilJasa;

                }else{
                    $scope.daftarLayanan.push(obj);
                }

            }else{
                // Jika Belum ada obat maka buatlah data obatnya 
                $scope.daftarLayanan.push(obj);
            }
            // console.log( "PANJANG SCOPE"+$scope.daftarLayanan.length);
            
            // console.log("Nama Layanan Tersedia");
            // $scope.daftarLayanan.push(obj);
            // console.log( $scope.daftarLayanan);     
            $scope.shFormLayanan  = false;       
        };

        


        $scope.clickColor18 = function(x){

            $scope.shFormGigi = true;

            if(x == 'C'){
                if($scope.colorC18 != "lime"){
                    $scope.colorC18 = $scope.warna;
                }else{
                    $scope.colorC18 = "white";
                }      
            }


            if(x == 'T'){
                if($scope.colorT18 != "lime"){
                    $scope.colorT18 = $scope.warna;
                }else{
                    $scope.colorT18 = "white";
                }
            }


            if(x == 'B'){
                if($scope.colorB18 != "lime"){
                    $scope.colorB18 = $scope.warna;
                }else{
                    $scope.colorB18 = "white";
                }
            }


            if(x == 'R'){
                if($scope.colorR18 != "lime"){
                    $scope.colorR18 = $scope.warna;
                }else{
                    $scope.colorR18 = "white";
                }
            }


            if(x == 'L'){
                if($scope.colorL18 != "lime"){
                    $scope.colorL18 = $scope.warna;
                }else{
                    $scope.colorL18 = "white";
                }
            }



           
            
        };


        $scope.setStatus = function(x){

           

            if(x == '1'){

                $scope.status = "Cavity";
                $scope.warna = "#7266ba";

            }

            if(x == '2'){
                
                $scope.status = "Missing";
                $scope.warna = "#23b7e5";
                
            }

            if(x == '3'){
                
                $scope.status = "Implakasi";
                $scope.warna = "#27c24c";
                
            }

            if(x == '4'){
                
                $scope.status = "Gigi goyang";
                $scope.warna = "#fad733";
                
            }

            if(x == '5'){
                
                $scope.status = "Bridge";
                $scope.warna = "#f05050";
                
            }

        };


        
        $scope.simpanData = function(){

            $http({
                method: 'POST',
                url:  '../apidb/klinik/submit_rekam_medis.php',
                data: {idKunjungan: $routeParams.idkunjungan, idPasien: $routeParams.id, idDokter: $scope.iddokter, namaDokter: $scope.namadokter, amnese: $scope.amnese, diagnosa: $scope.diagnosa }
            }).then(function (response) {
                // on success
                if(response.status==200){
                    $route.reload();    
                }
            });

            if($scope.daftarObat.length != 0){
                for(var i = 0; i < $scope.daftarObat.length; i++){
                   // Memasukkan data obat ke database 
                   var id_obat = $scope.daftarObat[i].mid;
                   var quantity_obat = $scope.daftarObat[i].mid;
                    $http({
                        method: 'POST',
                        url:  '../apidb/klinik/submit_obat_kunjungan.php',
                        data: {idKunjungan: $routeParams.idkunjungan, idObat: id_obat, quantityObat: quantity_obat }   
                    }).then(function (response) {
                        // on success
                        if(response.status==200){
                            $route.reload();    
                        }
                    });
                }
            }

        };

    setTimeout(function(){
        $('#mytableLayanan').dataTable({
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



