<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);

    $idKunjungan         = preg_replace('/[^0-9 ]/','',$request->idKunjungan);
    $idKlinik            = preg_replace('/[^0-9 ]/','',$request->idKlinik);
    $dokterPendamping    = preg_replace('/[^a-zA-Z ]/','',$request->dokterPendamping);
    $idDokter            = preg_replace('/[^0-9 ]/','',$request->idDokter);
    $idPasien            = preg_replace('/[^0-9 ]/','',$request->idPasien);
    
    if($idKunjungan  == '' ||  $idKlinik == ''  ||  $dokterPendamping == ''  ||  $idDokter == '' ||  $idPasien == ''  ) return;
    
    $idKunjungan            = mysqli_real_escape_string($connect,$idKunjungan);
    $idKlinik               = mysqli_real_escape_string($connect,$idKlinik);
    $dokterPendamping       = mysqli_real_escape_string($connect,$dokterPendamping);
    $idDokter               = mysqli_real_escape_string($connect,$idDokter);
    $idPasien               = mysqli_real_escape_string($connect,$idPasien);

    $sql = "INSERT INTO `tabel_kunjugan` (`id_kunjungan`, `id_klinik`, `dokter_pendamping`, `id_dokter`, `id_pasien`) VALUES ('$idKunjungan', '$idKlinik', '$dokterPendamping', '$idDokter', '$idPasien');";

    mysqli_query($connect,$sql);
    

}
exit;