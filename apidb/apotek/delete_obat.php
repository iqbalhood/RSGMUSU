<?php
require '../connect.php';

$connect = connect();

// Delete record by id.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);

    $id  = (int)$request->recordId;

    $sql = "DELETE FROM `tabel_obat_kunjungan` WHERE `id` = '$id' LIMIT 1";

    mysqli_query($connect,$sql);
}