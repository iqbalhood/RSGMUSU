<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
$newId = preg_replace('/[^0-9 ]/','',$request->newId);

// Get the data
$people = array();

$sql = "SELECT * FROM `rm_tanda_vital` WHERE `id_kunjungan` = $newId";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {

      $people['kesadaran']                 = $row['kesadaran'];
      $people['kondisi_umum']             = $row['kondisi_umum'];
      $people['tekanan_darah']             = $row['tekanan_darah'];
      $people['denyut_nadi']             = $row['denyut_nadi'];
      $people['pernafasan']             = $row['pernafasan'];
      $people['suhu']             = $row['suhu'];
	 
           
  }
}

$json = json_encode($people);
echo $json;
exit;