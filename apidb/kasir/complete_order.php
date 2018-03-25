<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);

    $idKunjungan         = preg_replace('/[^0-9 ]/','',$request->idKunjungan);
    
    if($idKunjungan  == '' ) return;
    
    $idKunjungan            = mysqli_real_escape_string($connect,$idKunjungan);

    $date = date('Y-m-d');
   

    $sql = "UPDATE `tabel_kunjugan` SET `status_pembayaran` = '2', `tanggal_pembayaran` = '$date' WHERE `tabel_kunjugan`.`id_kunjungan` =  '$idKunjungan' ;";

    mysqli_query($connect,$sql);

   // echo $sql;
    

}
exit;