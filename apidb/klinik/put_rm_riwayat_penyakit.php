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

    $penyakitJantung        = $request->penyakitJantung;
    $statusJantung          = $request->statusJantung;
    $keteranganJantung      = $request->keteranganJantung;

    $penyakitHipertensi     = $request->penyakitHipertensi;
    $statusHipertensi       = $request->statusHipetensi;
    $keteranganHipertensi   = $request->keteranganHipertensi;

    
    $sql = "INSERT INTO `rm_riwayat_penyakit` ( `id`, `id_kunjungan`, `id_antrian`, `id_pasien`, 
                                                `penyakit_jantung`, `status_jantung`, `keterangan_jantung`,
                                                `penyakit_hipertensi`, `status_hipertensi`, `keterangan_hipertensi`) 
    
                                                VALUES

                                              ( NULL, '$idKunjungan', '$idAntrian ', '$idPasien', 
                                                '$penyakitJantung', '$statusJantung', '$keteranganJantung',
                                                '$penyakitHipertensi', '$statusHipertensi', '$keteranganHipertensi');";


    mysqli_query($connect,$sql);
    

}
exit;