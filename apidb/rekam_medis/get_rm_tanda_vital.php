<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
$newId = $request->newId;
// Get the data
$people = array();

// if(isset($postdata) && !empty($postdata))
// {
//     $request  = json_decode($postdata);
 
//     $idKunjungan            = $request->idKunjungan;
//     $idAntrian              = $request->idAntrian;
//     $idPasien               = $request->idPasien;

//     $kesadaran              = $request->kesadaran;
//     $kondisiUmum            = $request->kondisiUmum;
//     $tekananDarah           = $request->tekananDarah;

//     $denyutNadi             = $request->denyutNadi;
//     $pernafasan             = $request->pernafasan;
//     $suhu                   = $request->suhu;

    
//     $sql = "INSERT INTO `rm_tanda_vital` (`id`, `id_kunjungan`, `id_antrian`, `id_pasien`, `kesadaran`, `kondisi_umum`, `tekanan_darah`, `denyut_nadi`, `pernafasan`, `suhu`)
//                                          VALUES 
//                                         (NULL, '$idKunjungan', '$idAntrian', '$idPasien', '$kesadaran', '$kondisiUmum', '$tekananDarah', '$denyutNadi', '$pernafasan', '$suhu');";


//     mysqli_query($connect,$sql);
    

// }
// exit;

$sql = "SELECT * FROM `rm_tanda_vital` WHERE `id_pasien` = '$newId' LIMIT 1";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {
    
      $people['status_jantung']            = $row['status_jantung'];  
      $people['keterangan_jantung']        = $row['keterangan_jantung']; 

      $people['status_hipertensi']         = $row['status_hipertensi'];  
      $people['keterangan_hipertensi']     = $row['keterangan_hipertensi'];  

      $people['status_diabetes']           = $row['status_diabetes']; 
      $people['keterangan_diabetes']       = $row['keterangan_diabetes']; 

      $people['status_alergi']             = $row['status_alergi'];  
      $people['keterangan_alergi']         = $row['keterangan_alergi'];  

      $people['status_asma']               = $row['status_asma'];  
      $people['keterangan_asma']           = $row['keterangan_asma'];  

      $people['status_hepar']              = $row['status_hepar'];  
      $people['keterangan_hepar']          = $row['keterangan_hepar'];  

      $people['status_lambung']            = $row['status_lambung'];  
      $people['keterangan_lambung']        = $row['keterangan_lambung'];  


      $people['status_lain']              = $row['status_lain'];  
      $people['keterangan_lain']          = $row['keterangan_lain']; 
	 
  }
}

$json = json_encode($people);
echo $json;
exit;