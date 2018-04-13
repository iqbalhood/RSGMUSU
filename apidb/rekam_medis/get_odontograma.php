<?php
require '../connect.php';
error_reporting(0);
$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
$newId = $request->newId;

// Get the data
$people = array();

$sql = "SELECT * FROM `ondontograma` WHERE `id_pasien` = '$newId'";


if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {
    
      $people['keterangan']                 = $row['keterangan'];
	 
           
  }
}

$json = json_encode($people);
echo $json;
exit;