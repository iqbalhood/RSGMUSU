<?php
require '../connect.php';

$connect = connect();


    $id  = $_GET['id'];

    $sql = "DELETE FROM `tabel_obat_kunjungan` WHERE `id` = '$id' LIMIT 1";

    mysqli_query($connect,$sql);
