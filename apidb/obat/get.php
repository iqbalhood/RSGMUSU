<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
$newId = preg_replace('/[^0-9 ]/','',$request->newId);
// Get the data
$people = array();

$sql = "SELECT id, nama, quantity, satuan, harga FROM data_obat WHERE `id` = $newId";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {
      $people['id']             = $row['id'];
      $people['name']           = $row['nama'];
      $people['quantity']          = $row['quantity'];
      $people['satuan']  = $row['satuan'];   
	  $people['harga']  = $row['harga']; 	  
  }
}

$json = json_encode($people);
echo $json;
exit;