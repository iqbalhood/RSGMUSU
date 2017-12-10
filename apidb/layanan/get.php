<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
$newId = preg_replace('/[^0-9 ]/','',$request->newId);
// Get the data
$people = array();

$sql = "SELECT * FROM data_layanan WHERE `id` = $newId";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {
      $people['id']             = $row['id'];
      $people['layanan']           = $row['layanan'];        
	  $people['bahan']  = $row['bahan']; 
	  $people['harga_bahan']  = $row['harga_bahan']; 	
	  $people['harga_koas']  = $row['harga_koas']; 
	  $people['harga_drg']  = $row['harga_drg']; 
	  $people['harga_drgsp']  = $row['harga_drgsp']; 
  }
}

$json = json_encode($people);
echo $json;
exit;