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

    $kesadaran              = $request->kesadaran;
    $kondisiUmum            = $request->kondisiUmum;
    $tekananDarah           = $request->tekananDarah;

    $denyutNadi             = $request->denyutNadi;
    $pernafasan             = $request->pernafasan;
    $suhu                   = $request->suhu;

    
    $sql = "INSERT INTO `rm_tanda_vital` (`id`, `id_kunjungan`, `id_antrian`, `id_pasien`, `kesadaran`, `kondisi_umum`, `tekanan_darah`, `denyut_nadi`, `pernafasan`, `suhu`)
                                         VALUES 
                                        (NULL, '$idKunjungan', '$idAntrian', '$idPasien', '$kesadaran', '$kondisiUmum', '$tekananDarah', '$denyutNadi', '$pernafasan', '$suhu');";


    mysqli_query($connect,$sql);
    

}
exit;