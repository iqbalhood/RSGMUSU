<?php
require '../connect.php';
$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request        = json_decode($postdata);
    $idKunjungan    = $request->idKunjungan;
    $idPasien       = $request->idPasien;
    $idDokter       = $request->idDokter;
    $namaDokter     = $request->namaDokter;
    $amnese         = $request->amnese;
    $diagnosa       = $request->diagnosa;
 
    if($idKunjungan  == '' ||  $idPasien == '' || $amnese  == '' || $diagnosa  == '' ) return;
    $sql = "INSERT INTO `rekam_medis` (`id_kunjungan`, `id_pasien`, `id_dokter`, `nama_dokter`, `amnese`, `diagnosa`) VALUES ('$idKunjungan ', '$idPasien', '$idDokter', '$namaDokter', '$amnese', '$diagnosa');";

    mysqli_query($connect,$sql);
}
exit;