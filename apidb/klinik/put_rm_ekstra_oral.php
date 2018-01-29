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

    $tonusBibir             = $request->tonusBibir;
    $tmj                    = $request->tmj;

    $kelainanTmj            = $request->kelainanTmj;
    $kelenjarLimfe          = $request->kelenjarLimfe;
    $keteranganEkstraOral   = $request->keteranganEkstraOral;

    
    $sql = "INSERT INTO `rm_ekstra_oral` ( `id`, `id_kunjungan`, `id_antrian`, `id_pasien`, 
                                                `tonus_bibir`, `tmj`,`kelainan_tmj`,`kelenjar_limfe`,
                                                `keterangan_ekstra_oral`) 
    
                                                VALUES

                                              ( NULL, '$idKunjungan', '$idAntrian ', '$idPasien', 
                                                '$tonusBibir', '$tmj', '$kelainanTmj','$kelenjarLimfe',
                                                '$keteranganEkstraOral');";


    mysqli_query($connect,$sql);
    

}
exit;