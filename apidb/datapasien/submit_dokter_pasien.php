<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);

    $idKunjungan         = preg_replace('/[^0-9 ]/','',$request->idKunjungan);
    $dokterPendamping    = $request->dokterPendamping;
    $dokterPraktisi      = $request->dokterPraktisi;
    
    
    $sql = "UPDATE `tabel_kunjugan` SET `dokter_pendamping` = '$dokterPendamping', `id_dokter` = '$dokterPraktisi', `status` = '1' WHERE `tabel_kunjugan`.`id_kunjungan` = '$idKunjungan'    ";

    //echo $sql;
    mysqli_query($connect,$sql);
    

}
exit;