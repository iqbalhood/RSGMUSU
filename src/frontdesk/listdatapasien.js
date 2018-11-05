app.controller("ListDataPasienCtrl", function ($scope,$interval,$http, $route,$timeout, $routeParams, $window, $location) {
    $scope.pagging = [];

    $scope.shTable  = true;
    $scope.shForm   = false;
    bantu_search = true;
    $scope.tabelPencarian = false;
    $scope.id ="";


    $http.get("../apidb/pasien/list_data_paging.php").then(function (response) {
        $scope.myData = response.data.data;
        $scope.totalData = response.data.total;
        console.log("total Data" + $scope.totalData);
        $scope.dataTotal = Number(parseInt($scope.totalData) / 15);
        for (var k = 0; k < $scope.dataTotal; k++) {
            $scope.pagging.push(k);
        }

        console.log($scope.pagging.length);

        //$scope.$emit('UNLOAD');
    });     


    $scope.setPage = function (x) {
        $scope.$emit('LOAD');
        $scope.myData = "";
        
            $scope.myData = "";
            $http.get("../apidb/pasien/list_data_paging.php?page=" + x).then(function (response) {
                $scope.myData = response.data.data;
                $scope.$emit('UNLOAD');
            });
        
    }


    $scope.keyword = "";
    $scope.$watch("keyword", function (newValue, oldValue) {

        $scope.tabelPencarian = true;

        if ($scope.keyword.length > 2) {
            $scope.$emit('LOAD');
            $scope.totalSearch = 0;
            $http.get("../apidb/pasien/list_search.php?keyword=" + $scope.keyword).then(function (response) {
                $scope.DataPencarian = response.data.event;
                console.log(response.data.event);
                $scope.$emit('UNLOAD');
            });

        }


        if ($scope.keyword.length == 2) {
            $scope.DataPencarian = [];
            $scope.tabelPencarian = false;
        }

        if ($scope.keyword.length < 2) {
            $scope.tabelPencarian = false;
        }


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
    $scope.tabelPencarian = false;
        
        $scope.shForm   = true;
        $scope.id = "";
    };

    $scope.editForm = function(x) {
            $scope.shTable  = false;
            $scope.tabelPencarian = false;
            
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
        
        $scope.keyword = "";
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



});