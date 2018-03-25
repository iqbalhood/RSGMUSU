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
    $newRekamMedis       = $request->newRekamMedis;
    $dokterPendamping    = $request->dokterPendamping;
    $idDokter            = $request->idDokter;
    $idPasien            = $request->idPasien;
    
    if($idKunjungan  == '' ||  $idAntrian  == '' || $idKlinik == ''  ||  $idPasien == ''  ) return;
    $idKunjungan            = mysqli_real_escape_string($connect,$idKunjungan);
    $idAntrian              = mysqli_real_escape_string($connect,$idAntrian);
    $idKlinik               = mysqli_real_escape_string($connect,$idKlinik);
    $dateSQL                = date("Y-m-d");
   
    $sql = "INSERT INTO `tabel_kunjugan` (`id_kunjungan`,`id_antrian`, `id_klinik`, `dokter_pendamping`, `id_dokter`, `id_pasien`, `status`, `status_pembayaran`, `tanggal_pembayaran`, `biaya_rekam_medis`, `tanggal_kunjungan`) VALUES ('$idKunjungan', '$idAntrian', '$idKlinik', '$dokterPendamping', '$idDokter', '$idPasien','0','1', '0000-00-00', '$newRekamMedis', '$dateSQL');";

    echo $sql;
    mysqli_query($connect,$sql);
    

}
exit;