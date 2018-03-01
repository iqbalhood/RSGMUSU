<?php
require '../connect.php';

$connect = connect();

// Delete record by id.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);

    $id  = $request->recordId;

    $sql = "DELETE FROM `data_pasien` WHERE `no_rekam_medis` = '$id' LIMIT 1";

    echo $sql;

    mysqli_query($connect,$sql);
}