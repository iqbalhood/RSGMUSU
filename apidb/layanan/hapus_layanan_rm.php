<?php
require '../connect.php';

$connect = connect();


    $id  = $_GET['id'];

    $sql = "DELETE FROM `tabel_layanan_kunjungan` WHERE `id` = '$id' LIMIT 1";

    mysqli_query($connect,$sql);
