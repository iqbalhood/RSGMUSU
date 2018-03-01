<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");



if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
 
    $idKunjungan            = $request->idKunjungan;
    $idAntrian              = $request->idAntrian;
    $idPasien               = $request->idPasien;
    $keterangan             = $request->keterangan;

    
    $sql = "INSERT INTO `ondontograma` (`id`, `id_kunjungan`, `id_antrian`, `id_pasien`, `keterangan`)
             VALUES (NULL, '$idKunjungan', '$idAntrian', '$idPasien', '$keterangan');";


    mysqli_query($connect,$sql);
    

}
exit;