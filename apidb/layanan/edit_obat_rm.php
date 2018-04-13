<?php
require '../connect.php';

$connect = connect();


    $id         = $_GET['id'];
    $nama       = $_GET['nama'];
    $quantity   = $_GET['quantity'];
    $harga      = $_GET['harga'];

    $sql = "UPDATE `tabel_obat_kunjungan` SET `nama_obat` = '$nama',  `quantity` = '$quantity', `harga` = '$harga' WHERE `tabel_obat_kunjungan`.`id` = '$id';";

    mysqli_query($connect,$sql);
