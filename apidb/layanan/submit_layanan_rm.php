<?php
    require '../connect.php';
    $connect = connect();

    $id_kunjungan           = $_GET['id_kunjungan'];
    $id_pasien              = $_GET['id_pasien'];        
    $nama_pasien            = $_GET['nama_pasien'];    
    $nama_layanan           = $_GET['nama_layanan'];
    $harga_bahan            = $_GET['harga_bahan'];
    $harga_layanan          = $_GET['harga_layanan'];

    $sql = "INSERT INTO `tabel_layanan_kunjungan` (`id`,
                                                   `id_pasien`, 
                                                   `nama_pasien`,
                                                   `id_kunjungan`,
                                                   `id_antrian`, 
                                                   `nama_layanan`, 
                                                   `harga_bahan`, 
                                                   `harga_layanan`,
                                                   `status`)
             VALUES                               (NULL, 
                                                    '$id_pasien',
                                                    '$nama_pasien',
                                                    '$id_kunjungan',
                                                    '$id_antrian',
                                                    '$nama_layanan',
                                                    '$harga_bahan',
                                                    '$harga_layanan',
                                                    '1');";

    mysqli_query($connect,$sql);
?>