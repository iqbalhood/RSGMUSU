<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");



if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);

    $idPasien               = $request->idPasien;
    $tonusBibir             = $request->tonusBibir;
    $tmj                    = $request->tmj;
    $kelainanTmj            = $request->kelainanTmj;
    $kelenjarLimfe          = $request->kelenjarLimfe;
    $keteranganEkstraOral   = $request->keteranganEkstraOral;


    $result = mysqli_query($connect,"SELECT * FROM `rm_ekstra_oral` WHERE `id_pasien` = '$idPasien'");

    if (mysqli_num_rows($result) > 0) {

      $sql = "UPDATE `rm_ekstra_oral` SET 
                `tonus_bibir`             = '$tonusBibir',
                `tmj`                     = '$tmj',
                `kelenjar_limfe`          = '$kelenjarLimfe',
                `kelainan_tmj`            = '$kelainanTmj',
                `keterangan_ekstra_oral`  = '$keteranganEkstraOral' 
                WHERE `rm_ekstra_oral`.`id_pasien` = '$idPasien';";

      mysqli_query($connect,$sql);  
    }else{

      $sql = "INSERT INTO `rm_ekstra_oral` ( `id`, `id_kunjungan`, `id_antrian`, `id_pasien`, 
      `tonus_bibir`, `tmj`,`kelainan_tmj`,`kelenjar_limfe`,
      `keterangan_ekstra_oral`) 
      VALUES
      ( NULL, '', '', '$idPasien', 
      '$tonusBibir', '$tmj', '$kelainanTmj','$kelenjarLimfe',
      '$keteranganEkstraOral');";

      mysqli_query($connect,$sql);
    }

    
   
    

}
exit;