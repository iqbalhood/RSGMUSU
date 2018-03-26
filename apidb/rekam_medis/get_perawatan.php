<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
$newId = preg_replace('/[^0-9 ]/','',$request->newId);
// Get the data
$people = array();

$sql = "SELECT * FROM `perawatan` WHERE `id_antrian` = '1520919814815'";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {
    
      $people['element']            = $row['element'];        
	  $people['diagnosa']           = $row['diagnosa']; 
	  $people['icd10']              = $row['icd10']; 	
	 
  }
}

$json = json_encode($people);
echo $json;
exit;