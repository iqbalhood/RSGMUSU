<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);

    $idKunjungan         = preg_replace('/[^0-9 ]/','',$request->idKunjungan);
    $idAntrian           = preg_replace('/[^0-9 ]/','',$request->idAntrian);    
    $idKlinik            = preg_replace('/[^0-9 ]/','',$request->idKlinik);
    $dokterPendamping    = preg_replace('/[^a-zA-Z ]/','',$request->dokterPendamping);
    $idDokter            = preg_replace('/[^0-9 ]/','',$request->idDokter);
    $idPasien            = $request->idPasien;
    
    if($idKunjungan  == '' ||  $idAntrian  == '' || $idKlinik == ''  ||  $dokterPendamping == ''  ||  $idDokter == '' ||  $idPasien == ''  ) return;
    
    $idKunjungan            = mysqli_real_escape_string($connect,$idKunjungan);
    $idAntrian              = mysqli_real_escape_string($connect,$idAntrian);
    $idKlinik               = mysqli_real_escape_string($connect,$idKlinik);
    $dokterPendamping       = mysqli_real_escape_string($connect,$dokterPendamping);
    $idDokter               = mysqli_real_escape_string($connect,$idDokter);
   

    $sql = "INSERT INTO `tabel_kunjugan` (`id_kunjungan`,`id_antrian`, `id_klinik`, `dokter_pendamping`, `id_dokter`, `id_pasien`, `status`) VALUES ('$idKunjungan', '$idAntrian', '$idKlinik', '$dokterPendamping', '$idDokter', '$idPasien','1');";

    mysqli_query($connect,$sql);
    

}
exit;