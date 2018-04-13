<?php
    require '../connect.php';
    $connect = connect();

    $id_kunjungan           = $_GET['id_kunjungan'];
    $id_pasien              = $_GET['id_pasien'];        
    $nama_pasien            = $_GET['nama_pasien']; 
    $id_obat                = $_GET['id_obat'];   
    $nama_obat              = $_GET['nama_obat'];
    $harga_obat             = $_GET['harga_obat'];
    $satuan_obat            = $_GET['satuan_obat'];
    $quantity_obat          = $_GET['quantity_obat'];

    $sql = "INSERT INTO `tabel_obat_kunjungan` (`id`,
                                                `id_pasien`, 
                                                `nama_pasien`, 
                                                `id_kunjungan`,
                                                `id_antrian`, 
                                                `id_obat`,
                                                `nama_obat`, 
                                                `satuan`, 
                                                `quantity`, 
                                                `harga`, 
                                                `status`)
                                        VALUES (NULL,
                                                '$id_pasien', 
                                                '$nama_pasien', 
                                                '$id_kunjungan', 
                                                '', 
                                                '$id_obat', 
                                                '$nama_obat', 
                                                '$satuan_obat', 
                                                '$quantity_obat', 
                                                '$harga_obat', 
                                                '1');";

    mysqli_query($connect,$sql);
?>