<?php
require '../connect.php';

$connect = connect();

// Delete record by id.
$postdata = $_GET['id'];
if(isset($postdata) && !empty($postdata))
{
    $id  = $postdata;

    $sql = "DELETE FROM `tabel_kunjugan` WHERE `tabel_kunjugan`.`id_kunjungan` = '$id'";
    $sql2 = "DELETE FROM `tabel_layanan_kunjungan` WHERE `tabel_layanan_kunjungan`.`id_kunjungan` = '$id'";
    $sql3 = "DELETE FROM `tabel_obat_kunjungan` WHERE `tabel_obat_kunjungan`.`id_kunjungan` = '$id'";

 //   echo $sql;

    mysqli_query($connect,$sql);
    mysqli_query($connect,$sql2);
    mysqli_query($connect,$sql3);
    
}