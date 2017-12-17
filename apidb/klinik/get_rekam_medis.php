<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
$newId = preg_replace('/[^0-9 ]/','',$request->newId);

// Get the data
$people = array();

$sql = "SELECT * FROM rekam_medis WHERE `id_kunjungan` = $newId";


if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {
    
    $people['id_kunjungan']             = $row['id_kunjungan'];
	  $people['id_pasien']                = $row['id_dokter'];
	  $people['nama_dokter']              = $row['nama_dokter'];
	  $people['amnese']                   = $row['amnese'];
	  $people['diagnosa']                 = $row['diagnosa'];
	 
           
  }
}

$json = json_encode($people);
echo $json;
exit;