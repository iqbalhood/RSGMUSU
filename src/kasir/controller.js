
var app = angular.module('myApp.controller', []);

app.controller("HomeCtrl", function ($scope,$cookies,$interval,$http, $route,$timeout, $routeParams, $window) {
 
    $http.get("../apidb/kunjungan/list_data_no.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
       });
});

app.controller("HistoriCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window) {

    $scope.cekTanggal = function(){
        alert("WOW KEEREEEENNN");
    };
   
});

app.controller("InvoiceCtrl", function ($scope,$cookies,$interval,$http, $route,$timeout, $routeParams, $window) {
    

    console.log("ID PASIEN" + $routeParams.id );
    console.log("ID KUNJUNGAN" + $routeParams.idkunjungan );

    $scope.idKunjungan = $routeParams.idkunjungan;

    $scope.getTotal =0;
    $scope.getTotalLayanan =0;
    
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

        console.log("=== Layanan ===");

        if($scope.myData){

            for(var i = 0; i < $scope.myDataLayanan.length; i++){
            console.log( $scope.myDataLayanan[i].nama_layanan);
            
            //    $http({
            //                 method: 'POST',
            //                 url:  '../apidb/klinik/submit_obat_kunjungan.php',
            //                 data: { idKunjungan : $routeParams.idkunjungan,
            //                         idPasien    : $routeParams.id,
            //                         namaPasien  : $scope.namaPasien, 
            //                         idObat      : id_obat,
            //                         namaObat    : nama_obat ,
            //                         hargaObat   : harga_obat, 
            //                         satuanObat  : satuan_obat, 
            //                         quantityObat: quantity_obat }   
            //             }).then(function (response) {
            //                 // on success
            //                 if(response.status==200){
                                
            //                 }
            //             });
            }

        } else {

            console.log("Data Layanan Kosong");

        }

        console.log("=== Obat ===");

        if($scope.myData){

           console.log( "ID KUNJUNGAN " + $routeParams.idkunjungan);
           console.log( "ID PASIEN "  +  $routeParams.id ); 

            for(var j = 0; j < $scope.myData.length; j++){
               
                   // Memasukkan data obat ke database 
                   var id_obat = $scope.myData[j].id;
                   var quantity_obat = $scope.myData[j].quantity;
                   var harga_obat = $scope.myData[j].harga;
                   var satuan_obat = $scope.myData[j].satuan;
                   var nama_obat = $scope.myData[j].nama_obat;
                    $http({
                        method: 'POST',
                        url:  '../apidb/klinik/submit_obat_invoice.php',
                        data: { idKunjungan : $routeParams.idkunjungan,
                                idPasien    : $routeParams.id,
                                idObat      : id_obat,
                                namaObat    : nama_obat,
                                hargaObat   : harga_obat, 
                                satuanObat  : satuan_obat, 
                                quantityObat: quantity_obat }   
                    }).then(function (response) {
                        // on success
                        console.log(response);

                        if(response.status==200){
                              
                        }
                    });



            }

        }else{
            
            console.log("Data Obat Kosong");
        }

       


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

