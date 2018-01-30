<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
 
    $idAntrian      = $request->idAntrian;
    $idPasien       = $request->idPasien;
    $idKlinik       = $request->idKlinik;
    $element        = $request->element;
    $diagnosa       = $request->diagnosa;
    $perawatan      = $request->perawatan;
    $idDokter       = $request->idDokter;
    $namaDokter     = $request->namaDokter;
    $icd10          = $request->icd10;

    
    $sql = "INSERT INTO `perawatan` (`id`, `id_pasien`, `id_antrian`, `id_klinik`, `element`, `diagnosa`, `perawatan`, `id_dokter`, `nama_dokter`, `icd10`) 
           VALUES (NULL, '$idPasien', '$idAntrian', '$idKlinik', '$element', '$diagnosa', '$perawatan', '$idDokter', '$namaDokter', '$icd10');";


    mysqli_query($connect,$sql);
    

}
exit;