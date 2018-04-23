<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");



if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);

    $idPasien               = $request->idPasien;

    $kesadaran              = $request->kesadaran;
    $kondisiUmum            = $request->kondisiUmum;
    $tekananDarah           = $request->tekananDarah;

    $denyutNadi             = $request->denyutNadi;
    $pernafasan             = $request->pernafasan;
    $suhu                   = $request->suhu;

    $result = mysqli_query($connect,"SELECT * FROM `rm_tanda_vital` WHERE `id_pasien` = '$idPasien'");

    if (mysqli_num_rows($result) > 0) {

        $sql="UPDATE `rm_tanda_vital` SET 
                    `kesadaran` = '$kesadaran', 
                    `kondisi_umum` = '$kondisiUmum', 
                    `tekanan_darah` = '$tekananDarah',
                    `denyut_nadi` = '$denyutNadi', 
                    `pernafasan` = '$pernafasan',
                    `suhu` = '$suhu'
                     WHERE `rm_tanda_vital`.`id_pasien` = '$idPasien' ;";

        mysqli_query($connect,$sql);
   
    }else{

        $sql = "INSERT INTO `rm_tanda_vital` (`id`, `id_kunjungan`, `id_antrian`, `id_pasien`, `kesadaran`, `kondisi_umum`, `tekanan_darah`, `denyut_nadi`, `pernafasan`, `suhu`)
                                         VALUES 
                                        (NULL, '', '', '$idPasien', '$kesadaran', '$kondisiUmum', '$tekananDarah', '$denyutNadi', '$pernafasan', '$suhu');";


        mysqli_query($connect,$sql);

    }


    
    
    

}
exit;