<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");



if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
 
    $idKunjungan         = $request->idKunjungan;
    $idAntrian           = $request->idAntrian;
    $idPasien            = $request->idPasien;
    $penyakitJantung     = $request->penyakitJantung;
    $statusJantung       = $request->statusJantung;
    $keteranganJantung   = $request->keteranganJantung;

    
    $sql = "INSERT INTO `rm_riwayat_penyakit` (`id`, `id_kunjungan`, `id_antrian`, `id_pasien`, `penyakit_jantung`, `status_jantung`, `keterangan_jantung`) 
    
                                                VALUES

                                              (NULL, '$idKunjungan', '$idAntrian ', '$idPasien', '$penyakitJantung', '$statusJantung', '$keteranganJantung');";


    mysqli_query($connect,$sql);
    

}
exit;