<?php
require '../connect.php';

$connect = connect();


    $id  = $_GET['id'];
    $bahan  = $_GET['bahan'];
    $layanan  = $_GET['layanan'];
    $icd  = $_GET['icd'];

    $sql = "UPDATE `tabel_layanan_kunjungan` SET `harga_bahan` = '$bahan',  `icd` = '$icd', `harga_layanan` = '$layanan' WHERE `tabel_layanan_kunjungan`.`id` = '$id';";

    mysqli_query($connect,$sql);
