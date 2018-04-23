
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
       });
});


app.controller("PasienCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {
    $scope.shTable  = true;
    $scope.shForm   = false;
    $scope.id ="";
   // $http.get("config/daftar_pasien.php").then(function (response) {
   $http.get("../apidb/pasien/list_data.php").then(function (response) {
        $scope.myData = response.data.event;
    });

    $scope.no = Math.floor((Math.random() * 10000) + 1);
    $scope.submitForm = function() {
        

        if($scope.id){

            console.log("EDIT");
            console.log(" ID YANG DIEDIT "+ $scope.no_rekam_medis);
            console.log("ID "+$scope.id);
            $http({
                
                 method: 'POST',
                 url:  '../apidb/pasien/postedit.php',
                 data: {newId: $scope.id,noRekamMedis: $scope.no_rekam_medis, noRegistrasi: $scope.noreg, tglRegistrasi: $scope.tglreg , newName: $scope.name, tempatLahir: $scope.tptlahir, tanggalLahir: $scope.tgllahir , newKelamin: $scope.kelamin, agama: $scope.agama , alamat: $scope.alamat, rtrw: $scope.rtrw , kelurahan: $scope.kelurahan, kecamatan: $scope.kecamatan, kabupaten: $scope.kabupaten, propinsi: $scope.propinsi, newPhone: $scope.phone, kewarganegaraan: $scope.kewarganegaraan, noKtp: $scope.noktp, pendidikan: $scope.pendidikan , pekerjaan: $scope.pekerjaan, statusPerkawinan: $scope.status_perkawinan , tglPertamamasuk: $scope.tgl_pertama_masuk , caraBayar: $scope.cara_bayar , tujuanKunjunganpertama: $scope.tujuan_kunjungan_pertama, alergi: $scope.alergi , catatan: $scope.catatan}
                 
            }).then(function (response) {

                console.log(response);
                // on success
                if(response.status==200){
                    $route.reload(); 
                    alert("Data Pasien Telah Diubah");       
                }
            });
        }else{
            console.log("INPUT");

            $http({
                
                 method: 'POST',
                 url:  '../apidb/pasien/post.php',
                 data: {noRekamMedis: $scope.no_rekam_medis, noRegistrasi: $scope.noreg, tglRegistrasi: $scope.tglreg , newName: $scope.name, tempatLahir: $scope.tptlahir, tanggalLahir: $scope.tgllahir , newKelamin: $scope.kelamin, agama: $scope.agama , alamat: $scope.alamat, rtrw: $scope.rtrw , kelurahan: $scope.kelurahan, kecamatan: $scope.kecamatan, kabupaten: $scope.kabupaten, propinsi: $scope.propinsi, newPhone: $scope.phone, kewarganegaraan: $scope.kewarganegaraan, noKtp: $scope.noktp, pendidikan: $scope.pendidikan , pekerjaan: $scope.pekerjaan, statusPerkawinan: $scope.status_perkawinan , tglPertamamasuk: $scope.tgl_pertama_masuk , caraBayar: $scope.cara_bayar , tujuanKunjunganpertama: $scope.tujuan_kunjungan_pertama, alergi: $scope.alergi , catatan: $scope.catatan }
                 
            }).then(function (response) {
                // on success
                if(response.status==200){
                    $route.reload();
                    alert("Data Pasien Telah Ditambahkan");    
                }
                //console.log(response);
            });

        }
    };

    $scope.showForm = function() {
        $scope.shTable  = false;
        $scope.shForm   = true;
        $scope.id = "";
    };

    $scope.editForm = function(x) {
            $scope.shTable  = false;
            $scope.shForm   = true;
            console.log("This Is x value edit "+x);
            $http({
                method: 'POST',    
                url: '../apidb/pasien/get.php',
                data: {newId: x}
            }).then(function (response) {
                console.log(response.data);
                // on success
                $scope.people           = response.data;
                $scope.id   =  $scope.people.no_rekam_medis;
                $scope.no_rekam_medis   =  $scope.people.no_rekam_medis;
				$scope.noreg    =  $scope.people.no_registrasi;
				$scope.tglreg   =  $scope.people.tgl_registrasi;
                $scope.name             =  $scope.people.name;
				$scope.tptlahir             =  $scope.people.tempat_lahir;
				$scope.tgllahir             =  $scope.people.tanggal_lahir;
				$scope.kelamin          =  $scope.people.jenis_kelamin;
				$scope.agama            =  $scope.people.agama;
				$scope.alamat            =  $scope.people.alamat;
				$scope.rtrw            =  $scope.people.rtrw;
				$scope.kelurahan            =  $scope.people.kelurahan;
				$scope.kecamatan            =  $scope.people.kecamatan;
				$scope.kabupaten             =  $scope.people.kabupaten;
				$scope.propinsi            =  $scope.people.propinsi;
				$scope.phone            =  $scope.people.phone;
                $scope.kewarganegaraan            =  $scope.people.kewarganegaraan;
				$scope.noktp            =  $scope.people.noktp;
				$scope.pendidikan            =  $scope.people.pendidikan;
				$scope.pekerjaan            =  $scope.people.pekerjaan;
				$scope.status_perkawinan            =  $scope.people.status_perkawinan;
				$scope.tgl_pertama_masuk            =  $scope.people.tgl_pertama_masuk;
				$scope.cara_bayar            =  $scope.people.cara_bayar;
				$scope.tujuan_kunjungan_pertama            =  $scope.people.tujuan_kunjungan_pertama;
				$scope.alergi            =  $scope.people.alergi;
				$scope.catatan            =  $scope.people.catatan;
                
               
                
            }, function (response) {
                
                // on error
                console.log(response.data,response.status);
                
            });
        
    };


    $scope.deleteForm = function(x) {
        console.log("This Is delete x value "+x);
        $scope.combro = x;
        $http({
            
            method: 'POST',
            url:  '../apidb/pasien/delete.php',
            data: { recordId : $scope.combro }
            
        }).then(function (response) {
            // on success
            if(response.status==200){
                $route.reload();
                alert("Data Pasien Telah Dihapus");    
            }
            // console.log("combro"+$scope.combro);
            // console.log(response);
        });
      };

    $scope.cancelForm = function() {
        
        $scope.shTable  = true;
        $scope.shForm   = false;
				$scope.no_rekam_medis       =  "";
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
      
   $http.get("../apidb/kunjungan/list_data_kunjungan_dashboard.php?id="+$routeParams.id+"&status=0").then(function (response) {
    $scope.myData = response.data.event;
    console.log(response.data.event);
   });

   console.log("Controller Works");


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
            
            $scope.shTable          = true;
            $scope.shForm           = false;
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

app.controller("DataPasienCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window, $location) {
  
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
            $scope.people           =  response.data;
            $scope.id               =  $scope.people.id;
            $scope.namaPasien       =  $scope.people.name;
            $scope.phone            =  $scope.people.phone;
            $scope.kelamin          =  $scope.people.jenis_kelamin;
            $scope.umur             =  $scope.people.umur;
            $scope.tinggi_badan     =  $scope.people.tinggi_badan;
            $scope.golongan_darah   =  $scope.people.golongan_darah;
            $scope.berat_badan      =  $scope.people.berat_badan;
           
            
        }, function (response) {
            
            // on error
            console.log(response.data,response.status);
            
        });

         
        $http.get("../apidb/klinik/list_rekam_medis_pasien.php?idpasien="+$scope.id_pasien).then(function (response) {
           
            $scope.rekamMedisPasien = response.data.event;
            console.log($scope.rekamMedisPasien);
        });


        console.log("Data Perawatan Pasien");
        $http.get("../apidb/klinik/list_perawatan_pasien.php?idpasien="+$scope.id_pasien).then(function (response) {
            console.log("SUKAKMU LAH ");
            $scope.dataPerawatanPasien = response.data.event;
            console.log($scope.dataPerawatanPasien);
        });

        // //fungsi untuk query dokter di klinik 
        // $scope.selectDokter = function(){
        //     console.log("Klinik Telah Dipilih");
        //     console.log("klinik"+$scope.klinik);
        //     $scope.dataDokter ="";

        //     $http.get("../apidb/dokter/list_dokter_get.php?id="+$scope.klinik).then(function (response) {
        //         $scope.dataDokter = response.data.event;
        //         console.log(response.data.event);
        //     });
        // };

       


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

            console.log("REKAM MEDIS"+$scope.rekam_medis);
            if($scope.rekam_medis == true){

                $scope.bRekamMedis = '1';

            }else{
                $scope.bRekamMedis = '0';
            }

            $http({    
                 method: 'POST',
                 url:  '../apidb/datapasien/submit_ke_klinik.php',
                 data: {newRekamMedis:$scope.bRekamMedis ,idKunjungan: $scope.id_kunjungan, idAntrian: $scope.idAntrian, idKlinik: $scope.klinik  , dokterPendamping: $scope.dokterpendamping, dokterPendamping: $scope.dokterpendamping, idDokter: $scope.dokterpraktisi, idPasien: $scope.id_pasien }
                 
            }).then(function (response) {
                // on success
                if(response.status==200){
                    ///console.log(response.data);
                    
                    alert("Pasien Telah Diarahkan Ke Klinik");
                    $location.path("/home");
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
                $scope.people           =  response.data;
                $scope.id               =  $scope.people.id;
                $scope.name             =  $scope.people.layanan;            
                $scope.bahan            =  $scope.people.bahan;
				$scope.harga_bahan      =  $scope.people.harga_bahan;
				$scope.harga_koas       =  $scope.people.harga_koas;
				$scope.harga_drg        =  $scope.people.harga_drg;
				$scope.harga_drgsp      =  $scope.people.harga_drgsp;
                
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



app.controller("RekamMedisCtrl", function ($scope,$ngConfirm, $interval, $http, $route, $timeout, $routeParams, $window) {

    $scope.idPasien = $routeParams.id;
    $scope.daftarKondisiGigi = [];

    //Kode Gambar Gigi Untuk Form Odontograma
    $scope.imageUrl18 = "../img/G1G1.png";
    $scope.imageUrl17 = "../img/G1G1.png";
    $scope.imageUrl16 = "../img/G1G1.png";
    $scope.imageUrl15 = "../img/G1G1.png";
    $scope.imageUrl14 = "../img/G1G1.png";
    $scope.imageUrl13 = "../img/G1G1.png";
    $scope.imageUrl12 = "../img/G1G1.png";
    $scope.imageUrl11 = "../img/G1G1.png";

    $scope.imageUrl21 = "../img/G1G1.png";
    $scope.imageUrl22 = "../img/G1G1.png";
    $scope.imageUrl23 = "../img/G1G1.png";
    $scope.imageUrl24 = "../img/G1G1.png";
    $scope.imageUrl25 = "../img/G1G1.png";
    $scope.imageUrl26 = "../img/G1G1.png";
    $scope.imageUrl27 = "../img/G1G1.png";
    $scope.imageUrl28 = "../img/G1G1.png";

    $scope.imageUrl55 = "../img/G1G1.png";
    $scope.imageUrl54 = "../img/G1G1.png";
    $scope.imageUrl53 = "../img/G1G1.png";
    $scope.imageUrl52 = "../img/G1G1.png";
    $scope.imageUrl51 = "../img/G1G1.png";

    $scope.imageUrl61 = "../img/G1G1.png";
    $scope.imageUrl62 = "../img/G1G1.png";
    $scope.imageUrl63 = "../img/G1G1.png";
    $scope.imageUrl64 = "../img/G1G1.png";
    $scope.imageUrl65 = "../img/G1G1.png";

    $scope.imageUrl85 = "../img/G1G1.png";
    $scope.imageUrl84 = "../img/G1G1.png";
    $scope.imageUrl83 = "../img/G1G1.png";
    $scope.imageUrl82 = "../img/G1G1.png";
    $scope.imageUrl81 = "../img/G1G1.png";

    $scope.imageUrl71 = "../img/G1G1.png";
    $scope.imageUrl72 = "../img/G1G1.png";
    $scope.imageUrl73 = "../img/G1G1.png";
    $scope.imageUrl74 = "../img/G1G1.png";
    $scope.imageUrl75 = "../img/G1G1.png";

    $scope.imageUrl48 = "../img/G1G1.png";
    $scope.imageUrl47 = "../img/G1G1.png";
    $scope.imageUrl46 = "../img/G1G1.png";
    $scope.imageUrl45 = "../img/G1G1.png";
    $scope.imageUrl44 = "../img/G1G1.png";
    $scope.imageUrl43 = "../img/G1G1.png";
    $scope.imageUrl42 = "../img/G1G1.png";
    $scope.imageUrl41 = "../img/G1G1.png";

    $scope.imageUrl31 = "../img/G1G1.png";
    $scope.imageUrl32 = "../img/G1G1.png";
    $scope.imageUrl33 = "../img/G1G1.png";
    $scope.imageUrl34 = "../img/G1G1.png";
    $scope.imageUrl35 = "../img/G1G1.png";
    $scope.imageUrl36 = "../img/G1G1.png";
    $scope.imageUrl37 = "../img/G1G1.png";
    $scope.imageUrl38 = "../img/G1G1.png";


    $http.get("../apidb/dokter/list_data.php").then(function (response) {
        $scope.dataDokter = response.data.event;
        console.log(response.data.event);
    });

    //GET DATA PASIEN
    $http({
        method: 'POST',
        url: '../apidb/pasien/get.php',
        data: { newId: $routeParams.id }
    }).then(function (response) {
        // on success
        $scope.people = response.data;
        $scope.id = $scope.people.id;
        $scope.namaPasien = $scope.people.name;
        $scope.phone = $scope.people.phone;
        $scope.kelamin = $scope.people.jenis_kelamin;
        $scope.umur = $scope.people.umur;
        $scope.tinggi_badan = $scope.people.tinggi_badan;
        $scope.golongan_darah = $scope.people.golongan_darah;
        $scope.berat_badan = $scope.people.berat_badan;
        $scope.alamat = $scope.people.alamat;
    }, function (response) {

        // on error
        console.log(response.data, response.status);

    });

    // GET DATA ODONTOGRAMA
    $http({
        method: 'POST',
        url: '../apidb/rekam_medis/get_odontograma.php',
        data: { newId: $routeParams.id }
    }).then(function (response) {

        // on success

        $scope.og = response.data;
        $scope.odontoData = $scope.og.keterangan;

        var JSONDATA = JSON.parse($scope.odontoData);


        for (var i = 0; i < JSONDATA.length; i++) {



            console.log(JSONDATA[i].teeth);

            var obj = { teeth: JSONDATA[i].teeth, explaination: JSONDATA[i].explaination, keterangan: JSONDATA[i].keterangan, url: JSONDATA[i].url };
            $scope.daftarKondisiGigi.push(obj);

            $scope.teethValue = JSONDATA[i].teeth;

            if ($scope.teethValue == 18) {

                $scope.imageUrl18 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 17) {

                $scope.imageUrl17 = JSONDATA[i].url;
            }

            if ($scope.teethValue == 16) {

                $scope.imageUrl16 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 15) {

                $scope.imageUrl15 = JSONDATA[i].url;
            }

            if ($scope.teethValue == 14) {

                $scope.imageUrl14 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 13) {

                $scope.imageUrl13 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 12) {

                $scope.imageUrl12 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 11) {

                $scope.imageUrl11 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 21) {

                $scope.imageUrl21 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 22) {

                $scope.imageUrl22 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 23) {

                $scope.imageUrl23 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 24) {

                $scope.imageUrl24 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 25) {

                $scope.imageUrl25 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 26) {

                $scope.imageUrl26 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 27) {

                $scope.imageUrl27 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 28) {

                $scope.imageUrl28 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 55) {

                $scope.imageUrl55 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 54) {

                $scope.imageUrl54 = JSONDATA[i].url;

            }


            if ($scope.teethValue == 53) {

                $scope.imageUrl53 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 52) {

                $scope.imageUrl52 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 51) {

                $scope.imageUrl51 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 61) {

                $scope.imageUrl61 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 62) {

                $scope.imageUrl62 = JSONDATA[i].url;

            }


            if ($scope.teethValue == 63) {

                $scope.imageUrl63 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 64) {

                $scope.imageUrl64 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 65) {

                $scope.imageUrl65 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 85) {

                $scope.imageUrl85 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 84) {

                $scope.imageUrl84 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 83) {

                $scope.imageUrl83 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 82) {

                $scope.imageUrl82 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 81) {

                $scope.imageUrl81 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 71) {

                $scope.imageUrl71 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 72) {

                $scope.imageUrl72 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 73) {

                $scope.imageUrl73 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 74) {

                $scope.imageUrl74 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 75) {

                $scope.imageUrl75 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 48) {

                $scope.imageUrl48 = JSONDATA[i].url;

            }

            if ($scope.teethValue == 47) {
                $scope.imageUrl47 = JSONDATA[i].url;
            }
            if ($scope.teethValue == 46) {
                $scope.imageUrl46 = JSONDATA[i].url;
            }
            if ($scope.teethValue == 45) {
                $scope.imageUrl45 = JSONDATA[i].url;
            }
            if ($scope.teethValue == 44) {
                $scope.imageUrl44 = JSONDATA[i].url;
            }
            if ($scope.teethValue == 43) {
                $scope.imageUrl43 = JSONDATA[i].url;
            }
            if ($scope.teethValue == 42) {
                $scope.imageUrl42 = JSONDATA[i].url;
            }
            if ($scope.teethValue == 41) {
                $scope.imageUrl41 = JSONDATA[i].url;
            }
            if ($scope.teethValue == 31) {
                $scope.imageUrl31 = JSONDATA[i].url;
            }
            if ($scope.teethValue == 32) {
                $scope.imageUrl32 = JSONDATA[i].url;
            }
            if ($scope.teethValue == 33) {
                $scope.imageUrl33 = JSONDATA[i].url;
            }
            if ($scope.teethValue == 34) {
                $scope.imageUrl34 = JSONDATA[i].url;
            }
            if ($scope.teethValue == 35) {
                $scope.imageUrl35 = JSONDATA[i].url;
            }
            if ($scope.teethValue == 36) {
                $scope.imageUrl36 = JSONDATA[i].url;
            }
            if ($scope.teethValue == 37) {
                $scope.imageUrl37 = JSONDATA[i].url;
            }
            if ($scope.teethValue == 38) {
                $scope.imageUrl38 = JSONDATA[i].url;
            }
        }
    }, function (response) {
        // on error
        console.log(response.data, response.status);
    });

    //GET RIWAYAT PENYAKIT
    $http({
        method: 'POST',
        url: '../apidb/rekam_medis/get_rm_riwayat_penyakit.php',
        data: { newId: $routeParams.id }
    }).then(function (response) {
        // on success
        $scope.people = response.data;
        $scope.status_jantung = Boolean(parseInt($scope.people.status_jantung));
        $scope.keterangan_jantung = $scope.people.keterangan_jantung;

        $scope.status_hipertensi = Boolean(parseInt($scope.people.status_hipertensi));
        $scope.keterangan_hipertensi = $scope.people.keterangan_hipertensi;

        $scope.status_diabetes = Boolean(parseInt($scope.people.status_diabetes));
        $scope.keterangan_diabetes = $scope.people.keterangan_diabetes;

        $scope.status_alergi = Boolean(parseInt($scope.people.status_alergi));
        $scope.keterangan_alergi = $scope.people.keterangan_alergi;

        $scope.status_asma = Boolean(parseInt($scope.people.status_asma));
        $scope.keterangan_asma = $scope.people.keterangan_asma;

        $scope.status_hepar = Boolean(parseInt($scope.people.status_hepar));
        $scope.keterangan_hepar = $scope.people.keterangan_hepar;

        $scope.status_lambung = Boolean(parseInt($scope.people.status_lambung));
        $scope.keterangan_lambung = $scope.people.keterangan_lambung;

        $scope.status_lain = Boolean(parseInt($scope.people.status_lain));
        $scope.keterangan_lain = $scope.people.keterangan_lain;
    }, function (response) {
        // on error
        console.log(response.data, response.status);
    });


     //GET KONDISI VITAL
     $http({
        method: 'POST',
        url: '../apidb/rekam_medis/get_rm_tanda_vital.php',
        data: { newId: $routeParams.id }
    }).then(function (response) {
        // on success
        $scope.people = response.data;
        $scope.kesadaran        = $scope.people.kesadaran;
        $scope.kondisi_umum     = $scope.people.kondisi_umum;
        $scope.tekanan_darah    = $scope.people.tekanan_darah;
        $scope.denyut_nadi      = $scope.people.denyut_nadi;
        $scope.pernafasan       = $scope.people.pernafasan;
        $scope.suhu             = $scope.people.suhu;
    }, function (response) {

        // on error
        console.log(response.data, response.status);

    });


    //GET DATA EKSTRA ORAL
    $http({
        method: 'POST',
        url: '../apidb/rekam_medis/get_rm_ekstra_oral.php',
        data: { newId: $routeParams.id }
    }).then(function (response) {
        // on success
        $scope.people                       = response.data;
        $scope.tonus_bibir                  = $scope.people.tonus_bibir;
        $scope.tmj                          = $scope.people.tmj;
        $scope.kelenjar_limfe               = $scope.people.kelenjar_limfe;
        $scope.kelainan_tmj                 = $scope.people.kelainan_tmj;
        $scope.keterangan_ekstra_oral       = $scope.people.keterangan_ekstra_oral;
    }, function (response) {

        // on error
        console.log(response.data, response.status);

    });

    //GET JARINGAN LUNAK MULUT
    $http({
        method: 'POST',
        url: '../apidb/rekam_medis/get_rm_jaringan_lunak_mulut.php',
        data: { newId: $routeParams.id }
    }).then(function (response) {
        // on success
        $scope.people                               = response.data;
        $scope.kebersihan_mulut                     = $scope.people.kebersihan_mulut;
        $scope.mukosa_bukal                         = $scope.people.mukosa_bukal;
        $scope.kelainan_mukosa_bukal                = $scope.people.kelainan_mukosa_bukal;
        $scope.mukosa_labial                        = $scope.people.mukosa_labial;
        $scope.kelainan_mukosa_labial               = $scope.people.kelainan_mukosa_labial;
        $scope.frenulum_labial                      = $scope.people.frenulum_labial;
        $scope.kelainan_frenulum_labial             = $scope.people.kelainan_frenulum_labial;
        $scope.lidah                                = $scope.people.lidah;
        $scope.kelainan_lidah                       = $scope.people.kelainan_lidah;
        $scope.palatum                              = $scope.people.palatum;
        $scope.kelainan_palatum                     = $scope.people.kelainan_palatum;
        $scope.tonsil                               = $scope.people.tonsil;
        $scope.kelainan_tonsil                      = $scope.people.kelainan_tonsil;
        $scope.dasar_mulut                          = $scope.people.dasar_mulut;
        $scope.kelainan_dasar_mulut                 = $scope.people.kelainan_dasar_mulut;
        $scope.gingiva                              = $scope.people.gingiva;
        $scope.kelainan_gingiva                     = $scope.people.kelainan_gingiva;
        $scope.keterangan_jaringan_lunak_mulut      = $scope.people.keterangan_jaringan_lunak_mulut;
    }, function (response) {

        // on error
        console.log(response.data, response.status);

    });


    $scope.SubmitRiwayatPenyakit=function(){
        $http({                
            method: 'POST',
            url:  '../apidb/klinik/put_rm_riwayat_penyakit.php',
            data: { idPasien: $routeParams.id ,
                statusJantung:  $scope.status_jantung,
                keteranganJantung : $scope.keterangan_jantung,

                statusHipertensi:  $scope.status_hipertensi,
                keteranganHipertensi : $scope.keterangan_hipertensi,

                statusDiabetes:  $scope.status_diabetes,
                keteranganDiabetes : $scope.keterangan_diabetes,

                statusAlergi:  $scope.status_alergi,
                keteranganAlergi : $scope.keterangan_alergi,

                statusAsma:  $scope.status_asma,
                keteranganAsma : $scope.keterangan_asma,

                statusHepar:  $scope.status_hepar,
                keteranganHepar : $scope.keterangan_hepar,

                statusLambung:  $scope.status_lambung,
                keteranganLambung : $scope.keterangan_lambung,

                statusLain:  $scope.status_lain,
                keteranganLain : $scope.keterangan_lain                    
            }
       }).then(function (response) {
        $ngConfirm('Input Riwayat Penyakit Sukses', 'RSGM USU');
           // on success
           if(response.status==200){
               $route.reload();    
           }
       });
    }

    $scope.SubmitTandaVital=function(){
       $http({                
        method: 'POST',
        url:  '../apidb/klinik/put_rm_tanda_vital.php',
        data: { idPasien: $routeParams.id ,
            kesadaran:  $scope.kesadaran,
            kondisiUmum : $scope.kondisi_umum,
            tekananDarah:  $scope.tekanan_darah,
            denyutNadi : $scope.denyut_nadi,
            pernafasan : $scope.pernafasan,
            suhu : $scope.suhu                          
        }
        }).then(function (response) {
            $ngConfirm('Input Tanda Vital Sukses', 'RSGM USU');
            // on success
            if(response.status==200){
                $route.reload();    
            }
        });
    }

    $scope.SubmitEkstraOral=function(){
        $http({                
         method: 'POST',
         url:  '../apidb/klinik/put_rm_ekstra_oral.php',
         data: { 
            idPasien                : $routeParams.id ,
            tonusBibir              : $scope.tonus_bibir,
            tmj                     : $scope.tmj,
            kelainanTmj             : $scope.tekanan_darah,
            kelenjarLimfe           : $scope.kelenjar_limfe,
            keteranganEkstraOral    : $scope.keterangan_ekstra_oral                    
         }
         }).then(function (response) {
             $ngConfirm('Input Data Ekstra Oral Sukses', 'RSGM USU');
             // on success
             if(response.status==200){
                 $route.reload();    
             }
         });
     }

     $scope.SubmitJaringanLunakMulut = function(){
        $http({                
            method: 'POST',
            url:  '../apidb/klinik/put_rm_jaringan_lunak_mulut.php',
            data: { 
               idPasien                       : $routeParams.id ,
              
               kebersihanMulut                : $scope.kebersihan_mulut,
           
               mukosaBukal                    : $scope.mukosa_bukal,
               kelainanMukosaBukal            : $scope.kelainan_mukosa_bukal,
           
               mukosaLabial                   : $scope.mukosa_labial,
               kelainanMukosaLabial           : $scope.kelainan_mukosa_labial,
           
               frenulumLabial                 : $scope.frenulum_labial,
               kelainanFrenulumLabial         : $scope.kelainan_frenulum_labial,
           
               lidah                          : $scope.lidah,
               kelainanLidah                  : $scope.kelainan_lidah,
           
               palatum                        : $scope.palatum,
               kelainanPalatum                : $scope.kelainan_palatum,
               
               tonsil                         : $scope.tonsil,
               kelainanTonsil                 : $scope.kelainan_tonsil,
           
               dasarMulut                     : $scope.dasar_mulut,
               kelainanDasarMulut             : $scope.kelainan_dasar_mulut,
           
               gingiva                        : $scope.gingiva,
               kelainanGingiva                : $scope.kelainan_gingiva,
           
               keteranganJaringanLunakMulut   : $scope.keterangan_jaringan_lunak_mulut                 
            }
            }).then(function (response) {
                $ngConfirm('Input Data Jaringan Lunak Mulut Sukses', 'RSGM USU');
                // on success
                if(response.status==200){
                    $route.reload();    
                }
        });
     }

});


//  app.controller("RekamMedisCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {


//     $scope.idPasien = $routeParams.id;
//     $scope.daftarKondisiGigi = [];

//     //Kode Gambar Gigi Untuk Form Odontograma
//     $scope.imageUrl18 = "../img/G1G1.png";
//     $scope.imageUrl17 = "../img/G1G1.png";
//     $scope.imageUrl16 = "../img/G1G1.png";
//     $scope.imageUrl15 = "../img/G1G1.png";
//     $scope.imageUrl14 = "../img/G1G1.png";
//     $scope.imageUrl13 = "../img/G1G1.png";
//     $scope.imageUrl12 = "../img/G1G1.png";
//     $scope.imageUrl11 = "../img/G1G1.png";

//     $scope.imageUrl21 = "../img/G1G1.png";
//     $scope.imageUrl22 = "../img/G1G1.png";
//     $scope.imageUrl23 = "../img/G1G1.png";
//     $scope.imageUrl24 = "../img/G1G1.png";
//     $scope.imageUrl25 = "../img/G1G1.png";
//     $scope.imageUrl26 = "../img/G1G1.png";
//     $scope.imageUrl27 = "../img/G1G1.png";
//     $scope.imageUrl28 = "../img/G1G1.png";

//     $scope.imageUrl55 = "../img/G1G1.png";
//     $scope.imageUrl54 = "../img/G1G1.png";
//     $scope.imageUrl53 = "../img/G1G1.png";
//     $scope.imageUrl52 = "../img/G1G1.png";
//     $scope.imageUrl51 = "../img/G1G1.png";

//     $scope.imageUrl61 = "../img/G1G1.png";
//     $scope.imageUrl62 = "../img/G1G1.png";
//     $scope.imageUrl63 = "../img/G1G1.png";
//     $scope.imageUrl64 = "../img/G1G1.png";
//     $scope.imageUrl65 = "../img/G1G1.png";

//     $scope.imageUrl85 = "../img/G1G1.png";
//     $scope.imageUrl84 = "../img/G1G1.png";
//     $scope.imageUrl83 = "../img/G1G1.png";
//     $scope.imageUrl82 = "../img/G1G1.png";
//     $scope.imageUrl81 = "../img/G1G1.png";

//     $scope.imageUrl71 = "../img/G1G1.png";
//     $scope.imageUrl72 = "../img/G1G1.png";
//     $scope.imageUrl73 = "../img/G1G1.png";
//     $scope.imageUrl74 = "../img/G1G1.png";
//     $scope.imageUrl75 = "../img/G1G1.png";

//     $scope.imageUrl48 = "../img/G1G1.png";
//     $scope.imageUrl47 = "../img/G1G1.png";
//     $scope.imageUrl46 = "../img/G1G1.png";
//     $scope.imageUrl45 = "../img/G1G1.png";
//     $scope.imageUrl44 = "../img/G1G1.png";
//     $scope.imageUrl43 = "../img/G1G1.png";
//     $scope.imageUrl42 = "../img/G1G1.png";
//     $scope.imageUrl41 = "../img/G1G1.png";

//     $scope.imageUrl31 = "../img/G1G1.png";
//     $scope.imageUrl32 = "../img/G1G1.png";
//     $scope.imageUrl33 = "../img/G1G1.png";
//     $scope.imageUrl34 = "../img/G1G1.png";
//     $scope.imageUrl35 = "../img/G1G1.png";
//     $scope.imageUrl36 = "../img/G1G1.png";
//     $scope.imageUrl37 = "../img/G1G1.png";
//     $scope.imageUrl38 = "../img/G1G1.png";


//     $http.get("../apidb/dokter/list_data.php").then(function (response) {
//         $scope.dataDokter = response.data.event;
//         console.log(response.data.event);
//     });

//     //GET DATA PASIEN
//     $http({
//         method: 'POST',
//         url: '../apidb/pasien/get.php',
//         data: { newId: $routeParams.id }
//     }).then(function (response) {
//         // on success
//         $scope.people = response.data;
//         $scope.id = $scope.people.id;
//         $scope.namaPasien = $scope.people.name;
//         $scope.phone = $scope.people.phone;
//         $scope.kelamin = $scope.people.jenis_kelamin;
//         $scope.umur = $scope.people.umur;
//         $scope.tinggi_badan = $scope.people.tinggi_badan;
//         $scope.golongan_darah = $scope.people.golongan_darah;
//         $scope.berat_badan = $scope.people.berat_badan;
//         $scope.alamat = $scope.people.alamat;
//     }, function (response) {

//         // on error
//         console.log(response.data, response.status);

//     });

//     // GET DATA ODONTOGRAMA
//     $http({
//         method: 'POST',
//         url: '../apidb/rekam_medis/get_odontograma.php',
//         data: { newId: $routeParams.id }
//     }).then(function (response) {

//         // on success

//         $scope.og = response.data;
//         $scope.odontoData = $scope.og.keterangan;

//         var JSONDATA = JSON.parse($scope.odontoData);


//         for (var i = 0; i < JSONDATA.length; i++) {



//             console.log(JSONDATA[i].teeth);

//             var obj = { teeth: JSONDATA[i].teeth, explaination: JSONDATA[i].explaination, keterangan: JSONDATA[i].keterangan, url: JSONDATA[i].url };
//             $scope.daftarKondisiGigi.push(obj);

//             $scope.teethValue = JSONDATA[i].teeth;

//             if ($scope.teethValue == 18) {

//                 $scope.imageUrl18 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 17) {

//                 $scope.imageUrl17 = JSONDATA[i].url;
//             }

//             if ($scope.teethValue == 16) {

//                 $scope.imageUrl16 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 15) {

//                 $scope.imageUrl15 = JSONDATA[i].url;
//             }

//             if ($scope.teethValue == 14) {

//                 $scope.imageUrl14 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 13) {

//                 $scope.imageUrl13 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 12) {

//                 $scope.imageUrl12 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 11) {

//                 $scope.imageUrl11 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 21) {

//                 $scope.imageUrl21 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 22) {

//                 $scope.imageUrl22 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 23) {

//                 $scope.imageUrl23 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 24) {

//                 $scope.imageUrl24 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 25) {

//                 $scope.imageUrl25 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 26) {

//                 $scope.imageUrl26 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 27) {

//                 $scope.imageUrl27 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 28) {

//                 $scope.imageUrl28 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 55) {

//                 $scope.imageUrl55 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 54) {

//                 $scope.imageUrl54 = JSONDATA[i].url;

//             }


//             if ($scope.teethValue == 53) {

//                 $scope.imageUrl53 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 52) {

//                 $scope.imageUrl52 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 51) {

//                 $scope.imageUrl51 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 61) {

//                 $scope.imageUrl61 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 62) {

//                 $scope.imageUrl62 = JSONDATA[i].url;

//             }


//             if ($scope.teethValue == 63) {

//                 $scope.imageUrl63 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 64) {

//                 $scope.imageUrl64 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 65) {

//                 $scope.imageUrl65 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 85) {

//                 $scope.imageUrl85 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 84) {

//                 $scope.imageUrl84 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 83) {

//                 $scope.imageUrl83 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 82) {

//                 $scope.imageUrl82 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 81) {

//                 $scope.imageUrl81 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 71) {

//                 $scope.imageUrl71 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 72) {

//                 $scope.imageUrl72 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 73) {

//                 $scope.imageUrl73 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 74) {

//                 $scope.imageUrl74 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 75) {

//                 $scope.imageUrl75 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 48) {

//                 $scope.imageUrl48 = JSONDATA[i].url;

//             }

//             if ($scope.teethValue == 47) {
//                 $scope.imageUrl47 = JSONDATA[i].url;
//             }
//             if ($scope.teethValue == 46) {
//                 $scope.imageUrl46 = JSONDATA[i].url;
//             }
//             if ($scope.teethValue == 45) {
//                 $scope.imageUrl45 = JSONDATA[i].url;
//             }
//             if ($scope.teethValue == 44) {
//                 $scope.imageUrl44 = JSONDATA[i].url;
//             }
//             if ($scope.teethValue == 43) {
//                 $scope.imageUrl43 = JSONDATA[i].url;
//             }
//             if ($scope.teethValue == 42) {
//                 $scope.imageUrl42 = JSONDATA[i].url;
//             }
//             if ($scope.teethValue == 41) {
//                 $scope.imageUrl41 = JSONDATA[i].url;
//             }
//             if ($scope.teethValue == 31) {
//                 $scope.imageUrl31 = JSONDATA[i].url;
//             }
//             if ($scope.teethValue == 32) {
//                 $scope.imageUrl32 = JSONDATA[i].url;
//             }
//             if ($scope.teethValue == 33) {
//                 $scope.imageUrl33 = JSONDATA[i].url;
//             }
//             if ($scope.teethValue == 34) {
//                 $scope.imageUrl34 = JSONDATA[i].url;
//             }
//             if ($scope.teethValue == 35) {
//                 $scope.imageUrl35 = JSONDATA[i].url;
//             }
//             if ($scope.teethValue == 36) {
//                 $scope.imageUrl36 = JSONDATA[i].url;
//             }
//             if ($scope.teethValue == 37) {
//                 $scope.imageUrl37 = JSONDATA[i].url;
//             }
//             if ($scope.teethValue == 38) {
//                 $scope.imageUrl38 = JSONDATA[i].url;
//             }
//         }
//     }, function (response) {
//         // on error
//         console.log(response.data, response.status);
//     });

//     //GET RIWAYAT PENYAKIT
//     $http({
//         method: 'POST',
//         url: '../apidb/rekam_medis/get_rm_riwayat_penyakit.php',
//         data: { newId: $routeParams.id }
//     }).then(function (response) {
//         // on success
//         $scope.people = response.data;
//         $scope.status_jantung = Boolean(parseInt($scope.people.status_jantung));
//         $scope.keterangan_jantung = $scope.people.keterangan_jantung;

//         $scope.status_hipertensi = Boolean(parseInt($scope.people.status_hipertensi));
//         $scope.keterangan_hipertensi = $scope.people.keterangan_hipertensi;

//         $scope.status_diabetes = Boolean(parseInt($scope.people.status_diabetes));
//         $scope.keterangan_diabetes = $scope.people.keterangan_diabetes;

//         $scope.status_alergi = Boolean(parseInt($scope.people.status_alergi));
//         $scope.keterangan_alergi = $scope.people.keterangan_alergi;

//         $scope.status_asma = Boolean(parseInt($scope.people.status_asma));
//         $scope.keterangan_asma = $scope.people.keterangan_asma;

//         $scope.status_hepar = Boolean(parseInt($scope.people.status_hepar));
//         $scope.keterangan_hepar = $scope.people.keterangan_hepar;

//         $scope.status_lambung = Boolean(parseInt($scope.people.status_lambung));
//         $scope.keterangan_lambung = $scope.people.keterangan_lambung;

//         $scope.status_lain = Boolean(parseInt($scope.people.status_lain));
//         $scope.keterangan_lain = $scope.people.keterangan_lain;
//     }, function (response) {
//         // on error
//         console.log(response.data, response.status);
//     });


//      //GET KONDISI VITAL
//      $http({
//         method: 'POST',
//         url: '../apidb/rekam_medis/get_rm_tanda_vital.php',
//         data: { newId: $routeParams.id }
//     }).then(function (response) {
//         // on success
//         $scope.people = response.data;
//         $scope.kesadaran        = $scope.people.kesadaran;
//         $scope.kondisi_umum     = $scope.people.kondisi_umum;
//         $scope.tekanan_darah    = $scope.people.tekanan_darah;
//         $scope.denyut_nadi      = $scope.people.denyut_nadi;
//         $scope.pernafasan       = $scope.people.pernafasan;
//         $scope.suhu             = $scope.people.suhu;
//     }, function (response) {

//         // on error
//         console.log(response.data, response.status);

//     });


//     //GET DATA EKSTRA ORAL
//     $http({
//         method: 'POST',
//         url: '../apidb/rekam_medis/get_rm_ekstra_oral.php',
//         data: { newId: $routeParams.id }
//     }).then(function (response) {
//         // on success
//         $scope.people                       = response.data;
//         $scope.tonus_bibir                  = $scope.people.tonus_bibir;
//         $scope.tmj                          = $scope.people.tmj;
//         $scope.kelenjar_limfe               = $scope.people.kelenjar_limfe;
//         $scope.kelainan_tmj                 = $scope.people.kelainan_tmj;
//         $scope.keterangan_ekstra_oral       = $scope.people.keterangan_ekstra_oral;
//     }, function (response) {

//         // on error
//         console.log(response.data, response.status);

//     });

//     //GET JARINGAN LUNAK MULUT
//     $http({
//         method: 'POST',
//         url: '../apidb/rekam_medis/get_rm_jaringan_lunak_mulut.php',
//         data: { newId: $routeParams.id }
//     }).then(function (response) {
//         // on success
//         $scope.people                               = response.data;
//         $scope.kebersihan_mulut                     = $scope.people.kebersihan_mulut;
//         $scope.mukosa_bukal                         = $scope.people.mukosa_bukal;
//         $scope.kelainan_mukosa_bukal                = $scope.people.kelainan_mukosa_bukal;
//         $scope.mukosa_labial                        = $scope.people.mukosa_labial;
//         $scope.kelainan_mukosa_labial               = $scope.people.kelainan_mukosa_labial;
//         $scope.frenulum_labial                      = $scope.people.frenulum_labial;
//         $scope.kelainan_frenulum_labial             = $scope.people.kelainan_frenulum_labial;
//         $scope.lidah                                = $scope.people.lidah;
//         $scope.kelainan_lidah                       = $scope.people.kelainan_lidah;
//         $scope.palatum                              = $scope.people.palatum;
//         $scope.kelainan_palatum                     = $scope.people.kelainan_palatum;
//         $scope.tonsil                               = $scope.people.tonsil;
//         $scope.kelainan_tonsil                      = $scope.people.kelainan_tonsil;
//         $scope.dasar_mulut                          = $scope.people.dasar_mulut;
//         $scope.kelainan_dasar_mulut                 = $scope.people.kelainan_dasar_mulut;
//         $scope.gingiva                              = $scope.people.gingiva;
//         $scope.kelainan_gingiva                     = $scope.people.kelainan_gingiva;
//         $scope.keterangan_jaringan_lunak_mulut      = $scope.people.keterangan_jaringan_lunak_mulut;
//     }, function (response) {

//         // on error
//         console.log(response.data, response.status);

//     });






    
// });

    app.controller("SearchCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window){
        $scope.tab = 1;
        $scope.setTab = function(newTab){
          $scope.tab = newTab;
        };
        $scope.totalSearch = 0;
        $scope.valPasien   = 0;
        $scope.valLayanan  = 0;
        $scope.valPerawatan = 0;

        $scope.myDataPasien = [];
        $scope.myDataLayanan = [];
        $scope.myDiagnosa = [];

        $scope.keyword="";

        $scope.$watch("keyword", function(newValue, oldValue) {

            if ($scope.keyword.length > 0) {
              $scope.totalSearch = 0;
              $scope.valPasien = 0;
              $scope.valLayanan = 0;
              $scope.valPerawatan = 0;

              $scope.myDataPasien = [];
              $scope.myDataLayanan = [];
              $scope.myDiagnosa = [];

              $http
                .get(
                  "../apidb/search/search-pasien.php?keyword=" +
                    $scope.keyword
                )
                .then(function(response) {
                  $scope.myDataPasien = response.data.event;
                  if (
                    response.status == 200 &&
                    $scope.myDataPasien
                  ) {
                    $scope.valPasien = $scope.myDataPasien.length;
                  }

                  $http
                    .get(
                      "../apidb/search/search-layanan.php?keyword=" +
                        $scope.keyword
                    )
                    .then(function(response) {
                      $scope.myDataLayanan = response.data.event;
                      if (
                        response.status == 200 &&
                        $scope.myDataLayanan
                      ) {
                        $scope.valLayanan =
                          $scope.myDataLayanan.length;
                      }

                      $http
                        .get(
                          "../apidb/search/search-perawatan.php?keyword=" +
                            $scope.keyword
                        )
                        .then(function(response) {
                          $scope.myDiagnosa = response.data.event;
                          if (
                            response.status == 200 &&
                            $scope.myDiagnosa
                          ) {
                            $scope.valPerawatan =
                              $scope.myDiagnosa.length;
                          }
                          $scope.totalSearch =
                            parseInt($scope.valPasien) +
                            parseInt($scope.valLayanan) +
                            parseInt($scope.valPerawatan);
                        });
                    });
                });
            }


            if ($scope.keyword.length == 0) {
              $scope.totalSearch = 0;
              $scope.valPasien = 0;
              $scope.valLayanan = 0;
              $scope.valPerawatan = 0;
              $scope.myDataPasien = [];
              $scope.myDataLayanan = [];
              $scope.myDiagnosa = [];
            }
         
           
          });



        $scope.cariKeyword = function(){

            $scope.totalSearch = 0;
            $scope.valPasien   = 0;
            $scope.valLayanan  = 0;
            $scope.valPerawatan = 0;
    
            $scope.myDataPasien = [];
            $scope.myDataLayanan = [];
            $scope.myDiagnosa = [];
            
            // $http.get("../apidb/search/search-pasien.php?keyword="+$scope.keyword).then(function (response){
            //     $scope.myDataPasien = response.data.event;
            //     $scope.valPasien = $scope.myDataPasien.length;

            //     console.log($scope.valPasien);
            // });  
            // $http.get("../apidb/search/search-layanan.php?keyword="+$scope.keyword).then(function (response) {
            //     $scope.myDataLayanan = response.data.event;
            //     $scope.valLayanan = $scope.myDataLayanan.length;
            // });  
            // $http.get("../apidb/search/search-perawatan.php?keyword="+$scope.keyword).then(function (response){
            //     $scope.myDiagnosa = response.data.event;
            //     $scope.valPerawatan = $scope.myDiagnosa.length;
            // });  

            $http.get("../apidb/search/search-pasien.php?keyword="+$scope.keyword).then(function (response){
                $scope.myDataPasien = response.data.event;
                if(response.status == 200 && $scope.myDataPasien ){
                    $scope.valPasien = $scope.myDataPasien.length;
                }
               

                $http.get("../apidb/search/search-layanan.php?keyword="+$scope.keyword).then(function (response) {
                        $scope.myDataLayanan = response.data.event;
                        if(response.status == 200 && $scope.myDataLayanan){
                            $scope.valLayanan = $scope.myDataLayanan.length;
                        }

                        $http.get("../apidb/search/search-perawatan.php?keyword="+$scope.keyword).then(function (response){
                                $scope.myDiagnosa = response.data.event;
                                if(response.status == 200 && $scope.myDiagnosa ){
                                    $scope.valPerawatan = $scope.myDiagnosa.length;
                                }
                                $scope.totalSearch = (parseInt($scope.valPasien) + parseInt($scope.valLayanan) + parseInt($scope.valPerawatan));
                            }); 
                    });
            });  

            
         


         //   console.log(" Total Search  =  "+ "+"+ $scope.myDataPasien.length + "+"+ $scope.myDataLayanan.length + "+"+    $scope.myDiagnosa.length);
        };

       
       
    });



    app.controller("EditPerawatanCtrl", function ($scope, $ngConfirm, $cookies, $interval, $http, $route, $timeout, $routeParams, $window) {


        console.log("ID PASIEN" + $routeParams.id);
        console.log("ID KUNJUNGAN" + $routeParams.idkunjungan);
        console.log("ID ANTRIAN" + $routeParams.idantrian);
    
        $scope.idKunjungan = $routeParams.idkunjungan;
        $scope.idPasien = $routeParams.id;
    
        $scope.getTotal = 0;
        $scope.getTotalLayanan = 0;
    
        $scope.id_klinik = 0;
    
        $scope.urlPrint = "../print/print-invoice.php?pasien=" + $scope.idPasien + "&kunjungan=" + $scope.idKunjungan;
    
        //GET DATA PASIEN
    
        $http({
            method: 'POST',
            url: '../apidb/pasien/get.php',
            data: { newId: $routeParams.id }
        }).then(function (response) {
    
            // on success
            $scope.people = response.data;
            $scope.id = $scope.people.id;
            $scope.nameUser = $scope.people.name;
            $scope.phone = $scope.people.phone;
            $scope.kelamin = $scope.people.jenis_kelamin;
            $scope.alamat = $scope.people.alamat;
    
    
        }, function (response) {
    
            // on error
            console.log(response.data, response.status);
    
        });
    
        //GET DATA KLINIK DAN DOKTER
        console.log("ID KUNJUNGAN GET" + $scope.idKunjungan);
    
        $http({
            method: 'POST',
            url: '../apidb/kunjungan/get.php',
            data: { newId: $scope.idKunjungan }
        }).then(function (response) {
    
            // on success
            $scope.datakunjungan = response.data;
            $scope.namadokter = $scope.datakunjungan.dokter;
            $scope.iddokter = $scope.datakunjungan.id_dokter;
            $scope.id_klinik = $scope.datakunjungan.id_klinik;
            $scope.dokter_pendamping = $scope.datakunjungan.dokter_pendamping;
            $scope.biaya_rekam_medis = $scope.datakunjungan.biaya_rekam_medis;
            if ($scope.biaya_rekam_medis == '1') {
                $scope.rekam_medis_pay = 4000;
            } else {
                $scope.rekam_medis_pay = 0;
            }
    
    
    
            $http.get("../apidb/layanan/list_data.php?id=" + $scope.id_klinik).then(function (response) {
                $scope.layananKlinik = response.data.event;
                console.log(response.data.event);
            });
    
    
    
        }, function (response) {
    
            // on error
            console.log(response.data, response.status);
    
        });
    
    
        $http.get("../apidb/obat/list_data.php").then(function (response) {
            $scope.dataObat = response.data.event;
            console.log(response.data.event);
        });
    
        
        $scope.FormObat = function (x) {
            $scope.shTable = false;
            $scope.shForm = true;
            $scope.id = x;
            $http({
                method: 'POST',
                url: '../apidb/obat/get.php',
                data: { newId: x }
            }).then(function (response) {
                console.log(response);
                // on success
                $scope.people = response.data;
                $scope.id_obat = $scope.people.id;
                $scope.nama_obat = $scope.people.name;
                $scope.quantity_obat = 1;
                $scope.satuan_obat = $scope.people.satuan;
                $scope.harga_obat = $scope.people.harga;
    
            }, function (response) {
    
                // on error
                console.log(response.data, response.status);
    
            });
            $scope.shFormObat = true;
        };
    
        $scope.FormLayanan = function (x) {
            $scope.shFormLayanan = true;
            $scope.id = x;
            $http({
                method: 'POST',
                url: '../apidb/layanan/get.php',
                data: { newId: x }
            }).then(function (response) {
                console.log(response);
                // on success
                $scope.peopleLayanan = response.data;
                $scope.idLayanan = $scope.peopleLayanan.id;
                $scope.nameLayanan = $scope.peopleLayanan.layanan;
                $scope.bahanLayanan = $scope.peopleLayanan.bahan;
                $scope.harga_bahan = $scope.peopleLayanan.harga_bahan;
                $scope.harga_koas = $scope.peopleLayanan.harga_koas;
                $scope.harga_ppdgs = $scope.peopleLayanan.harga_ppdgs;
                $scope.harga_drg = $scope.peopleLayanan.harga_drg;
                $scope.harga_drgsp = $scope.peopleLayanan.harga_drgsp;
    
            }, function (response) {
    
                // on error
                console.log(response.data, response.status);
    
            });
        };

        ///------------------------------------------------------ Perawatan
        $http({
            method: 'POST',
            url: '../apidb/rekam_medis/get_perawatan.php',
            data: { newId: $routeParams.idantrian }
        }).then(function (response) {
    
            // on success
            $scope.dataperawatan = response.data;
            $scope.diagnosa = $scope.dataperawatan.diagnosa;
            $scope.element_gigi_mulut = $scope.dataperawatan.element;
            $scope.icd10 = $scope.dataperawatan.icd10;
    
            console.log($scope.dataperawatan);
            console.log($scope.idAntrian);
    
    
        }, function (response) {
    
            // on error
            console.log(response.data);
    
        });
    
        $http({
            method: 'POST',
            url: '../apidb/rekam_medis/get_rekam_medis.php',
            data: { newId: $routeParams.idkunjungan }
        }).then(function (response) {
    
    
            // on success
            $scope.datrm = response.data;
            $scope.amnese = $scope.datrm.amnese;
    
            console.log($scope.anamnese);
    
            //console.log($scope.datakunjungan.id_antrian);
        }, function (response) {
    
            // on error
            console.log(response.data);
    
        });

        $scope.submitEditPerawatan = function(){
         
            $http({
                method: 'POST',
                url: '../apidb/rekam_medis/update_perawatan_form.php',
                data: { id_antrian: $routeParams.idantrian, id_kunjungan: $routeParams.idkunjungan, element:$scope.element_gigi_mulut ,diagnosa: $scope.diagnosa, icd10: $scope.icd10, amnese : $scope.amnese }
            }).then(function (response) {
        
        
                // on success
             $route.reload();
        
        
            }, function (response) {
        
                // on error
                console.log(response.data);
        
            });
        }
        ///------------------------------------------------------ Perawatan














    
        $scope.updateJasa = function () {
    
            if ($scope.pelaksana == '0') {
                $scope.jasa = $scope.harga_koas;
    
            }
    
            if ($scope.pelaksana == '1') {
                $scope.jasa = $scope.harga_ppdgs;
    
            }
    
    
            if ($scope.pelaksana == '2') {
                $scope.jasa = $scope.harga_drg;
    
            }
    
            if ($scope.pelaksana == '3') {
                $scope.jasa = $scope.harga_drgsp;
    
            }
    
    
        };
    
        //Submit Data Layanan Tambahan Ke Database
        $scope.submitFormLayanan = function () {
            $http.get("../apidb/layanan/submit_layanan_rm.php?id_pasien=" + $routeParams.id + "&id_kunjungan=" + $routeParams.idkunjungan + "&nama_pasien=" + $scope.nameUser + "&nama_layanan=" + $scope.nameLayanan + "&harga_bahan=" + $scope.harga_bahan + "&harga_layanan=" + $scope.jasa).then(function (response) {
                if (!response.data.event) {
                    $ngConfirm('Layanan Telah Ditambahkan');
                    $route.reload();
                } else {
                    $ngConfirm('There Is Some Problem');
                    $route.reload();
                }
            });
            $scope.shFormLayanan = false;
            $scope.tabelTindakanMedis = false;
        };
    
    
        //Submit Data Layanan Tambahan Ke Database
        $scope.submitFormObat = function () {
            $http.get("../apidb/layanan/submit_obat_rm.php?id_pasien=" + $routeParams.id + "&id_kunjungan=" + $routeParams.idkunjungan + "&nama_pasien=" + $scope.nameUser + "&id_obat=" + $scope.id_obat + "&nama_obat=" + $scope.nama_obat + "&harga_obat=" + $scope.harga_obat + "&quantity_obat=" + $scope.quantity_obat + "&satuan_obat=" + $scope.satuan_obat).then(function (response) {
                if (!response.data.event) {
                    $ngConfirm('Obat Telah Ditambahkan');
                    $route.reload();
                } else {
                    $ngConfirm('There Is Some Problem');
                    $route.reload();
                }
            });
            $scope.shFormObat = false;
            $scope.tabelObat = false;
        };
    
        $http.get("../apidb/apotek/invoice_list_data_obat.php?id=" + $scope.idKunjungan).then(function (response) {
            if (!response.data.event) {
                console.log("Data Obat Kosong");
            } else {
                $scope.myData = response.data.event;
                console.log(response.data.event);
                console.log("PANJANG " + $scope.myData.length);
    
                for (var i = 0; i < $scope.myData.length; i++) {
                    console.log(($scope.myData[i].harga * $scope.myData[i].quantity));
                    // var harga = $scope.myData[i].harga;
                    // var quantity = $scope.myData[i].quantity;
                    $scope.getTotal += ($scope.myData[i].harga * $scope.myData[i].quantity);
                }
            }
        });
    
    
        $http.get("../apidb/klinik/list_data_layanan_no.php?id=" + $scope.idKunjungan).then(function (response) {
            if (!response.data.event) {
                console.log("Data Layanan Kosong");
            } else {
                $scope.myDataLayanan = response.data.event;
                console.log(response.data.event);
                for (var i = 0; i < $scope.myDataLayanan.length; i++) {
                    $scope.getTotalLayanan += (($scope.myDataLayanan[i].harga_bahan * 1) + ($scope.myDataLayanan[i].harga_layanan * 1));
                }
            }
        });
    
    
        $scope.submitInvoice = function () {
            $http({
                method: 'POST',
                url: '../apidb/kasir/complete_order.php',
                data: { idKunjungan: $routeParams.idkunjungan }
            }).then(function (response) {
                // on success
                if (response.status == 200) {
                    // console.log(response.data);
                    alert("Invoice Telah Dibayar");
                    $location.path("/home");
                }
            });
        };
    
    
        $scope.back = function () {
            $location.path("/home");
        };
    
        $scope.editLayanan = function (w) {
            $scope.layananUbah = w;
            $scope.id_edit = w.id;
            $scope.harga_bahan_edit = w.harga_bahan;
            $scope.harga_layanan_edit = w.harga_layanan;
            console.log("========LAYANAN========");
            $ngConfirm({
                title: 'Ubah Layanan',
                contentUrl: '../form/edit_layanan_icd.html',
                scope: $scope,
                buttons: {
                    sayBoo: {
                        text: 'Submit',
                        btnClass: 'btn-green',
                        action: function (scope, button) {
                            console.log("========LAYANAN UBAH========")
                            $http.get("../apidb/layanan/edit_layanan_rm_icd.php?id=" + w.id + "&bahan=" + $scope.harga_bahan_edit + "&layanan=" + $scope.harga_layanan_edit + "&icd=" + $scope.icd).then(function (response) {
                                if (!response.data.event) {
                                    $ngConfirm('Layanan Telah Diubah');
                                    $route.reload();
                                } else {
                                    $ngConfirm('There Is Some Problem');
                                    $route.reload();
                                }
                            });
                        }
                    },
                    close: {
                        text: 'close',
                        btnClass: 'btn-red',
                        action: function (scope, button) {
                            return true;
                        }
                    }
                }
            });
        };
    
    
        $scope.hapusLayanan = function (w) {
            $http.get("../apidb/layanan/hapus_layanan_rm.php?id=" + w.id).then(function (response) {
                if (!response.data.event) {
                    $ngConfirm('Data Sudah Dihapus');
                    $route.reload();
                } else {
                    $ngConfirm('There Is Some Problem');
                    $route.reload();
                }
            });
        }
    
        $scope.editObat = function (y) {
            $scope.layananUbah = y;
            $scope.id_edit = y.id;
            $scope.nama_obat_edit = y.nama_obat;
            $scope.quantity_obat_edit = y.quantity;
            $scope.harga_obat_edit = y.harga;
            console.log("========OBAT========");
            $ngConfirm({
                title: 'Ubah Obat',
                contentUrl: '../form/edit_obat.html',
                scope: $scope,
                buttons: {
                    sayBoo: {
                        text: 'Submit',
                        btnClass: 'btn-green',
                        action: function (scope, button) {
                            // console.log("========LAYANAN UBAH========")
                           // console.log("../apidb/layanan/edit_obat_rm.php?id=" + $scope.id_edit+ "&nama=" + $scope.nama_obat_edit + "&quantity=" + $scope.quantity_obat_edit+ "&harga=" + $scope.harga_obat_edit);
                            $http.get("../apidb/layanan/edit_obat_rm.php?id=" + $scope.id_edit+ "&nama=" + $scope.nama_obat_edit + "&quantity=" + $scope.quantity_obat_edit+ "&harga=" + $scope.harga_obat_edit).then(function (response) {
                                if (!response.data.event) {
                                    $ngConfirm('Obat Telah Diubah');
                                    $route.reload();
                                } else {
                                    $ngConfirm('There Is Some Problem');
                                    $route.reload();
                                }
                            });
                        }
                    },
                    close: {
                        text: 'close',
                        btnClass: 'btn-red',
                        action: function (scope, button) {
                            return true;
                        }
                    }
                }
            });
        };
    
    
        $scope.hapusObat = function (y) {
            $http.get("../apidb/layanan/hapus_obat_rm.php?id=" + y.id).then(function (response) {
                if (!response.data.event) {
                    $ngConfirm('Data Sudah Dihapus');
                    $route.reload();
                } else {
                    $ngConfirm('There Is Some Problem');
                    $route.reload();
                }
            });
        }
    
        $scope.ShowFormTambahLayanan = function () {
            $scope.tabelTindakanMedis = true;
        };
    
        $scope.ShowFormTambahObat = function () {
            $scope.tabelObat = true;
        };
    
        $scope.closeFormObat = function (){
            $scope.tabelObat = false;
            $scope.FormObat = false;
        }
    
        $scope.closeFormLayanan = function (){
            $scope.tabelTindakanMedis = false;
            $scope.shFormLayanan = false;
        }









    
        setTimeout(function () {
            $('#mytableLayanan').dataTable({
                "bPaginate": true,
                "bLengthChange": true,
                "aLengthMenu": [30, 50, 100],
                "bFilter": true,
                "bSort": true,
                "bInfo": true,
                "bRetrieve": true,
                "bAutoWidth": false,
                "sEmptyTable": "",
            });
        }, 4000);
    
        setTimeout(function () {
            $('#mytableObat').dataTable({
                "bPaginate": true,
                "bLengthChange": true,
                "aLengthMenu": [30, 50, 100],
                "bFilter": true,
                "bSort": true,
                "bInfo": true,
                "bRetrieve": true,
                "bAutoWidth": false,
                "sEmptyTable": "",
            });
        }, 4000);
    });