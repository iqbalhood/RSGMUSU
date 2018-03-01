<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
$newId = preg_replace('/[^0-9 ]/','',$request->newId);

// Get the data
$people = array();

$sql = "SELECT * FROM `rm_riwayat_penyakit` WHERE `id_kunjungan` = $newId";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {

      $people['status_jantung']                 = $row['status_jantung'];
	  $people['keterangan_jantung']             = $row['keterangan_jantung'];
	  $people['status_hipertensi']              = $row['status_hipertensi'];
	  $people['keterangan_hipertensi']          = $row['keterangan_hipertensi'];
	  $people['status_diabetes']                = $row['status_diabetes'];
	  $people['keterangan_diabetes']            = $row['keterangan_diabetes'];
	  $people['status_alergi']                  = $row['status_alergi'];
	  $people['keterangan_alergi']              = $row['keterangan_alergi'];
	  $people['status_asma']                    = $row['status_asma'];
	  $people['keterangan_asma']                = $row['keterangan_asma'];
	  $people['status_hepar']                   = $row['status_hepar'];
	  $people['keterangan_hepar']               = $row['keterangan_hepar'];
	  $people['status_lambung']                 = $row['status_lambung'];
	  $people['keterangan_lambung']             = $row['keterangan_lambung'];
	  $people['status_lain']                    = $row['status_lain'];
	  $people['keterangan_lain']                = $row['keterangan_lain'];
	 
           
  }
}

$json = json_encode($people);
echo $json;
exit;