
var app = angular.module('myApp.controller', []);


app.controller("HomeCtrl", function ($scope, $cookies, $interval, $http, $route, $timeout, $routeParams, $window) {
    var klinikCookie = $cookies.get('klinik');
    $scope.tipeKlinik = klinikCookie;
    $scope.dokterForm = false;


    $http.get("../apidb/kunjungan/list_data_kunjungan_masuk.php?id=" + klinikCookie + "&status=0").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
    });


    $http.get("../apidb/dokter/list_dokter_get.php?id=" + klinikCookie).then(function (response) {
        $scope.dataDokter = response.data.event;
        console.log(response.data.event);
    });


    $scope.tentukandokter = function (x) {
        $scope.dokterForm = true;

        $scope.id_kunjungan = x.id_kunjungan;
        $scope.nama_pasien = x.pasien;

    };



    $scope.submitForm = function () {
        $http({

            method: 'POST',
            url: '../apidb/datapasien/submit_dokter_pasien.php',
            data: { idKunjungan: $scope.id_kunjungan, dokterPendamping: $scope.dokterpendamping, dokterPraktisi: $scope.dokterpraktisi }

        }).then(function (response) {
            // on success
            if (response.status == 200) {

                $route.reload();
                alert("Data Dokter Telah Ditambahkan");
            }
            //console.log(response);
        });



    };
    setTimeout(function () {
        $('#mytablePasien').dataTable({
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

app.controller("AntrianCtrl", function ($scope, $cookies, $interval, $http, $route, $timeout, $routeParams, $window) {
    var klinikCookie = $cookies.get('klinik');
    $scope.tipeKlinik = klinikCookie;


    $http.get("../apidb/kunjungan/list_data.php?id=" + klinikCookie + "&status=1").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
    });

    setTimeout(function () {
        $('#mytablePasien').dataTable({
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




app.controller("RiwayatCtrl", function ($scope, $cookies, $interval, $http, $route, $timeout, $routeParams, $window) {
    var klinikCookie = $cookies.get('klinik');
    $scope.tipeKlinik = klinikCookie;


    $http.get("../apidb/kunjungan/list_data_riwayat.php?id=" + klinikCookie + "&status=2").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
    });

    $http.get("../apidb/dokter/list_data.php").then(function (response) {
        $scope.dataDokter = response.data.event;
        console.log(response.data.event);
    });


    $scope.showKlinik = function (x) {
        $scope.dokterpendamping = x.dokter_pendamping;
        $scope.id_kunjungan = x.id_kunjungan;
        $scope.id_pasien = x.id_pasien;
        $scope.klinikForm = true;
    };

    $scope.cancelFormKlinik = function () {
        $scope.klinikForm = false;
    };

    $scope.submitForm = function () {
        var xx = new Date();
        var yy = xx.getTime();



        $scope.idAntrian = yy;

        console.log("ID ANTRIAN YANG DIDAPAT " + $scope.idAntrian);

        $http({

            method: 'POST',
            url: '../apidb/datapasien/submit_ke_klinik.php',
            data: { idKunjungan: $scope.id_kunjungan, idAntrian: $scope.idAntrian, idKlinik: $scope.klinik, dokterPendamping: $scope.dokterpendamping, dokterPendamping: $scope.dokterpendamping, idDokter: $scope.dokterpraktisi, idPasien: $scope.id_pasien }

        }).then(function (response) {
            // on success
            if (response.status == 200) {

                //console.log(response.data);
                $route.reload();
            }
        });
    };



    setTimeout(function () {
        $('#mytablePasien').dataTable({
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


app.controller("PasienCtrl", function ($scope, $interval, $http, $route, $timeout, $routeParams, $window) {

    $scope.shTable = true;
    $scope.shForm = false;
    $scope.id = "";

    // $http.get("config/daftar_pasien.php").then(function (response) {
    $http.get("../apidb/pasien/list_data.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
    });

    $scope.no = Math.floor((Math.random() * 10000) + 1);
    $scope.submitForm = function () {


        if ($scope.id) {

            if ($scope.no_rekam_medis && $scope.name) {
                console.log("EDIT");
                console.log(" ID YANG DIEDIT " + $scope.no_rekam_medis);
                console.log("ID " + $scope.id);
                $http({

                    method: 'POST',
                    url: '../apidb/pasien/postedit.php',
                    data: { newId: $scope.no_rekam_medis, noRekamMedis: $scope.no_rekam_medis, noRegistrasi: $scope.noreg, tglRegistrasi: $scope.tglreg, newName: $scope.name, tempatLahir: $scope.tptlahir, tanggalLahir: $scope.tgllahir, newKelamin: $scope.kelamin, agama: $scope.agama, alamat: $scope.alamat, rtrw: $scope.rtrw, kelurahan: $scope.kelurahan, kecamatan: $scope.kecamatan, kabupaten: $scope.kabupaten, propinsi: $scope.propinsi, newPhone: $scope.phone, kewarganegaraan: $scope.kewarganegaraan, noKtp: $scope.noktp, pendidikan: $scope.pendidikan, pekerjaan: $scope.pekerjaan, statusPerkawinan: $scope.status_perkawinan, tglPertamamasuk: $scope.tgl_pertama_masuk, caraBayar: $scope.cara_bayar, tujuanKunjunganpertama: $scope.tujuan_kunjungan_pertama, alergi: $scope.alergi, catatan: $scope.catatan }

                }).then(function (response) {

                    console.log(response);
                    // on success
                    if (response.status == 200) {
                        $route.reload();
                        alert("Data Pasien Telah Diubah");
                    }
                });

            } else {

                alert("Silahkan Isi Nama dan Nomor Rekam Medis");

            }





        } else {
            console.log("INPUT");
            if ($scope.no_rekam_medis && $scope.name) {

                $http({

                    method: 'POST',
                    url: '../apidb/pasien/post.php',
                    data: { noRekamMedis: $scope.no_rekam_medis, noRegistrasi: $scope.noreg, tglRegistrasi: $scope.tglreg, newName: $scope.name, tempatLahir: $scope.tptlahir, tanggalLahir: $scope.tgllahir, newKelamin: $scope.kelamin, agama: $scope.agama, alamat: $scope.alamat, rtrw: $scope.rtrw, kelurahan: $scope.kelurahan, kecamatan: $scope.kecamatan, kabupaten: $scope.kabupaten, propinsi: $scope.propinsi, newPhone: $scope.phone, kewarganegaraan: $scope.kewarganegaraan, noKtp: $scope.noktp, pendidikan: $scope.pendidikan, pekerjaan: $scope.pekerjaan, statusPerkawinan: $scope.status_perkawinan, tglPertamamasuk: $scope.tgl_pertama_masuk, caraBayar: $scope.cara_bayar, tujuanKunjunganpertama: $scope.tujuan_kunjungan_pertama, alergi: $scope.alergi, catatan: $scope.catatan }

                }).then(function (response) {
                    // on success
                    if (response.status == 200) {
                        $route.reload();
                        alert("Data Pasien Telah Ditambahkan");
                    }
                    //console.log(response);
                });

            } else {

                alert("Silahkan Isi Nama dan Nomor Rekam Medis");

            }

        }
    };

    $scope.showForm = function () {
        $scope.shTable = false;
        $scope.shForm = true;
        $scope.id = "";
    };

    $scope.editForm = function (x) {
        $scope.shTable = false;
        $scope.shForm = true;
        console.log("This Is x value edit " + x);
        $http({
            method: 'POST',
            url: '../apidb/pasien/get.php',
            data: { newId: x }
        }).then(function (response) {
            console.log(response.data);
            // on success
            $scope.people = response.data;
            $scope.id = $scope.people.no_rekam_medis;
            $scope.no_rekam_medis = $scope.people.no_rekam_medis;
            $scope.noreg = $scope.people.no_registrasi;
            $scope.tglreg = $scope.people.tgl_registrasi;
            $scope.name = $scope.people.name;
            $scope.tptlahir = $scope.people.tempat_lahir;
            $scope.tgllahir = $scope.people.tanggal_lahir;
            $scope.kelamin = $scope.people.jenis_kelamin;
            $scope.agama = $scope.people.agama;
            $scope.alamat = $scope.people.alamat;
            $scope.rtrw = $scope.people.rtrw;
            $scope.kelurahan = $scope.people.kelurahan;
            $scope.kecamatan = $scope.people.kecamatan;
            $scope.kabupaten = $scope.people.kabupaten;
            $scope.propinsi = $scope.people.propinsi;
            $scope.phone = $scope.people.phone;
            $scope.kewarganegaraan = $scope.people.kewarganegaraan;
            $scope.noktp = $scope.people.noktp;
            $scope.pendidikan = $scope.people.pendidikan;
            $scope.pekerjaan = $scope.people.pekerjaan;
            $scope.status_perkawinan = $scope.people.status_perkawinan;
            $scope.tgl_pertama_masuk = $scope.people.tgl_pertama_masuk;
            $scope.cara_bayar = $scope.people.cara_bayar;
            $scope.tujuan_kunjungan_pertama = $scope.people.tujuan_kunjungan_pertama;
            $scope.alergi = $scope.people.alergi;
            $scope.catatan = $scope.people.catatan;



        }, function (response) {

            // on error
            console.log(response.data, response.status);

        });

    };


    $scope.deleteForm = function (x) {
        console.log("This Is delete x value " + x);
        $scope.combro = x;
        $http({

            method: 'POST',
            url: '../apidb/pasien/delete.php',
            data: { recordId: $scope.combro }

        }).then(function (response) {
            // on success
            if (response.status == 200) {
                $route.reload();
                alert("Data Pasien Telah Dihapus");
                $route.reload();
            }
            // console.log("combro"+$scope.combro);
            // console.log(response);
        });
    };

    $scope.cancelForm = function () {

        $scope.shTable = true;
        $scope.shForm = false;
        $scope.no_rekam_medis = "";
        $scope.noreg = "";
        $scope.tglreg = "";
        $scope.name = "";
        $scope.tptlahir = "";
        $scope.tgllahir = "";
        $scope.kelamin = "";
        $scope.agama = "";
        $scope.alamat = "";
        $scope.rtrw = "";
        $scope.kelurahan = "";
        $scope.kecamatan = "";
        $scope.kabupaten = "";
        $scope.propinsi = "";
        $scope.phone = "";
        $scope.kewarganegaraan = "";
        $scope.noktp = "";
        $scope.pendidikan = "";
        $scope.pekerjaan = "";
        $scope.status_perkawinan = "";
        $scope.tgl_pertama_masuk = "";
        $scope.cara_bayar = "";
        $scope.tujuan_kunjungan_pertama = "";
        $scope.alergi = "";
        $scope.catatan = "";

    };

    setTimeout(function () {
        $('#mytablePasien').dataTable({
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

app.controller("BodyCtrl", function ($scope, $cookies, $window) {



    var usernameCookie = $cookies.get('username');
    var aksesCookie = $cookies.get('akses');
    var klinikCookie = $cookies.get('klinik');

    console.log("COOKIES GET USRE" + usernameCookie);
    console.log("COOKIES GET AKSES" + aksesCookie);
    console.log("COOKIES GET Klinik" + klinikCookie);

    $scope.user = usernameCookie;
    $scope.akses = aksesCookie;
    $scope.akses_klinik = klinikCookie;


    $scope.logout = function () {
        $window.location.href = "index.html";
    };

});


app.controller("ApotikCtrl", function ($scope, $cookies, $window) {




});


app.controller("KlinikCtrl", function ($scope, $interval, $http, $route, $timeout, $routeParams, $window) {

    $scope.shTable = true;
    $scope.shForm = false;

    $http.get("../apidb/kunjungan/list_data.php?id=" + $routeParams.id).then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
    });

    console.log("Controller Works");





});



app.controller("DokterCtrl", function ($scope, $interval, $http, $route, $timeout, $routeParams, $window) {

    $scope.shTable = true;
    $scope.shForm = false;
    $scope.id = "";

    // $http.get("config/daftar_pasien.php").then(function (response) {
    $http.get("../apidb/dokter/list_data.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
    });

    $scope.no = Math.floor((Math.random() * 10000) + 1);

    $scope.submitForm = function () {


        if ($scope.id) {
            console.log(" ID YANG DIEDIT " + $scope.id);
            console.log($scope.id);
            console.log($scope.name);
            console.log($scope.kelamin);
            console.log($scope.phone);
            $http({

                method: 'POST',
                url: '../apidb/dokter/postedit.php',
                data: { newId: $scope.id, newName: $scope.name, newPhone: $scope.phone, newKelamin: $scope.kelamin }

            }).then(function (response) {

                console.log(response);
                // on success
                if (response.status == 200) {
                    $route.reload();
                }
            });


        } else {

            $http({

                method: 'POST',
                url: '../apidb/dokter/post.php',
                data: { newName: $scope.name, newPhone: $scope.phone, newKelamin: $scope.kelamin }

            }).then(function (response) {
                // on success
                if (response.status == 200) {
                    $route.reload();
                }
            });

        }
    };



    $scope.showForm = function () {
        $scope.shTable = false;
        $scope.shForm = true;
    };

    $scope.editForm = function (x) {
        $scope.shTable = false;
        $scope.shForm = true;
        console.log("This Is x value " + x);
        $http({
            method: 'POST',
            url: '../apidb/dokter/get.php',
            data: { newId: x }
        }).then(function (response) {

            // on success
            $scope.people = response.data;
            $scope.id = $scope.people.id;
            $scope.name = $scope.people.name;
            $scope.phone = $scope.people.phone;
            $scope.kelamin = $scope.people.jenis_kelamin;


        }, function (response) {

            // on error
            console.log(response.data, response.status);

        });

    };


    $scope.deleteForm = function (x) {
        // console.log("This Is delete x value "+x);
        $http({

            method: 'POST',
            url: '../apidb/dokter/delete.php',
            data: { recordId: x }

        }).then(function (response) {

            $route.reload();

        }, function (response) {

            console.log(response.data, response.status);

        });
    };

    $scope.cancelForm = function () {

        $scope.shTable = true;
        $scope.shForm = false;
        $scope.id = "";
        $scope.name = "";
        $scope.phone = "";
        $scope.kelamin = "";

    };


    setTimeout(function () {
        $('#mytableDokter').dataTable({
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

app.controller("ObatCtrl", function ($scope, $interval, $http, $route, $timeout, $routeParams, $window) {

    $scope.shTable = true;
    $scope.shForm = false;
    $scope.id = "";


    $http.get("../apidb/obat/list_data.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
    });

    $scope.showForm = function () {
        $scope.shTable = false;
        $scope.shForm = true;
    };

    $scope.editForm = function (x) {
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
            $scope.id = $scope.people.id;
            $scope.name = $scope.people.name;
            $scope.quantity = $scope.people.quantity;
            $scope.satuan = $scope.people.satuan;
            $scope.harga = $scope.people.harga;

        }, function (response) {

            // on error
            console.log(response.data, response.status);

        });
    };

    $scope.deleteForm = function (x) {
        // console.log("This Is delete x value "+x);
        $http({

            method: 'POST',
            url: '../apidb/obat/delete.php',
            data: { recordId: x }

        }).then(function (response) {

            $route.reload();

        }, function (response) {

            console.log(response.data, response.status);

        });
    };

    $scope.cancelForm = function () {

        $scope.shTable = true;
        $scope.shForm = false;
        $scope.id = "";
        $scope.name = "";
        $scope.quantity = "";
        $scope.satuan = "";
        $scope.harga = "";

    };

    $scope.submitForm = function () {
        if ($scope.id) {
            console.log(" ID YANG DIEDIT " + $scope.id);
            console.log($scope.id);
            console.log($scope.name);
            console.log($scope.kelamin);
            console.log($scope.phone);
            $http({

                method: 'POST',
                url: '../apidb/obat/postedit.php',
                data: { newId: $scope.id, newName: $scope.name, newQuantity: $scope.quantity, newSatuan: $scope.satuan, newHarga: $scope.harga }

            }).then(function (response) {

                console.log(response);
                // on success
                if (response.status == 200) {
                    $route.reload();
                }
            });
        } else {
            $http({

                method: 'POST',
                url: '../apidb/obat/post.php',
                data: { newName: $scope.name, newQuantity: $scope.quantity, newSatuan: $scope.satuan, newHarga: $scope.harga }

            }).then(function (response) {
                // on success
                if (response.status == 200) {
                    $route.reload();
                }
            });
        }
    };



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

app.controller("UsersCtrl", function ($scope, $interval, $http, $route, $timeout, $routeParams, $window) {

    $scope.shTable = true;
    $scope.shForm = false;
    $scope.id = "";

    // $http.get("config/daftar_pasien.php").then(function (response) {
    $http.get("../apidb/users/list_data.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
    });



    setTimeout(function () {
        $('#mytableUsers').dataTable({
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

app.controller("DataPasienCtrl", function ($scope, $interval, $http, $route, $timeout, $routeParams, $window) {
    $scope.klinikForm = false;
    $scope.tablePelayanan = false;
    $scope.id_pasien = $routeParams.id;

    var d = new Date();
    var n = d.getTime();

    $scope.id_kunjungan = n;

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


    }, function (response) {

        // on error
        console.log(response.data, response.status);

    });


    $http.get("../apidb/klinik/list_rekam_medis_pasien.php?idpasien=" + $scope.id_pasien).then(function (response) {

        $scope.rekamMedisPasien = response.data.event;
        console.log($scope.rekamMedisPasien);
    });


    console.log("Data Perawatan Pasien");
    $http.get("../apidb/klinik/list_perawatan_pasien.php?idpasien=" + $scope.id_pasien).then(function (response) {
        console.log("SUKAKMU LAH ");
        $scope.dataPerawatanPasien = response.data.event;
        console.log($scope.dataPerawatanPasien);
    });

    //fungsi untuk query dokter di klinik 
    $scope.selectDokter = function () {
        console.log("Klinik Telah Dipilih");
        console.log("klinik" + $scope.klinik);
        $scope.dataDokter = "";

        $http.get("../apidb/dokter/list_dokter_get.php?id=" + $scope.klinik).then(function (response) {
            $scope.dataDokter = response.data.event;
            console.log(response.data.event);
        });
    };

    $scope.showKlinik = function () {
        $scope.klinikForm = true;
    };

    $scope.cancelFormKlinik = function () {
        $scope.klinikForm = false;
    };

    $scope.showTable = function (x) {
        $scope.idRM = x;
        $scope.tablePelayanan = true;
        $http.get("../apidb/klinik/list_data_kunjugan_klinik.php?idkunjungan=" + $scope.idRM).then(function (response) {
            $scope.dataKunjunganKlinik = response.data.event;
            console.log($scope.dataKunjunganKlinik);
        });
    };

    $scope.hideTable = function () {

        $scope.tablePelayanan = false;

    };

    $scope.submitForm = function () {
        var xx = new Date();
        var yy = d.getTime();

        $scope.idAntrian = yy;

        console.log("ID ANTRIAN YANG DIDAPAT " + $scope.idAntrian);

        $http({
            method: 'POST',
            url: '../apidb/datapasien/submit_ke_klinik.php',
            data: { idKunjungan: $scope.id_kunjungan, idAntrian: $scope.idAntrian, idKlinik: $scope.klinik, dokterPendamping: $scope.dokterpendamping, dokterPendamping: $scope.dokterpendamping, idDokter: $scope.dokterpraktisi, idPasien: $scope.id_pasien }

        }).then(function (response) {
            // on success
            if (response.status == 200) {
                // console.log(response.data);
                $route.reload();
            }
        });
    };



});


app.controller("RekamMedisCtrl", function ($scope, $interval, $http, $route, $timeout, $routeParams, $window) {

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


    
    //ODONTOGRAMA

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
    console.log("BLOCK INI DIPROSES");
    $scope.people = response.data;
    console.log($scope.people);
    


    $scope.status_jantung           = Boolean(parseInt($scope.people.status_jantung));
    $scope.keterangan_jantung       = $scope.people.keterangan_jantung;

    $scope.status_hipertensi        = Boolean(parseInt($scope.people.status_hipertensi));
    $scope.keterangan_hipertensi    = $scope.people.keterangan_hipertensi;

    $scope.status_diabetes          = Boolean(parseInt($scope.people.status_diabetes));
    $scope.keterangan_diabetes      = $scope.people.keterangan_diabetes;

    $scope.status_alergi            = Boolean(parseInt($scope.people.status_alergi));
    $scope.keterangan_alergi        = $scope.people.keterangan_alergi;

    $scope.status_asma              = Boolean(parseInt($scope.people.status_asma));
    $scope.keterangan_asma          = $scope.people.keterangan_asma;

    $scope.status_hepar             = Boolean(parseInt($scope.people.status_hepar));
    $scope.keterangan_hepar         = $scope.people.keterangan_hepar;

    $scope.status_lambung           = Boolean(parseInt($scope.people.status_lambung));
    $scope.keterangan_lambung       = $scope.people.keterangan_lambung;

    $scope.status_lain              = Boolean(parseInt($scope.people.status_lain));
    $scope.keterangan_lain          = $scope.people.keterangan_lain;

   

}, function (response) {

    // on error
    console.log(response.data, response.status);

});














});


app.controller("PerawatanRadiologiCtrl", function ($scope, $cookies, $location, $interval, $http, $route, $timeout, $routeParams, $window) {

    var klinikCookie = $cookies.get('klinik');
    console.log("PERAWATAN RADIOLOGI ");
    $scope.daftarLayanan = [];

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


    }, function (response) {

        // on error
        console.log(response.data, response.status);

    });



    $http({
        method: 'POST',
        url: '../apidb/kunjungan/get.php',
        data: { newId: $routeParams.idkunjungan }
    }).then(function (response) {

        // on success
        $scope.datakunjungan = response.data;
        $scope.namadokter = $scope.datakunjungan.dokter;
        $scope.iddokter = $scope.datakunjungan.id_dokter;
        $scope.idAntrian = $scope.datakunjungan.id_antrian;

        console.log("Dokternya " + $scope.dokter);


    }, function (response) {

        // on error
        console.log(response.data, response.status);

    });


    $http.get("../apidb/layanan/list_data.php?id=" + klinikCookie).then(function (response) {
        $scope.dataLayanan = response.data.event;
        console.log(response.data.event);
    });




    $scope.FormLayanan = function (x) {
        $scope.shFormLayanan = true;
        $scope.id = x;
        $http({
            method: 'POST',
            url: '../apidb/layanan/get.php',
            data: { newId: x }
        }).then(function (response) {
            console.log("DATA LAYANAN");
            console.log(response);
            // on success
            $scope.peopleLayanan = response.data;
            $scope.idLayanan = $scope.peopleLayanan.id;
            $scope.nameLayanan = $scope.peopleLayanan.layanan;
            $scope.bahanLayanan = $scope.peopleLayanan.bahan;
            $scope.harga_bahan = $scope.peopleLayanan.harga_bahan;
            $scope.harga_koas = $scope.peopleLayanan.harga_koas;
            $scope.harga_drg = $scope.peopleLayanan.harga_drg;
            $scope.harga_drgsp = $scope.peopleLayanan.harga_drgsp;

        }, function (response) {

            // on error
            console.log(response.data, response.status);

        });
    };

    $scope.cancelFormObat = function () {

        $scope.shForm = false;
        $scope.id = "";
        $scope.name = "";
        $scope.quantity = "";
        $scope.satuan = "";
        $scope.harga = "";

    };

    $scope.cancelFormLayanan = function () {
        $scope.shFormLayanan = false;
        $scope.idLayanan = "";
        $scope.nameLayanan = "";
        $scope.bahanLayanan = "";
        $scope.harga_bahan = "";
        $scope.harga_koas = "";
        $scope.harga_drg = "";
        $scope.harga_drgsp = "";
    };

    $scope.updateJasa = function () {

        if ($scope.pelaksana == '0') {
            $scope.jasa = $scope.harga_koas;

        }

        if ($scope.pelaksana == '1') {
            $scope.jasa = $scope.harga_drg;

        }

        if ($scope.pelaksana == '2') {
            $scope.jasa = $scope.harga_drgsp;

        }

    };

    $scope.submitFormLayanan = function () {
        var obj = { name: $scope.nameLayanan, harga: $scope.harga_bahan, jasa: $scope.jasa };
        if ($scope.daftarLayanan.length != 0) {

            //Jika Data Obat Sudah ada maka cek apakah  ada nama obat  yang sama di array
            var index = $scope.daftarLayanan.map(function (item) {
                return item.name;
            }).indexOf($scope.nameLayanan);

            // Jika benar obat memang sudah ada kita ganti quantitynya 
            if (index != -1) {
                console.log("harus diganti");
                var hasil = parseInt($scope.daftarLayanan[index].harga_bahan) + parseInt($scope.harga_bahan);
                $scope.daftarLayanan[index].harga_bahan = hasil;

                var hasilJasa = parseInt($scope.daftarLayanan[index].jasa) + parseInt($scope.jasa);
                $scope.daftarLayanan[index].jasa = hasilJasa;

            } else {
                $scope.daftarLayanan.push(obj);
            }

        } else {
            // Jika Belum ada obat maka buatlah data obatnya 
            $scope.daftarLayanan.push(obj);
        }
        // console.log( "PANJANG SCOPE"+$scope.daftarLayanan.length);

        // console.log("Nama Layanan Tersedia");
        // $scope.daftarLayanan.push(obj);
        // console.log( $scope.daftarLayanan);     
        $scope.shFormLayanan = false;
    };



    // $scope.simpanData = function () {
    //     var klinikCookie = $cookies.get('klinik');
    //     $http({
    //         method: 'POST',
    //         url: '../apidb/klinik/submit_perawatan.php',
    //         data: { idAntrian: $routeParams.idkunjungan, idKlinik: klinikCookie, idPasien: $routeParams.id, idDokter: $scope.iddokter, namaDokter: $scope.namadokter, element: $scope.element_gigi_mulut, diagnosa: $scope.diagnosa, perawatan: $scope.perawatan, icd10: $scope.icd10 }
    //     }).then(function (response) {
    //         // on success
    //         if (response.status == 200) {
    //             console.log("input sukses");
    //         }
    //     });
    //     $http({
    //         method: 'POST',
    //         url: '../apidb/klinik/submit_rekam_medis.php',
    //         data: { idKunjungan: $routeParams.idkunjungan, idAntrian: $scope.idAntrian, idPasien: $routeParams.id, idDokter: $scope.iddokter, namaDokter: $scope.namadokter, amnese: $scope.amnese, diagnosa: $scope.diagnosa }
    //     }).then(function (response) {
    //         // on success
    //         if (response.status == 200) {

    //         }
    //     });
    //     if ($scope.daftarLayanan.length != 0) {
    //         for (var i = 0; i < $scope.daftarLayanan.length; i++) {
    //             // Memasukkan data obat ke database 
    //             var harga_bahan = $scope.daftarLayanan[i].harga;
    //             var harga_layanan = $scope.daftarLayanan[i].jasa;
    //             var nama_layanan = $scope.daftarLayanan[i].name;
    //             $http({
    //                 method: 'POST',
    //                 url: '../apidb/klinik/submit_layanan_kunjungan.php',
    //                 data: {
    //                     idKunjungan: $routeParams.idkunjungan,
    //                     idPasien: $routeParams.id,
    //                     namaPasien: $scope.namaPasien,
    //                     namaLayanan: nama_layanan,
    //                     hargaLayanan: harga_layanan,
    //                     hargaBahan: harga_bahan
    //                 }
    //             }).then(function (response) {
    //                 // on success
    //                 if (response.status == 200) {
    //                     console.log(response);
    //                     $location.path("/home");
    //                 }
    //             });
    //         }
    //     }
    // };


    $scope.simpanData = function(){
        if ($scope.amnese, $scope.element_gigi_mulut, $scope.diagnosa, $scope.cicilan && ($scope.daftarLayanan.length != 0)) {




          

            $http({
                method: 'POST',
                url: '../apidb/klinik/submit_perawatan.php',
                data: { idAntrian: $routeParams.idkunjungan, idKlinik: klinikCookie, idPasien: $routeParams.id, idDokter: $scope.iddokter, namaDokter: $scope.namadokter, element: $scope.element_gigi_mulut, diagnosa: $scope.diagnosa, perawatan: JSON.stringify($scope.daftarPerawatanInput), icd10: $scope.icd10 }
            }).then(function (response) {
                // on success
                if (response.status == 200) {
                    console.log("input sukses");
                }
            });

         




            if ($scope.daftarLayanan.length != 0) {
                for (var i = 0; i < $scope.daftarLayanan.length; i++) {
                    // Memasukkan data obat ke database 
                    var harga_bahan = $scope.daftarLayanan[i].harga;
                    var harga_layanan = $scope.daftarLayanan[i].jasa;
                    var nama_layanan = $scope.daftarLayanan[i].name;
                    $http({
                        method: 'POST',
                        url: '../apidb/klinik/submit_layanan_kunjungan.php',
                        data: {
                            idKunjungan: $routeParams.idkunjungan,
                            idPasien: $routeParams.id,
                            namaPasien: $scope.namaPasien,
                            namaLayanan: nama_layanan,
                            hargaLayanan: harga_layanan,
                            hargaBahan: harga_bahan
                        }
                    }).then(function (response) {


                        console.log("RESPON DIBAWAH INI VVVVV");
                        console.log(response.data);
                    });
                }
            } else {
                alert("Gagal Masukan Layanan");
            }




            $http({
                method: 'POST',
                url: '../apidb/klinik/submit_rekam_medis.php',
                data: { idKunjungan: $routeParams.idkunjungan, idAntrian: $scope.idAntrian, idPasien: $routeParams.id, idDokter: $scope.iddokter, namaDokter: $scope.namadokter, amnese: $scope.amnese, diagnosa: $scope.diagnosa, cicilan: $scope.cicilan }
            }).then(function (response) {
                // on success
                if (response.status == 200) {

                    if ($scope.daftarLayanan.length != 0) {

                        alert("Input Rekam Medis Sukses");
                        $location.path("/home");
                    } else {
                        alert("Silahkan Input Layanan");
                    }
                }
            });




        } else {
            alert("Silahkan Lengkapi Data Rekam Medis");
        }
    };


});


app.controller("PerawatanCtrl", function ($scope, $cookies, $location, $interval, $http, $route, $timeout, $routeParams, $window) {
    var klinikCookie = $cookies.get('klinik');
    $scope.daftarObat = [];
    $scope.daftarLayanan = [];
    $scope.daftarKondisiGigi = [];
    $scope.daftarPerawatanInput = [];


    $scope.status = "Tidak Ada";
    $scope.warna = "#ffffff";

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





    //Kode Gambar Gigi Untuk Form Odontograma

    $scope.teethValue = 0;
    $scope.teethExplaination = "";
    $scope.urlTEETH = "";


    $http.get("../apidb/obat/list_data.php").then(function (response) {
        $scope.dataObat = response.data.event;
        console.log(response.data.event);
    });

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


    }, function (response) {

        // on error
        console.log(response.data, response.status);

    });


    $http({
        method: 'POST',
        url: '../apidb/kunjungan/get.php',
        data: { newId: $routeParams.idkunjungan }
    }).then(function (response) {


        // on success
        $scope.datakunjungan = response.data;
        $scope.namadokter = $scope.datakunjungan.dokter;
        $scope.iddokter = $scope.datakunjungan.id_dokter;
        $scope.idAntrian = $scope.datakunjungan.id_antrian;


    }, function (response) {

        // on error
        console.log(response.data, response.status);

    });



    $http.get("../apidb/layanan/list_data.php?id=" + klinikCookie).then(function (response) {
        $scope.dataLayanan = response.data.event;
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
            $scope.id = $scope.people.id;
            $scope.name = $scope.people.name;
            $scope.quantity = 1;
            $scope.satuan = $scope.people.satuan;
            $scope.harga = $scope.people.harga;

        }, function (response) {

            // on error
            console.log(response.data, response.status);

        });
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

    $scope.cancelFormObat = function () {

        $scope.shForm = false;
        $scope.id = "";
        $scope.name = "";
        $scope.quantity = "";
        $scope.satuan = "";
        $scope.harga = "";

    };

    $scope.cancelFormLayanan = function () {
        $scope.shFormLayanan = false;
        $scope.idLayanan = "";
        $scope.nameLayanan = "";
        $scope.bahanLayanan = "";
        $scope.harga_bahan = "";
        $scope.harga_koas = "";
        $scope.harga_drg = "";
        $scope.harga_drgsp = "";
    };

    $scope.submitForm = function () {
        var obj = { name: $scope.name, mid: $scope.id, quantity: $scope.quantity, satuan: $scope.satuan, harga: $scope.harga };
        //Jika array daftar obat kosong jangan lakukan apa2
        if ($scope.daftarObat.length != 0) {
            //Jika Data Obat Sudah ada maka cek apakah  ada nama obat  yang sama di array
            var index = $scope.daftarObat.map(function (item) {
                return item.name;
            }).indexOf($scope.name);
            //  Pakai ini untuk cek indexnya console.log("INDEX FIND " +  index);

            // Jika benar obat memang sudah ada kita ganti quantitynya 
            if (index != -1) {
                console.log("harus diganti");
                var hasil = parseInt($scope.daftarObat[index].quantity) + parseInt($scope.quantity);
                $scope.daftarObat[index].quantity = hasil;
            } else {
                $scope.daftarObat.push(obj);
            }

        } else {
            // Jika Belum ada obat maka buatlah data obatnya 
            $scope.daftarObat.push(obj);
        }
        $scope.shForm = false;
    };


    $scope.hapusdaftarObat = function (x) {
        //console.log("ID OBAT YANG DIMAKSUD "+ x);
        $scope.daftarObat.splice(x, 1);
    };

    $scope.hapusdaftarLayanan = function (x) {
        //console.log("ID OBAT YANG DIMAKSUD "+ x);
        $scope.daftarLayanan.splice(x, 1);
    };

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

    $scope.submitFormLayanan = function () {
        var obj = { name: $scope.nameLayanan, harga: $scope.harga_bahan, jasa: $scope.jasa, icd9: $scope.icd9 };
        if ($scope.daftarLayanan.length != 0) {

            //Jika Data Obat Sudah ada maka cek apakah  ada nama obat  yang sama di array
            var index = $scope.daftarLayanan.map(function (item) {
                return item.name;
            }).indexOf($scope.nameLayanan);

            // Jika benar obat memang sudah ada kita ganti quantitynya 
            if (index != -1) {
                console.log("harus diganti");
                var hasil = parseInt($scope.daftarLayanan[index].harga_bahan) + parseInt($scope.harga_bahan);
                $scope.daftarLayanan[index].harga_bahan = hasil;

                var hasilJasa = parseInt($scope.daftarLayanan[index].jasa) + parseInt($scope.jasa);
                $scope.daftarLayanan[index].jasa = hasilJasa;

            } else {
                $scope.daftarLayanan.push(obj);
                $scope.daftarPerawatanInput.push(obj.name);
            }

        } else {
            // Jika Belum ada obat maka buatlah data obatnya 
            $scope.daftarLayanan.push(obj);
            $scope.daftarPerawatanInput.push(obj.name);
        }
        // console.log( "PANJANG SCOPE"+$scope.daftarLayanan.length);

        // console.log("Nama Layanan Tersedia");
        // $scope.daftarLayanan.push(obj);
        // console.log( $scope.daftarLayanan);     
        $scope.shFormLayanan = false;
    };


    $scope.simpanData = function () {

        if ($scope.amnese, $scope.element_gigi_mulut, $scope.diagnosa, $scope.cicilan && ($scope.daftarLayanan.length != 0)) {


            $http({
                method: 'POST',
                url: '../apidb/klinik/submit_perawatan.php',
                data: { idAntrian: $routeParams.idkunjungan, idKlinik: klinikCookie, idPasien: $routeParams.id, idDokter: $scope.iddokter, namaDokter: $scope.namadokter, element: $scope.element_gigi_mulut, diagnosa: $scope.diagnosa, perawatan: JSON.stringify($scope.daftarPerawatanInput), icd10: $scope.icd10 }
            }).then(function (response) {
                // on success
                if (response.status == 200) {
                    console.log("input sukses");
                }
            });

           
            if ($scope.daftarObat.length != 0) {
                for (var i = 0; i < $scope.daftarObat.length; i++) {
                    // Memasukkan data obat ke database 
                    var id_obat = $scope.daftarObat[i].mid;
                    var quantity_obat = $scope.daftarObat[i].mid;
                    var harga_obat = $scope.daftarObat[i].harga;
                    var satuan_obat = $scope.daftarObat[i].satuan;
                    var nama_obat = $scope.daftarObat[i].name;
                    $http({
                        method: 'POST',
                        url: '../apidb/klinik/submit_obat_kunjungan.php',
                        data: {
                            idKunjungan: $routeParams.idkunjungan,
                            idPasien: $routeParams.id,
                            namaPasien: $scope.namaPasien,
                            idObat: id_obat,
                            namaObat: nama_obat,
                            hargaObat: harga_obat,
                            satuanObat: satuan_obat,
                            quantityObat: quantity_obat
                        }
                    }).then(function (response) {
                        // on success
                        if (response.status == 200) {

                        }
                    });
                }
            }
            
            if ($scope.daftarLayanan.length != 0) {
                for (var i = 0; i < $scope.daftarLayanan.length; i++) {
                    // Memasukkan data obat ke database 
                    var harga_bahan = $scope.daftarLayanan[i].harga;
                    var harga_layanan = $scope.daftarLayanan[i].jasa;
                    var nama_layanan = $scope.daftarLayanan[i].name;
                    $http({
                        method: 'POST',
                        url: '../apidb/klinik/submit_layanan_kunjungan.php',
                        data: {
                            idKunjungan: $routeParams.idkunjungan,
                            idPasien: $routeParams.id,
                            namaPasien: $scope.namaPasien,
                            namaLayanan: nama_layanan,
                            hargaLayanan: harga_layanan,
                            hargaBahan: harga_bahan
                        }
                    }).then(function (response) {


                        console.log("RESPON DIBAWAH INI VVVVV");
                        console.log(response.data);
                    });
                }
            } else {
                alert("Gagal Masukan Layanan");
            }




            $http({
                method: 'POST',
                url: '../apidb/klinik/submit_rekam_medis.php',
                data: { idKunjungan: $routeParams.idkunjungan, idAntrian: $scope.idAntrian, idPasien: $routeParams.id, idDokter: $scope.iddokter, namaDokter: $scope.namadokter, amnese: $scope.amnese, diagnosa: $scope.diagnosa, cicilan: $scope.cicilan }
            }).then(function (response) {
                // on success
                if (response.status == 200) {

                    if ($scope.daftarLayanan.length != 0) {

                        alert("Input Rekam Medis Sukses");
                        $location.path("/home");
                    } else {
                        alert("Silahkan Input Layanan");
                    }
                }
            });




        } else {
            alert("Silahkan Lengkapi Data Rekam Medis");
        }



    };

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



app.controller("EditRekamMedisCtrl", function ($scope, $interval, $http, $route, $timeout, $routeParams, $window) {

    $scope.idAntrian = "";
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


    }, function (response) {

        // on error
        console.log(response.data, response.status);

    });



    $http({
        method: 'POST',
        url: '../apidb/kunjungan/get.php',
        data: { newId: $routeParams.idkunjungan }
    }).then(function (response) {


        // on success
        $scope.datakunjungan = response.data;
        $scope.namadokter = $scope.datakunjungan.dokter;
        $scope.iddokter = $scope.datakunjungan.id_dokter;
        $scope.idAntrian = $scope.datakunjungan.id_antrian;

        //console.log($scope.datakunjungan.id_antrian);
    }, function (response) {

        // on error
        console.log(response.data, response.status);

    });


    console.log($scope.idAntrian);

    $http({
        method: 'POST',
        url: '../apidb/rekam_medis/get_perawatan.php',
        data: { newId: $scope.idAntrian }
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




















});

app.controller("SearchCtrl", function ($scope, $interval, $http, $route, $timeout, $routeParams, $window) {
    $scope.tab = 1;
    $scope.setTab = function (newTab) {
        $scope.tab = newTab;
    };
});
