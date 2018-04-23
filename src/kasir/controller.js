
var app = angular.module('myApp.controller', []);

app.controller("HomeCtrl", function ($scope, $ngConfirm, $cookies, $interval, $http, $route, $timeout, $routeParams, $window) {

    $http.get("../apidb/kunjungan/list_data_kasir.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
    });

    $scope.hapusTagihan = function(x){

        //alert("tagihan --- > "+x.id_kunjungan);



        $http.get("../apidb/kasir/hapus_data_tagihan.php?id="+x.id_kunjungan).then(function (response) {
         
            if (!response.data.event) {
                $ngConfirm('Data Sudah Dihapus');
                $route.reload();
            } else {
                $ngConfirm('There Is Some Problem');
                $route.reload();
            }
        });

    }




    setTimeout(function () {
        $('#mytableOrder').dataTable({
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

app.controller("CicilanCtrl", function ($scope, $cookies, $interval, $http, $route, $timeout, $routeParams, $window) {

    $http.get("../apidb/kunjungan/list_data_cicilan_kasir.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
    });


    $scope.hapusTagihan = function(x){

        //alert("tagihan --- > "+x.id_kunjungan);



        $http.get("../apidb/kasir/hapus_data_tagihan.php?id="+x.id_kunjungan).then(function (response) {
         
            if (!response.data.event) {
                $ngConfirm('Data Sudah Dihapus');
                $route.reload();
            } else {
                $ngConfirm('There Is Some Problem');
                $route.reload();
            }
        });

    }

    setTimeout(function () {
        $('#mytableOrder').dataTable({
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

app.controller("HistoriCtrl", function ($scope, $interval, $http, $route, $timeout, $routeParams, $window, $location, $window, Excel) {

    $scope.cekTanggal = function () {
        alert("WOW KEEREEEENNN");
    };

    $http.get("../apidb/kunjungan/list_data_kasir_sudah_bayar.php").then(function (response) {
        $scope.myData = response.data.event;
        console.log(response.data.event);
        $scope.tabel_normal = true;
    });


    $scope.search = function () {
        console.log("==============>> SEARCH <<==================");
        console.log("ID KLINIK " + $scope.idklinik);
        $scope.myData = [];
        console.log($scope.tglawal + " -- " + $scope.tglakhir);

        if (($scope.tglawal != 'Invalid Date') && ($scope.tglakhir != 'Invalid Date')) {


            $http.get("../apidb/kunjungan/list_data_kasir_sudah_bayar_search.php?tawal=" + $scope.tglawal + "&takhir=" + $scope.tglakhir + "&klinik=" + $scope.idklinik + "&status=" + $scope.carabayar).then(function (response) {
                $scope.myData = response.data.event;
                console.log(response.data);
                //$('#mytableOrder').reload;
                // $('#mytableOrder').DataTable().ajax.reload();
                $scope.tabel_normal = false;
                $scope.tabel_cari = true;

            });






            //    // alert(" TANGGAL Bener");

            //     if($scope.idklinik){


            //         if($scope.carabayar){


            //         }
            //     }

        } else {
            alert("Mohon Tentukan Tanggal Awal dan Tanggal Akhir Pencarian ")
        }


    };


    $scope.refresh = function () {
        $route.reload();
    }

    $scope.exportExcel = function () {

        var exportHref = Excel.tableToExcel('#tableEX', 'WireWorkbenchDataExport');
        $timeout(function () { location.href = exportHref; }, 100); // trigger download

    }

    setTimeout(function () {
        $('#mytableOrder').dataTable({
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

app.controller("InvoiceCtrl", function ($scope, $ngConfirm, $cookies, $interval, $http, $route, $timeout, $routeParams, $window) {


    console.log("ID PASIEN" + $routeParams.id);
    console.log("ID KUNJUNGAN" + $routeParams.idkunjungan);

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
            contentUrl: '../form/edit_layanan.html',
            scope: $scope,
            buttons: {
                sayBoo: {
                    text: 'Submit',
                    btnClass: 'btn-green',
                    action: function (scope, button) {
                        console.log("========LAYANAN UBAH========")
                        $http.get("../apidb/layanan/edit_layanan_rm.php?id=" + w.id + "&bahan=" + $scope.harga_bahan_edit + "&layanan=" + $scope.harga_layanan_edit).then(function (response) {
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

app.controller("InvoiceCicilanCtrl", function ($scope, $ngConfirm, $location, $cookies, $interval, $http, $route, $timeout, $routeParams, $window) {

    $scope.rekam_medis_pay = 0;
    console.log("ID PASIEN" + $routeParams.id);
    console.log("ID KUNJUNGAN" + $routeParams.idkunjungan);



    $scope.idKunjungan = $routeParams.idkunjungan;
    $scope.idPasien = $routeParams.id;

    $scope.getTotal = 0;
    $scope.getTotalLayanan = 0;
    $scope.getTotalCicilan = 0;

    $scope.urlPrint = "../print/print-invoice-cicilan.php?pasien=" + $scope.idPasien + "&kunjungan=" + $scope.idKunjungan;
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
        console.log("Dokternya " + $scope.namadokter);


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


    $http.get("../apidb/kasir/list_data_cicilan.php?id=" + $scope.idKunjungan).then(function (response) {
        if (!response.data.event) {
            console.log("Data Layanan Kosong");
        } else {
            $scope.myDataCicilan = response.data.event;
            console.log("CICILAN");
            console.log(response.data.event);
            for (var i = 0; i < $scope.myDataCicilan.length; i++) {

                $scope.getTotalCicilan += ($scope.myDataCicilan[i].biaya * 1);
            }
            console.log(response.data.event);
        }
    });

    $scope.showFormCicilan = function () {
        $scope.formCicilan = true;
    }

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

    $scope.submitCicilan = function () {
        $http({
            method: 'POST',
            url: '../apidb/kasir/submit_cicilan.php',
            data: { idKunjungan: $routeParams.idkunjungan, pembayaran: $scope.pembayaran, keterangan: $scope.keterangan, tglpembayaran: $scope.tglpembayaran }
        }).then(function (response) {
            // on success
            if (response.status == 200) {
                $route.reload();
                alert("Cicilan Telah Dibayar");
                $scope.formCicilan = false;
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

        console.log("========LAYANAN========")
        console.log(w);
        $ngConfirm({
            title: 'Ubah Layanan',
            contentUrl: '../form/edit_layanan.html',
            scope: $scope,
            buttons: {
                sayBoo: {
                    text: 'Submit',
                    btnClass: 'btn-green',
                    action: function (scope, button) {
                        console.log("========LAYANAN UBAH========")
                        $http.get("../apidb/layanan/edit_layanan_rm.php?id=" + w.id + "&bahan=" + $scope.harga_bahan_edit + "&layanan=" + $scope.harga_layanan_edit).then(function (response) {
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
    };

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

app.controller("BodyCtrl", function ($scope, $cookies, $window) {
    var usernameCookie = $cookies.get('username');
    var aksesCookie = $cookies.get('akses');

    console.log("COOKIES GET USRE" + usernameCookie);
    console.log("COOKIES GET AKSES" + aksesCookie);

    $scope.user = usernameCookie;
    $scope.akses = aksesCookie;


    $scope.logout = function () {
        $window.location.href = "index.html";
    };
});

