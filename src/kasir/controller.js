
var app = angular.module('myApp.controller', []);

app.controller("HomeCtrl", function ($scope,$cookies,$interval,$http, $route,$timeout, $routeParams, $window) {
 
    $http.get("../apidb/kunjungan/list_data_kasir.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
       });

       setTimeout(function(){
        $('#mytableOrder').dataTable({
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

app.controller("CicilanCtrl", function ($scope,$cookies,$interval,$http, $route,$timeout, $routeParams, $window) {
    
       $http.get("../apidb/kunjungan/list_data_cicilan_kasir.php").then(function (response) {
           $scope.myData = response.data.event;
           console.log(response.data.event);
          });
   
          setTimeout(function(){
           $('#mytableOrder').dataTable({
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

app.controller("HistoriCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {

    $scope.cekTanggal = function(){
        alert("WOW KEEREEEENNN");
    };

    $http.get("../apidb/kunjungan/list_data_kasir_sudah_bayar.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
       });


       $scope.search = function (){
            console.log("==============>> SEARCH <<==================");
            console.log("ID KLINIK "+$scope.id_klinik);
            $scope.myData = "";


       };

    setTimeout(function(){
        $('#mytableOrder').dataTable({
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

app.controller("InvoiceCtrl", function ($scope,$cookies,$interval,$http, $route,$timeout, $routeParams, $window) {
    

    console.log("ID PASIEN" + $routeParams.id );
    console.log("ID KUNJUNGAN" + $routeParams.idkunjungan );

    $scope.idKunjungan = $routeParams.idkunjungan;
    $scope.idPasien = $routeParams.id;

    $scope.getTotal =0;
    $scope.getTotalLayanan =0;

    $scope.urlPrint = "../print/print-invoice.php?pasien="+$scope.idPasien+"&kunjungan="+$scope.idKunjungan;
    
    //GET DATA PASIEN

      $http({
        method: 'POST',    
        url: '../apidb/pasien/get.php',
        data: {newId: $routeParams.id}
    }).then(function (response) {
        
        // on success
        $scope.people           =  response.data;
        $scope.id               =  $scope.people.id;
        $scope.nameUser         =  $scope.people.name;
        $scope.phone            =  $scope.people.phone;
        $scope.kelamin          =  $scope.people.jenis_kelamin;
        $scope.alamat           =  $scope.people.alamat;
       
        
    }, function (response) {
        
        // on error
        console.log(response.data,response.status);
        
    });

    //GET DATA KLINIK DAN DOKTER
    console.log("ID KUNJUNGAN GET"+ $scope.idKunjungan);

    $http({
        method: 'POST',    
        url: '../apidb/kunjungan/get.php',
        data: {newId: $scope.idKunjungan}
    }).then(function (response) {
        
        // on success
        $scope.datakunjungan    = response.data;
        $scope.namadokter       =  $scope.datakunjungan.dokter;
        $scope.iddokter         =  $scope.datakunjungan.id_dokter;
        $scope.id_klinik        =  $scope.datakunjungan.id_klinik;
        $scope.dokter_pendamping = $scope.datakunjungan.dokter_pendamping;
        $scope.biaya_rekam_medis = $scope.datakunjungan.biaya_rekam_medis;
        if($scope.biaya_rekam_medis == '1'){
            $scope.rekam_medis_pay=4000;
        }else{
            $scope.rekam_medis_pay=0;
        }
         

        console.log("Dokternya " + $scope.namadokter);
       
        
    }, function (response) {
        
        // on error
        console.log(response.data,response.status);
        
    });



    $http.get("../apidb/apotek/invoice_list_data_obat.php?id="+$scope.idKunjungan).then(function (response) {
       
        if (!response.data.event){

            console.log("Data Obat Kosong");

        }else{
       
       
            $scope.myData = response.data.event;
            console.log(response.data.event);
            console.log("PANJANG "+$scope.myData.length);

            for(var i = 0; i < $scope.myData.length; i++){
                console.log(($scope.myData[i].harga * $scope.myData[i].quantity) );
                // var harga = $scope.myData[i].harga;
                // var quantity = $scope.myData[i].quantity;
                $scope.getTotal += ($scope.myData[i].harga * $scope.myData[i].quantity);
            }

        }


    });


    $http.get("../apidb/klinik/list_data_layanan_no.php?id="+$scope.idKunjungan).then(function (response) {

        if (!response.data.event){

            console.log("Data Layanan Kosong");

        }else{
       

       
            $scope.myDataLayanan = response.data.event;
            console.log(response.data.event);
            // console.log("PANJANG "+$scope.myData.length);

            for(var i = 0; i < $scope.myDataLayanan.length; i++){
            
                $scope.getTotalLayanan += ( ($scope.myDataLayanan[i].harga_bahan * 1) + ($scope.myDataLayanan[i].harga_layanan * 1));
            }
        }
      


    });


    $scope.submitInvoice = function (){

       
            
               $http({
                            method: 'POST',
                            url:  '../apidb/kasir/complete_order.php',
                            data: { idKunjungan : $routeParams.idkunjungan }   
                        }).then(function (response) {
                            // on success
                            if(response.status==200){
                                // console.log(response.data);
                                alert("Invoice Telah Dibayar");
                                $location.path("/home");
                            }
                        });
         
    };

    $scope.back= function(){
        $location.path("/home");
    };



});

app.controller("InvoiceCicilanCtrl", function ($scope,$location,$cookies,$interval,$http, $route,$timeout, $routeParams, $window) {
    
    $scope.rekam_medis_pay = 0;
    console.log("ID PASIEN" + $routeParams.id );
    console.log("ID KUNJUNGAN" + $routeParams.idkunjungan );

   

    $scope.idKunjungan = $routeParams.idkunjungan;
    $scope.idPasien = $routeParams.id;

    $scope.getTotal =0;
    $scope.getTotalLayanan =0;
    $scope.getTotalCicilan = 0;

    $scope.urlPrint = "../print/print-invoice-cicilan.php?pasien="+$scope.idPasien+"&kunjungan="+$scope.idKunjungan;
    
    
    //GET DATA PASIEN

      $http({
        method: 'POST',    
        url: '../apidb/pasien/get.php',
        data: {newId: $routeParams.id}
    }).then(function (response) {
        
        // on success
        $scope.people           =  response.data;
        $scope.id               =  $scope.people.id;
        $scope.nameUser         =  $scope.people.name;
        $scope.phone            =  $scope.people.phone;
        $scope.kelamin          =  $scope.people.jenis_kelamin;
        $scope.alamat           =  $scope.people.alamat;
        $scope.biaya_rekam_medis = $scope.datakunjungan.biaya_rekam_medis;
        if($scope.biaya_rekam_medis == '1'){
            $scope.rekam_medis_pay=4000;
        }else{
            $scope.rekam_medis_pay=0;
        }
        
    }, function (response) {
        
        // on error
        console.log(response.data,response.status);
        
    });

    //GET DATA KLINIK DAN DOKTER
    console.log("ID KUNJUNGAN GET"+ $scope.idKunjungan);

    $http({
        method: 'POST',    
        url: '../apidb/kunjungan/get.php',
        data: {newId: $scope.idKunjungan}
    }).then(function (response) {
        
        // on success
        $scope.datakunjungan    = response.data;
        $scope.namadokter       =  $scope.datakunjungan.dokter;
        $scope.iddokter         =  $scope.datakunjungan.id_dokter;
        $scope.id_klinik        =  $scope.datakunjungan.id_klinik;
        $scope.dokter_pendamping = $scope.datakunjungan.dokter_pendamping;
         

        console.log("Dokternya " + $scope.namadokter);
       
        
    }, function (response) {
        
        // on error
        console.log(response.data,response.status);
        
    });



    $http.get("../apidb/apotek/invoice_list_data_obat.php?id="+$scope.idKunjungan).then(function (response) {
       
        if (!response.data.event){

            console.log("Data Obat Kosong");

        }else{
       
       
            $scope.myData = response.data.event;
            console.log(response.data.event);
            console.log("PANJANG "+$scope.myData.length);

            for(var i = 0; i < $scope.myData.length; i++){
                console.log(($scope.myData[i].harga * $scope.myData[i].quantity) );
                // var harga = $scope.myData[i].harga;
                // var quantity = $scope.myData[i].quantity;
                $scope.getTotal += ($scope.myData[i].harga * $scope.myData[i].quantity);
            }

        }


    });


    $http.get("../apidb/klinik/list_data_layanan_no.php?id="+$scope.idKunjungan).then(function (response) {

        if (!response.data.event){

            console.log("Data Layanan Kosong");

        }else{
       
            $scope.myDataLayanan = response.data.event;
            console.log(response.data.event);
            // console.log("PANJANG "+$scope.myData.length);

            for(var i = 0; i < $scope.myDataLayanan.length; i++){
            
                $scope.getTotalLayanan += ( ($scope.myDataLayanan[i].harga_bahan * 1) + ($scope.myDataLayanan[i].harga_layanan * 1));
            }
        }
      


    });


    $http.get("../apidb/kasir/list_data_cicilan.php?id="+$scope.idKunjungan).then(function (response) {
                if (!response.data.event){
                    console.log("Data Layanan Kosong");
                }else{
                    $scope.myDataCicilan = response.data.event;
                    console.log("CICILAN");
                    console.log(response.data.event);
                    for(var i = 0; i < $scope.myDataCicilan.length; i++){
                        
                            $scope.getTotalCicilan += ($scope.myDataCicilan[i].biaya * 1);
                    }
                    console.log(response.data.event);
                }    
   });

   $scope.showFormCicilan = function(){
        $scope.formCicilan = true;
   }
        


    $scope.submitInvoice = function (){
                        $http({
                            method: 'POST',
                            url:  '../apidb/kasir/complete_order.php',
                            data: { idKunjungan : $routeParams.idkunjungan }   
                        }).then(function (response) {
                            // on success
                            if(response.status==200){
                                // console.log(response.data);
                                alert("Invoice Telah Dibayar");
                                $location.path("/home");
                            }
                        });
    };



    $scope.submitCicilan = function(){
                        $http({
                            method: 'POST',
                            url:  '../apidb/kasir/submit_cicilan.php',
                            data: { idKunjungan : $routeParams.idkunjungan, pembayaran : $scope.pembayaran, keterangan : $scope.keterangan, tglpembayaran : $scope.tglpembayaran  }   
                        }).then(function (response) {
                            // on success
                            if(response.status==200){
                                $route.reload(); 
                                alert("Cicilan Telah Dibayar");
                                $scope.formCicilan = false;
                            }
                        });      
    };

    $scope.back= function(){
        $location.path("/home");
    };



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

