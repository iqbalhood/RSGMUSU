<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");



if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
 
    $idPasien                = $request->idPasien;

    $statusJantung           = $request->statusJantung;
    $keteranganJantung       = $request->keteranganJantung;

    $statusHipertensi        = $request->statusHipetensi;
    $keteranganHipertensi    = $request->keteranganHipertensi;

    $statusDiabetes          = $request->statusDiabetes;
    $keteranganDiabetes      = $request->keteranganDiabetes;

    $statusAlergi            = $request->statusAlergi;
    $keteranganAlergi        = $request->keteranganAlergi;

    $statusAsma              = $request->statusAsma;
    $keteranganAsma          = $request->keteranganAsma;

    $statusHepar             = $request->statusHepar;
    $keteranganHepar         = $request->keteranganHepar;

    $statusLambung           = $request->statusLambung;
    $keteranganLambung       = $request->keteranganLambung;

    $statusLain              = $request->statusLain;
    $keteranganLain          = $request->keteranganLain;


    $result = mysqli_query($connect,"SELECT * FROM `rm_riwayat_penyakit` WHERE `id_pasien` = '$idPasien'");

    if (mysqli_num_rows($result) > 0) {
    
                $sql ="UPDATE `rm_riwayat_penyakit` SET 
                
                `status_jantung` = '$statusJantung',
                `keterangan_jantung` = '$keteranganJantung', 
                
                `status_hipertensi` = '$statusHipertensi', 
                `keterangan_hipertensi` = '$keteranganHipertensi',
                
                `status_diabetes` = '$statusDiabetes',
                `keterangan_diabetes` = '$keteranganDiabetes', 
                
                `status_alergi` = '$statusAlergi', 
                `keterangan_alergi` = '$keteranganAlergi',
                
                `status_asma` = '$statusAsma', 
                `keterangan_asma` = '$keteranganAsma',
                    
                `status_hepar` = '$statusHepar',
                `keterangan_hepar` = '$keteranganHepar',
                    
                `status_lambung` = '$statusLambung', 
                `keterangan_lambung` = '$keteranganLambung',
                    
                `status_lain` = '$statusLain',
                `keterangan_lain` = '$keteranganLain'
                
                WHERE `rm_riwayat_penyakit`.`id_pasien` = $idPasien;";
    
        mysqli_query($connect,$sql);

    }else{


        $sql = "INSERT INTO `rm_riwayat_penyakit` ( `id`, `id_kunjungan`, `id_antrian`, `id_pasien`, 
        `status_jantung`, `keterangan_jantung`,
        `status_hipertensi`, `keterangan_hipertensi`,
        `status_diabetes`, `keterangan_diabetes`,
        `status_alergi`, `keterangan_alergi`,
        `status_asma`, `keterangan_asma`,
        `status_hepar`, `keterangan_hepar`,
        `status_lambung`, `keterangan_lambung`,
        `status_lain`, `keterangan_lain`) 

        VALUES

      ( NULL, '', '', '$idPasien', 
         '$statusJantung', '$keteranganJantung',
         '$statusHipertensi', '$keteranganHipertensi',
         '$statusDiabetes', '$keteranganDiabetes',
         '$statusAlergi', '$keteranganAlergi',
         '$statusAsma', '$keteranganAsma',
         '$statusHepar', '$keteranganHepar',
         '$statusLambung', '$keteranganLambung',
         '$statusLain', '$keteranganLain');";

        mysqli_query($connect,$sql);

    }




    
   


   
    

}
exit;