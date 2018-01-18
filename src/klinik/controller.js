
var app = angular.module('myApp.controller', []);


app.controller("HomeCtrl", function ($scope,$cookies,$interval,$http, $route,$timeout, $routeParams, $window) {
    var klinikCookie = $cookies.get('klinik');
    $scope.tipeKlinik = klinikCookie;

    
    $http.get("../apidb/kunjungan/list_data.php?id="+klinikCookie+"&status=1").then(function (response) {
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




app.controller("RiwayatCtrl", function ($scope,$cookies,$interval,$http, $route,$timeout, $routeParams, $window) {
    var klinikCookie = $cookies.get('klinik');
    $scope.tipeKlinik = klinikCookie;

    
    $http.get("../apidb/kunjungan/list_data.php?id="+klinikCookie+"&status=2").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
       });

    $http.get("../apidb/dokter/list_data.php").then(function (response) {
        $scope.dataDokter = response.data.event;
        console.log(response.data.event);
    });


    $scope.showKlinik = function(x) {
        $scope.dokterpendamping = x.dokter_pendamping;        
        $scope.id_kunjungan = x.id_kunjungan;
        $scope.id_pasien = x.id_pasien;
        $scope.klinikForm = true;
    };

    $scope.cancelFormKlinik= function(){
        $scope.klinikForm = false;
    };

    $scope.submitForm= function(){
        var xx = new Date();
        var yy = xx.getTime();



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

         
        $http.get("../apidb/klinik/list_rekam_medis_pasien.php?idpasien="+$scope.id_pasien).then(function (response) {
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


app.controller("PerawatanCtrl", function ($scope, $cookies, $location, $interval,$http, $route,$timeout, $routeParams, $window) {
    var klinikCookie = $cookies.get('klinik');
        $scope.daftarObat       = [];
        $scope.daftarLayanan    = [];
        $scope.daftarPerawatan  = [];

        $scope.status = "Tidak Ada";
        $scope.warna = "#ffffff";

        $scope.imageUrl18 = "../img/G1G1.png";
        $scope.imageUrl17 = "../img/G1G1.png";
        $scope.imageUrl16 = "../img/G1G1.png";
        $scope.imageUrl15 = "../img/G1G1.png";
        $scope.imageUrl14 = "../img/G1G1.png";
        $scope.imageUrl13 = "../img/G1G1.png";
        $scope.imageUrl12 = "../img/G1G1.png";
        $scope.imageUrl11 = "../img/G1G1.png";

        $scope.teethValue = 0 ;



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



        $http({
            method: 'POST',    
            url: '../apidb/kunjungan/get.php',
            data: {newId: $routeParams.idkunjungan}
        }).then(function (response) {
            
            // on success
            $scope.datakunjungan    = response.data;
            $scope.namadokter       =  $scope.datakunjungan.dokter;
            $scope.iddokter         =  $scope.datakunjungan.id_dokter;
            $scope.idAntrian        =  $scope.datakunjungan.id_antrian;

            console.log("Dokternya " + $scope.dokter);
           
            
        }, function (response) {
            
            // on error
            console.log(response.data,response.status);
            
        });

        

        $http.get("../apidb/layanan/list_data.php?id="+klinikCookie).then(function (response) {
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

        $scope.submitFormPerawatan = function(){

            var obj = { element_gigi_mulut : $scope.elementGigiMulut, diagnosa: $scope.diagnosaGigiMulut , perawatan : $scope.perawatanGigiMulut  };

            $scope.daftarPerawatan.push(obj);



        };



        
        $scope.fungsiGH = function(){
            console.log("Teeeth Value GH "+ $scope.teethValue);

            if($scope.teethValue == 18){

                $scope.imageUrl18 = "../img/small/gigi_hilang.png";   

            }

            if($scope.teethValue == 17){

                $scope.imageUrl17 = "../img/small/gigi_hilang.png";   
            }

            if($scope.teethValue == 16){

                $scope.imageUrl16 = "../img/small/gigi_hilang.png";   

            }

            if($scope.teethValue == 15){

                $scope.imageUrl15 = "../img/small/gigi_hilang.png";   
            }

            if($scope.teethValue == 14){

                $scope.imageUrl14 = "../img/small/gigi_hilang.png";    

            }

            if($scope.teethValue == 13){

                $scope.imageUrl13 = "../img/small/gigi_hilang.png";   

            }

            if($scope.teethValue == 12){

                $scope.imageUrl12 = "../img/small/gigi_hilang.png";    

            }

            if($scope.teethValue == 11){

                $scope.imageUrl11 = "../img/small/gigi_hilang.png";    

            }
            

        };

       
        $scope.fungsiBelumErupsi = function(){

            console.log("Teeeth Value Belum Erupsi "+ $scope.teethValue);

            if($scope.teethValue == 18){

                $scope.imageUrl18 = "../img/small/belum_erupsi.png";   

            }

            if($scope.teethValue == 17){

                $scope.imageUrl17 = "../img/small/belum_erupsi.png";     
            }

            if($scope.teethValue == 16){

                $scope.imageUrl16 = "../img/small/belum_erupsi.png";     

            }

            if($scope.teethValue == 15){

                $scope.imageUrl15 = "../img/small/belum_erupsi.png";     
            }

            if($scope.teethValue == 14){

                $scope.imageUrl14 = "../img/small/belum_erupsi.png";      

            }

            if($scope.teethValue == 13){

                $scope.imageUrl13 = "../img/small/belum_erupsi.png";    

            }

            if($scope.teethValue == 12){

                $scope.imageUrl12 = "../img/small/belum_erupsi.png";      

            }

            if($scope.teethValue == 11){

                $scope.imageUrl11 = "../img/small/belum_erupsi.png";    

            }

        };

        $scope.fungsiErupsiSebagian = function(){

            console.log("Teeeth Value Belum Erupsi "+ $scope.teethValue);

            if($scope.teethValue == 18){

                $scope.imageUrl18 = "../img/small/erupsi_sebagian.png";   

            }

            if($scope.teethValue == 17){

                $scope.imageUrl17 = "../img/small/erupsi_sebagian.png";     
            }

            if($scope.teethValue == 16){

                $scope.imageUrl16 = "../img/small/erupsi_sebagian.png";     

            }

            if($scope.teethValue == 15){

                $scope.imageUrl15 = "../img/small/erupsi_sebagian.png";     
            }

            if($scope.teethValue == 14){

                $scope.imageUrl14 = "../img/small/erupsi_sebagian.png";      

            }

            if($scope.teethValue == 13){

                $scope.imageUrl13 = "../img/small/erupsi_sebagian.png";    

            }

            if($scope.teethValue == 12){

                $scope.imageUrl12 = "../img/small/erupsi_sebagian.png";      

            }

            if($scope.teethValue == 11){

                $scope.imageUrl11 = "../img/small/erupsi_sebagian.png";    

            }


        };  

        $scope.fungsiKaries = function(){

                console.log("Teeeth Value Belum Erupsi "+ $scope.teethValue);

            if($scope.teethValue == 18){

                $scope.imageUrl18 = "../img/small/karies.png";   

            }

            if($scope.teethValue == 17){

                $scope.imageUrl17 = "../img/small/karies.png";     
            }

            if($scope.teethValue == 16){

                $scope.imageUrl16 = "../img/small/karies.png";     

            }

            if($scope.teethValue == 15){

                $scope.imageUrl15 = "../img/small/karies.png";     
            }

            if($scope.teethValue == 14){

                $scope.imageUrl14 = "../img/small/karies.png";      

            }

            if($scope.teethValue == 13){

                $scope.imageUrl13 = "../img/small/karies.png";    

            }

            if($scope.teethValue == 12){

                $scope.imageUrl12 = "../img/small/karies.png";      

            }

            if($scope.teethValue == 11){

                $scope.imageUrl11 = "../img/small/karies.png";    

            }

        };

        $scope.fungsiAnomaliBentuk = function(){

            console.log("Teeeth Value Belum Erupsi "+ $scope.teethValue);

        if($scope.teethValue == 18){

            $scope.imageUrl18 = "../img/small/anomali_bentuk.png";   

        }

        if($scope.teethValue == 17){

            $scope.imageUrl17 = "../img/small/anomali_bentuk.png";     
        }

        if($scope.teethValue == 16){

            $scope.imageUrl16 = "../img/small/anomali_bentuk.png";     

        }

        if($scope.teethValue == 15){

            $scope.imageUrl15 = "../img/small/anomali_bentuk.png";     
        }

        if($scope.teethValue == 14){

            $scope.imageUrl14 = "../img/small/anomali_bentuk.png";      

        }

        if($scope.teethValue == 13){

            $scope.imageUrl13 = "../img/small/anomali_bentuk.png";    

        }

        if($scope.teethValue == 12){

            $scope.imageUrl12 = "../img/small/anomali_bentuk.png";      

        }

        if($scope.teethValue == 11){

            $scope.imageUrl11 = "../img/small/anomali_bentuk.png";    

        }

    };

    $scope.fungsiTambalanLogam = function(){

        console.log("Teeeth Value Belum Erupsi "+ $scope.teethValue);

        if($scope.teethValue == 18){

            $scope.imageUrl18 = "../img/small/tambalan_logam.png";   

        }

        if($scope.teethValue == 17){

            $scope.imageUrl17 = "../img/small/tambalan_logam.png";     
        }

        if($scope.teethValue == 16){

            $scope.imageUrl16 = "../img/small/tambalan_logam.png";     

        }

        if($scope.teethValue == 15){

            $scope.imageUrl15 = "../img/small/tambalan_logam.png";     
        }

        if($scope.teethValue == 14){

            $scope.imageUrl14 = "../img/small/tambalan_logam.png";      

        }

        if($scope.teethValue == 13){

            $scope.imageUrl13 = "../img/small/tambalan_logam.png";    

        }

        if($scope.teethValue == 12){

            $scope.imageUrl12 = "../img/small/tambalan_logam.png";      

        }

        if($scope.teethValue == 11){

            $scope.imageUrl11 = "../img/small/tambalan_logam.png";    

        }

    };


        $scope.fungsiNonVital = function(){

            console.log("Teeeth Value Belum Erupsi "+ $scope.teethValue);

            if($scope.teethValue == 18){

                $scope.imageUrl18 = "../img/small/non_vital.png";   

            }

            if($scope.teethValue == 17){

                $scope.imageUrl17 = "../img/small/non_vital.png";     
            }

            if($scope.teethValue == 16){

                $scope.imageUrl16 = "../img/small/non_vital.png";     

            }

            if($scope.teethValue == 15){

                $scope.imageUrl15 = "../img/small/non_vital.png";     
            }

            if($scope.teethValue == 14){

                $scope.imageUrl14 = "../img/small/non_vital.png";      

            }

            if($scope.teethValue == 13){

                $scope.imageUrl13 = "../img/small/non_vital.png";    

            }

            if($scope.teethValue == 12){

                $scope.imageUrl12 = "../img/small/non_vital.png";      

            }

            if($scope.teethValue == 11){

                $scope.imageUrl11 = "../img/small/non_vital.png";    

            }

        };

        

        $scope.fungsiTambalanNonLogam = function(){

            console.log("Teeeth Value Belum Erupsi "+ $scope.teethValue);

            if($scope.teethValue == 18){

                $scope.imageUrl18 = "../img/small/tambalan_non_logam.png";   

            }

            if($scope.teethValue == 17){

                $scope.imageUrl17 = "../img/small/tambalan_non_logam.png";     
            }

            if($scope.teethValue == 16){

                $scope.imageUrl16 = "../img/small/tambalan_non_logam.png";     

            }

            if($scope.teethValue == 15){

                $scope.imageUrl15 = "../img/small/tambalan_non_logam.png";     
            }

            if($scope.teethValue == 14){

                $scope.imageUrl14 = "../img/small/tambalan_non_logam.png";      

            }

            if($scope.teethValue == 13){

                $scope.imageUrl13 = "../img/small/tambalan_non_logam.png";    

            }

            if($scope.teethValue == 12){

                $scope.imageUrl12 = "../img/small/tambalan_non_logam.png";      

            }

            if($scope.teethValue == 11){

                $scope.imageUrl11 = "../img/small/tambalan_non_logam.png";    

            }

        };

        $scope.fungsiSisaAkar = function(){

            console.log("Teeeth Value Belum Erupsi "+ $scope.teethValue);

            if($scope.teethValue == 18){

                $scope.imageUrl18 = "../img/small/sisa_akar.png";   

            }

            if($scope.teethValue == 17){

                $scope.imageUrl17 = "../img/small/sisa_akar.png";     
            }

            if($scope.teethValue == 16){

                $scope.imageUrl16 = "../img/small/sisa_akar.png";     

            }

            if($scope.teethValue == 15){

                $scope.imageUrl15 = "../img/small/sisa_akar.png";     
            }

            if($scope.teethValue == 14){

                $scope.imageUrl14 = "../img/small/sisa_akar.png";      

            }

            if($scope.teethValue == 13){

                $scope.imageUrl13 = "../img/small/sisa_akar.png";    

            }

            if($scope.teethValue == 12){

                $scope.imageUrl12 = "../img/small/sisa_akar.png";      

            }

            if($scope.teethValue == 11){

                $scope.imageUrl11 = "../img/small/sisa_akar.png";    

            }

        };

        $scope.fungsiML = function(){

            console.log("Teeeth Value Belum Erupsi "+ $scope.teethValue);

            if($scope.teethValue == 18){

                $scope.imageUrl18 = "../img/small/gigi_mahkota_logam.png";   

            }

            if($scope.teethValue == 17){

                $scope.imageUrl17 = "../img/small/gigi_mahkota_logam.png";     
            }

            if($scope.teethValue == 16){

                $scope.imageUrl16 = "../img/small/gigi_mahkota_logam.png";     

            }

            if($scope.teethValue == 15){

                $scope.imageUrl15 = "../img/small/gigi_mahkota_logam.png";     
            }

            if($scope.teethValue == 14){

                $scope.imageUrl14 = "../img/small/gigi_mahkota_logam.png";      

            }

            if($scope.teethValue == 13){

                $scope.imageUrl13 = "../img/small/gigi_mahkota_logam.png";    

            }

            if($scope.teethValue == 12){

                $scope.imageUrl12 = "../img/small/gigi_mahkota_logam.png";      

            }

            if($scope.teethValue == 11){

                $scope.imageUrl11 = "../img/small/gigi_mahkota_logam.png";    

            }

        };

        $scope.fungsiMahkotaNonLogam = function(){

            console.log("Teeeth Value Belum MahkotaNonLogam "+ $scope.teethValue);

            if($scope.teethValue == 18){

                $scope.imageUrl18 = "../img/small/mahkota_non_logam.png";   

            }

            if($scope.teethValue == 17){

                $scope.imageUrl17 = "../img/small/mahkota_non_logam.png";     
            }

            if($scope.teethValue == 16){

                $scope.imageUrl16 = "../img/small/mahkota_non_logam.png";     

            }

            if($scope.teethValue == 15){

                $scope.imageUrl15 = "../img/small/mahkota_non_logam.png";     
            }

            if($scope.teethValue == 14){

                $scope.imageUrl14 = "../img/small/mahkota_non_logam.png";      

            }

            if($scope.teethValue == 13){

                $scope.imageUrl13 = "../img/small/mahkota_non_logam.png";    

            }

            if($scope.teethValue == 12){

                $scope.imageUrl12 = "../img/small/mahkota_non_logam.png";      

            }

            if($scope.teethValue == 11){

                $scope.imageUrl11 = "../img/small/mahkota_non_logam.png";    

            }

        };
        




        $scope.n18 = function(){
            $scope.imageUrl18 = "../img/G1G1.png";  
            $scope.teethValue = 18;  
            console.log("Teeeth Value "+ $scope.teethValue);
        }

        $scope.n17 = function(){
            $scope.imageUrl17 = "../img/G1G1.png";
            $scope.teethValue = 17;  
            console.log("Teeeth Value "+ $scope.teethValue);
        }

        $scope.n16= function(){
            $scope.imageUrl16 = "../img/G1G1.png";
            $scope.teethValue = 16;  
        }

        $scope.n15= function(){
            $scope.imageUrl15 = "../img/G1G1.png";
            $scope.teethValue = 15;  
        }

        $scope.n14= function(){
            $scope.imageUrl14 = "../img/G1G1.png";
            $scope.teethValue = 14;  
        }

        $scope.n13= function(){
            $scope.imageUrl13 = "../img/G1G1.png";
            $scope.teethValue = 13;  
        }

        $scope.n12= function(){
            $scope.imageUrl12 = "../img/G1G1.png";
            $scope.teethValue = 12;  
        }

        $scope.n11= function(){
            $scope.imageUrl11 = "../img/G1G1.png";
            $scope.teethValue = 11;  
        }



       
        
        $scope.simpanData = function(){

            // $http({
            //     method: 'POST',
            //     url:  '../apidb/klinik/put_rm_riwayat_penyakit.php',
            //     data: {idKunjungan: $routeParams.idkunjungan,idAntrian: $scope.idAntrian, idPasien: $routeParams.id,
            //            penyakitJantung : $scope.penyakit_jantung, keteranganJantung : $scope.keterangan_jantung, statusJantung: $scope.status_jantung }
            // }).then(function (response) {
            //     // on success
            //     if(response.status==200){
            //        console.log("Simpan Riwayat Penyakit Sukses...!!!");   
            //     }
            // });

            // $http({
            //     method: 'POST',
            //     url:  '../apidb/klinik/put_rm_tanda_vital.php',
            //     data: {idKunjungan: $routeParams.idkunjungan,idAntrian: $scope.idAntrian, idPasien: $routeParams.id,
            //            kesadaran : $scope.kesadaran, kondisiUmum : $scope.kondisi_umum, tekananDarah: $scope.tekanan_darah, denyutNadi: $scope.denyut_nadi, pernafasan: $scope.pernafasan, suhu: $scope.suhu }
            // }).then(function (response) {
            //     // on success
            //     if(response.status==200){
            //        console.log("Simpan Tanda Vital Sukses...!!!");   
            //     }
            // });



            // $http({
            //     method: 'POST',
            //     url:  '../apidb/klinik/submit_rekam_medis.php',
            //     data: {idKunjungan: $routeParams.idkunjungan,idAntrian: $scope.idAntrian, idPasien: $routeParams.id, idDokter: $scope.iddokter, namaDokter: $scope.namadokter, amnese: $scope.amnese, diagnosa: $scope.diagnosa }
            // }).then(function (response) {
            //     // on success
            //     if(response.status==200){
                      
            //     }
            // });
           

            // if($scope.daftarObat.length != 0){
            //     for(var i = 0; i < $scope.daftarObat.length; i++){
            //        // Memasukkan data obat ke database 
            //        var id_obat = $scope.daftarObat[i].mid;
            //        var quantity_obat = $scope.daftarObat[i].mid;
            //        var harga_obat = $scope.daftarObat[i].harga;
            //        var satuan_obat = $scope.daftarObat[i].satuan;
            //        var nama_obat = $scope.daftarObat[i].name;
            //         $http({
            //             method: 'POST',
            //             url:  '../apidb/klinik/submit_obat_kunjungan.php',
            //             data: { idKunjungan : $routeParams.idkunjungan,
            //                     idPasien    : $routeParams.id,
            //                     namaPasien  : $scope.namaPasien, 
            //                     idObat      : id_obat,
            //                     namaObat    : nama_obat ,
            //                     hargaObat   : harga_obat, 
            //                     satuanObat  : satuan_obat, 
            //                     quantityObat: quantity_obat }   
            //         }).then(function (response) {
            //             // on success
            //             if(response.status==200){
                              
            //             }
            //         });
            //     }
            // }


            // if($scope.daftarLayanan.length != 0){
            //     for(var i = 0; i < $scope.daftarLayanan.length; i++){
            //        // Memasukkan data obat ke database 
            //        var harga_bahan = $scope.daftarLayanan[i].harga;
            //        var harga_layanan = $scope.daftarLayanan[i].jasa;
            //        var nama_layanan = $scope.daftarLayanan[i].name;
            //         $http({
            //             method: 'POST',
            //             url:  '../apidb/klinik/submit_layanan_kunjungan.php',
            //             data: { idKunjungan   : $routeParams.idkunjungan,
            //                     idPasien      : $routeParams.id,
            //                     namaPasien    : $scope.namaPasien, 
            //                     namaLayanan   : nama_layanan,
            //                     hargaLayanan  : harga_layanan, 
            //                     hargaBahan    : harga_bahan }   
            //         }).then(function (response) {
            //             // on success
            //             if(response.status==200){
            //                 console.log("RESPON");  
            //                console.log(response);    
            //             }
            //         });
            //     }
            // }


            // $location.path("/home");


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



