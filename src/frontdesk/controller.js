
var app = angular.module('myApp.controller', []);


app.controller("HomeCtrl", function ($scope, $cookies, $interval,$http, $route,$timeout, $routeParams, $window) {
    
    $http.get("../apidb/antrian/list_data.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
    });  

});

app.controller("LayananMedisCtrl", function ($scope, $cookies, $interval,$http, $route,$timeout, $routeParams, $window) {
    $scope.shTable = true;
   


    $http.get("../apidb/tindakan_medis/list_data.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
       });

     

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
           
            console.log("noRekamMedis");
            $http({
                
                 method: 'POST',
                 url:  '../apidb/pasien/postedit.php',
                 data: {newId: $scope.id, noRekamMedis: $scope.noRekamMedis, tglRegistrasi: $scope.tglreg , newName: $scope.name, tempatLahir: $scope.tptlahir, tanggalLahir: $scope.tgllahir , newKelamin: $scope.kelamin, agama: $scope.agama , alamat: $scope.alamat, rtrw: $scope.rtrw , kelurahan: $scope.kelurahan, kecamatan: $scope.kecamatan, kabupaten: $scope.kabupaten, propinsi: $scope.propinsi, newPhone: $scope.phone, kewarganegaraan: $scope.kewarganegaraan, noKtp: $scope.noktp, pendidikan: $scope.pendidikan , pekerjaan: $scope.pekerjaan, statusPerkawinan: $scope.status_perkawinan , tglPertamamasuk: $scope.tgl_pertama_masuk , caraBayar: $scope.cara_bayar , tujuanKunjunganpertama: $scope.tujuan_kunjungan_pertama, alergi: $scope.alergi , catatan: $scope.catatan}
                 
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
                 data: {noRekamMedis: $scope.noRekamMedis, tglRegistrasi: $scope.tglreg , newName: $scope.name, tempatLahir: $scope.tptlahir, tanggalLahir: $scope.tgllahir , newKelamin: $scope.kelamin, agama: $scope.agama , alamat: $scope.alamat, rtrw: $scope.rtrw , kelurahan: $scope.kelurahan, kecamatan: $scope.kecamatan, kabupaten: $scope.kabupaten, propinsi: $scope.propinsi, newPhone: $scope.phone, kewarganegaraan: $scope.kewarganegaraan, noKtp: $scope.noktp, pendidikan: $scope.pendidikan , pekerjaan: $scope.pekerjaan, statusPerkawinan: $scope.status_perkawinan , tglPertamamasuk: $scope.tgl_pertama_masuk , caraBayar: $scope.cara_bayar , tujuanKunjunganpertama: $scope.tujuan_kunjungan_pertama, alergi: $scope.alergi , catatan: $scope.catatan }
                 
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
         //Time Stamp Untuk Rekam Medis
         var d = new Date();
         var n = d.getTime();

         $scope.noRekamMedis = n;
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
                console.log(response.data);
                // on success
                $scope.people           = response.data;
                $scope.id               =  $scope.people.id;
                $scope.noRekamMedis     =  $scope.people.no_rekam_medis;
				$scope.tglreg           =  $scope.people.tgl_registrasi;
                $scope.name             =  $scope.people.name;
				$scope.tptlahir         =  $scope.people.tempat_lahir;
				$scope.tgllahir         =  $scope.people.tanggal_lahir;
				$scope.kelamin          =  $scope.people.jenis_kelamin;
				$scope.agama            =  $scope.people.agama;
				$scope.alamat           =  $scope.people.alamat;
				$scope.rtrw             =  $scope.people.rtrw;
				$scope.kelurahan        =  $scope.people.kelurahan;
				$scope.kecamatan        =  $scope.people.kecamatan;
				$scope.kabupaten        =  $scope.people.kabupaten;
				$scope.propinsi         =  $scope.people.propinsi;
				$scope.phone            =  $scope.people.phone;
                $scope.kewarganegaraan  =  $scope.people.kewarganegaraan;
				$scope.noktp            =  $scope.people.noktp;
				$scope.pendidikan       =  $scope.people.pendidikan;
				$scope.pekerjaan        =  $scope.people.pekerjaan;
				$scope.status_perkawinan     =  $scope.people.status_perkawinan;
				$scope.tgl_pertama_masuk     =  $scope.people.tgl_pertama_masuk;
				$scope.cara_bayar            =  $scope.people.cara_bayar;
				$scope.tujuan_kunjungan_pertama            =  $scope.people.tujuan_kunjungan_pertama;
				$scope.alergi           =  $scope.people.alergi;
				$scope.catatan          =  $scope.people.catatan;
                
               
                
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
       $scope.id       =  "";
				$scope.noreg    =  "";
				$scope.tglreg   =  "";
                $scope.name     =  "";
				$scope.tptlahir =  "";
				$scope.tgllahir             =  "";
				$scope.kelamin          =  "";
				$scope.agama            =  "";
				$scope.alamat            =  "";
				$scope.rtrw            = "";
				$scope.kelurahan            =  "";
				$scope.kecamatan            =  "";
				$scope.kabupaten             =  "";
				$scope.propinsi            =  "";
				$scope.phone            =  "";
                $scope.kewarganegaraan            =  "";
				$scope.noktp            =  "";
				$scope.pendidikan            =  "";
				$scope.pekerjaan            =  "";
				$scope.status_perkawinan            =  "";
				$scope.tgl_pertama_masuk            =  "";
				$scope.cara_bayar            =  "";
				$scope.tujuan_kunjungan_pertama            = "";
				$scope.alergi            = "";
				$scope.catatan            =  "";
        
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
                url: '../apidb/users/get.php',
                data: {newId: x}
            }).then(function (response) {
                console.log(response);
                // on success
                $scope.people           = response.data;
                $scope.id               =  $scope.people.id;
                $scope.username             =  $scope.people.username;
                $scope.password            =  $scope.people.password;
                $scope.akses          =  $scope.people.akses;
                
            }, function (response) {
                
                // on error
                console.log(response.data,response.status);
                
            });
        };
		
		$scope.deleteForm = function(x) {
       // console.log("This Is delete x value "+x);
        $http({
            
            method: 'POST',
            url:  '../apidb/users/delete.php',
            data: { recordId : x }
            
        }).then(function (response) {
      
           $route.reload();  
      
        }, function (response) {
            
            console.log(response.data,response.status);
            
        });
      };
		
		
	$scope.cancelForm = function() {
        
        $scope.shTable      = true;
        $scope.shForm       = false;
        $scope.id           =  "";
        $scope.username     =  "";
        $scope.password     =  "";
        $scope.akses        =  "";
		
        
    };
		
		$scope.submitForm = function(){
			if($scope.id){
            console.log(" ID YANG DIEDIT "+ $scope.id);
            console.log($scope.id);
            console.log($scope.name);
            console.log($scope.password);
            console.log($scope.akses);
            $http({
                
                 method: 'POST',
                 url:  '../apidb/users/postedit.php',
                 data: {newId: $scope.id, newName: $scope.username, newPassword: $scope.password  , newAkses: $scope.akses}
                 
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
                 url:  '../apidb/users/post.php',
                 data: {newName: $scope.username, newPassword: $scope.password  , newAkses: $scope.akses}
                 
            }).then(function (response) {
                // on success
                if(response.status==200){
                    $route.reload();    
                }
            });
		}
		};
		
	

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
        $scope.tablePelayanan = false;
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

         
        $http.get("../apidb/klinik/list_rekam_medis_pasien.php?idpasien="+$scope.id_pasien).then(function (response) {
            $scope.rekamMedisPasien = response.data.event;
            console.log($scope.rekamMedisPasien);
        });

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

        $scope.showTable = function (x){
            $scope.idRM = x;
            $scope.tablePelayanan = true;
            $http.get("../apidb/klinik/list_data_kunjugan_klinik.php?idkunjungan="+$scope.idRM).then(function (response) {
                $scope.dataKunjunganKlinik = response.data.event;
                console.log($scope.dataKunjunganKlinik);
            });
        };

        $scope.hideTable = function (){
            
            $scope.tablePelayanan = false;
            
        };

        $scope.submitForm= function(){
            var xx = new Date();
            var yy = d.getTime();

            $scope.idAntrian = yy;

            console.log("ID ANTRIAN YANG DIDAPAT "+$scope.idAntrian );

            $http({
                
                 method: 'POST',
                 url:  '../apidb/datapasien/submit_ke_klinik.php',
                 data: {idKunjungan: $scope.id_kunjungan, idAntrian: $scope.idAntrian, idKlinik: $scope.klinik  , dokterPendamping: $scope.dokterpendamping, dokterPendamping: $scope.dokterpendamping, idDokter: $scope.dokterpraktisi, idPasien: $scope.id_pasien }
                 
            }).then(function (response) {
                // on success
                if(response.status==200){
                    $route.reload();    
                }
            });
        };       


});

