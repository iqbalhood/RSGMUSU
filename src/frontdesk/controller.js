
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
                 data: {newId: $scope.no_rekam_medis,noRekamMedis: $scope.no_rekam_medis, noRegistrasi: $scope.noreg, tglRegistrasi: $scope.tglreg , newName: $scope.name, tempatLahir: $scope.tptlahir, tanggalLahir: $scope.tgllahir , newKelamin: $scope.kelamin, agama: $scope.agama , alamat: $scope.alamat, rtrw: $scope.rtrw , kelurahan: $scope.kelurahan, kecamatan: $scope.kecamatan, kabupaten: $scope.kabupaten, propinsi: $scope.propinsi, newPhone: $scope.phone, kewarganegaraan: $scope.kewarganegaraan, noKtp: $scope.noktp, pendidikan: $scope.pendidikan , pekerjaan: $scope.pekerjaan, statusPerkawinan: $scope.status_perkawinan , tglPertamamasuk: $scope.tgl_pertama_masuk , caraBayar: $scope.cara_bayar , tujuanKunjunganpertama: $scope.tujuan_kunjungan_pertama, alergi: $scope.alergi , catatan: $scope.catatan}
                 
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
      
   $http.get("../apidb/kunjungan/list_data.php?id="+$routeParams.id+"&status=1").then(function (response) {
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

        //fungsi untuk query dokter di klinik 
        $scope.selectDokter = function(){
            console.log("Klinik Telah Dipilih");
            console.log("klinik"+$scope.klinik);
            $scope.dataDokter ="";

            $http.get("../apidb/dokter/list_dokter_get.php?id="+$scope.klinik).then(function (response) {
                $scope.dataDokter = response.data.event;
                console.log(response.data.event);
            });
        };

       


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


 app.controller("RekamMedisCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {
    
        $scope.idPasien = $routeParams.id;
        $scope.daftarKondisiGigi    = [];
    
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

        console.log("Riwyat Penyakit Show");

        /// Riwayat Penyakit
        $http({
            method: 'POST',    
            url: '../apidb/klinik/get_riwayat_penyakit.php',
            data: {newId: $routeParams.idkunjungan}
        }).then(function (response) {
            
            // on success

    console.log(response.data);

            $scope.xx           =  response.data;
            if($scope.xx.status_jantung == '1'){
                $scope.status_jantung = true;
            } 
            if($scope.xx.status_hipertensi == '1'){
                $scope.status_hipertensi = true;
            }

            if($scope.xx.status_diabetes == '1'){
                $scope.status_diabetes = true;
            }

            if($scope.xx.status_alergi == '1'){
                $scope.status_alergi = true;
            }

            if($scope.xx.status_asma == '1'){
                $scope.status_asma = true;
            }

            if($scope.xx.status_hepar == '1'){
                $scope.status_hepar = true;
            }

            if($scope.xx.status_lambung == '1'){
                $scope.status_lambung = true;
            }

            if($scope.xx.status_lain == '1'){
                $scope.status_lain = true;
            }
     
            $scope.keterangan_jantung      =  $scope.xx.keterangan_jantung;
            $scope.keterangan_hipertensi   =  $scope.xx.keterangan_hipertensi;
            $scope.keterangan_diabetes      =  $scope.xx.keterangan_diabetes;
            $scope.keterangan_alergi        =  $scope.xx.keterangan_alergi;
            $scope.keterangan_asma          =  $scope.xx.keterangan_asma;
            $scope.keterangan_hepar         =  $scope.xx.keterangan_hepar;
            $scope.keterangan_lambung       =  $scope.xx.keterangan_lambung;
            $scope.keterangan_lain          =  $scope.xx.keterangan_lain;
           
           
            
        }, function (response) {
            
            // on error
            console.log("Riwyat Penyakit Show");
            console.log(response.data,response.status);
            
        });


           //GET DATA PASIEN
    
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

        console.log("Riwyat Penyakit Show");

        /// Riwayat Penyakit
        $http({
            method: 'POST',    
            url: '../apidb/klinik/get_tanda_vital.php',
            data: {newId: $routeParams.idkunjungan}
        }).then(function (response) {
            
            // on success

                console.log(response.data);

            $scope.ff                   =  response.data;
          
            $scope.kesadaran            =  $scope.ff.kesadaran;
            $scope.kondisi_umum         =  $scope.ff.kondisi_umum;
            $scope.tekanan_darah        =  $scope.ff.tekanan_darah;
            $scope.denyut_nadi          =  $scope.ff.denyut_nadi;
            $scope.pernafasan           =  $scope.ff.pernafasan;
            $scope.suhu                 =  $scope.ff.suhu;
           
           
            
        }, function (response) {
            
            // on error
            console.log("Riwyat Penyakit Show");
            console.log(response.data,response.status);
            
        });


    
    
        //ODONTOGRAMA
    
        $http({
            method: 'POST',    
            url: '../apidb/klinik/get_odontograma.php',
            data: {newId: $routeParams.idkunjungan}
        }).then(function (response) {
            
            // on success
    
            $scope.og           =  response.data;
            $scope.odontoData   =  $scope.og.keterangan;
    
            var JSONDATA = JSON.parse($scope.odontoData);
    
    
            for(var i = 0; i<JSONDATA.length; i++){
    
    
    
                console.log(JSONDATA[i].teeth);
    
                var obj = { teeth: JSONDATA[i].teeth, explaination: JSONDATA[i].explaination , keterangan : JSONDATA[i].keterangan, url : JSONDATA[i].url };
                $scope.daftarKondisiGigi.push(obj);
    
                                 $scope.teethValue = JSONDATA[i].teeth;
    
                                if($scope.teethValue == 18){
                    
                                    $scope.imageUrl18 = JSONDATA[i].url;
                    
                                }
                    
                                if($scope.teethValue == 17){
                    
                                    $scope.imageUrl17 = JSONDATA[i].url;
                                }
                    
                                if($scope.teethValue == 16){
                    
                                    $scope.imageUrl16 = JSONDATA[i].url;
                    
                                }
                    
                                if($scope.teethValue == 15){
                    
                                    $scope.imageUrl15 = JSONDATA[i].url;
                                }
                    
                                if($scope.teethValue == 14){
                    
                                    $scope.imageUrl14 = JSONDATA[i].url; 
                    
                                }
                    
                                if($scope.teethValue == 13){
                    
                                    $scope.imageUrl13 = JSONDATA[i].url;
                    
                                }
                    
                                if($scope.teethValue == 12){
                    
                                    $scope.imageUrl12 = JSONDATA[i].url; 
                    
                                }
                    
                                if($scope.teethValue == 11){
                    
                                    $scope.imageUrl11 = JSONDATA[i].url; 
                    
                                }
                    
                                if($scope.teethValue == 21){
                    
                                    $scope.imageUrl21 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 22){
                        
                                    $scope.imageUrl22 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 23){
                        
                                    $scope.imageUrl23 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 24){
                        
                                    $scope.imageUrl24 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 25){
                        
                                    $scope.imageUrl25 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 26){
                        
                                    $scope.imageUrl26 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 27){
                        
                                    $scope.imageUrl27 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 28){
                        
                                    $scope.imageUrl28 = JSONDATA[i].url;
                        
                                }
                    
                                if($scope.teethValue == 55){
                    
                                    $scope.imageUrl55 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 54){
                        
                                    $scope.imageUrl54 = JSONDATA[i].url;
                        
                                }
                        
                        
                                if($scope.teethValue == 53){
                        
                                    $scope.imageUrl53 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 52){
                        
                                    $scope.imageUrl52 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 51){
                        
                                    $scope.imageUrl51 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 61){
                        
                                    $scope.imageUrl61 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 62){
                        
                                    $scope.imageUrl62 = JSONDATA[i].url;
                        
                                }
                        
                        
                                if($scope.teethValue == 63){
                        
                                    $scope.imageUrl63 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 64){
                        
                                    $scope.imageUrl64 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 65){
                        
                                    $scope.imageUrl65 = JSONDATA[i].url;
                        
                                }
                    
                                if($scope.teethValue == 85){
                    
                                    $scope.imageUrl85 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 84){
                        
                                    $scope.imageUrl84 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 83){
                        
                                    $scope.imageUrl83 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 82){
                        
                                    $scope.imageUrl82 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 81){
                        
                                    $scope.imageUrl81 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 71){
                        
                                    $scope.imageUrl71 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 72){
                        
                                    $scope.imageUrl72 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 73){
                        
                                    $scope.imageUrl73 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 74){
                        
                                    $scope.imageUrl74 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 75){
                        
                                    $scope.imageUrl75 = JSONDATA[i].url;
                        
                                }
                    
                                if($scope.teethValue == 48){
                    
                                    $scope.imageUrl48 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 47){
                        
                                    $scope.imageUrl47 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 46){
                        
                                    $scope.imageUrl46 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 45){
                        
                                    $scope.imageUrl45 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 44){
                        
                                    $scope.imageUrl44 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 43){
                        
                                    $scope.imageUrl43 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 42){
                        
                                    $scope.imageUrl42 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 41){
                        
                                    $scope.imageUrl41 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 31){
                        
                                    $scope.imageUrl31 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 32){
                        
                                    $scope.imageUrl32 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 33){
                        
                                    $scope.imageUrl33 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 34){
                        
                                    $scope.imageUrl34 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 35){
                        
                                    $scope.imageUrl35 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 36){
                        
                                    $scope.imageUrl36 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 37){
                        
                                    $scope.imageUrl37 = JSONDATA[i].url;
                        
                                }
                        
                                if($scope.teethValue == 38){
                        
                                    $scope.imageUrl38 = JSONDATA[i].url;
                        
                                }
            }      
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