app.controller("LayananCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {
    
    $scope.shTable  = true;
    $scope.shForm   = false;
    $scope.id ="";

  
   $http.get("../apidb/layanan/list_data.php?id="+$routeParams.id).then(function (response) {
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
                url: '../apidb/layanan/get.php',
                data: {newId: x}
            }).then(function (response) {
                console.log(response);
                // on success
                $scope.people           = response.data;
                $scope.id               =  $scope.people.id;
                $scope.name             =  $scope.people.layanan;            
                $scope.bahan          =  $scope.people.bahan;
				$scope.harga_bahan         =  $scope.people.harga_bahan;
				$scope.harga_koas          =  $scope.people.harga_koas;
				$scope.harga_drg          =  $scope.people.harga_drg;
				$scope.harga_drgsp          =  $scope.people.harga_drgsp;
                
            }, function (response) {
                
                // on error
                console.log(response.data,response.status);
                
            });
        };
		
		$scope.deleteForm = function(x) {
       // console.log("This Is delete x value "+x);
        $http({
            
            method: 'POST',
            url:  '../apidb/layanan/delete.php',
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
            console.log($scope.harga_bahan);
            $http({
                
                 method: 'POST',
                 url:  '../apidb/layanan/postedit.php',
                 data: {newId: $scope.id, newName: $scope.name,newBahan: $scope.bahan, newHargabahan: $scope.harga_bahan, newHargakoas: $scope.harga_koas, newHargadrg: $scope.harga_drg,newHargadrgsp: $scope.harga_drgsp}
                 
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
                 url:  '../apidb/layanan/post.php?id='+$routeParams.id,
                 data: {newName: $scope.name, newBahan: $scope.bahan, newHargabahan: $scope.harga_bahan, newHargakoas: $scope.harga_koas, newHargadrg: $scope.harga_drg, newHargadrgsp: $scope.harga_drgsp}
                 
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
