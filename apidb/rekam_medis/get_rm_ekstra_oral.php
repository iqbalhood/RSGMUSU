<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
$newId = $request->newId;
// Get the data
$people = array();

$sql = "SELECT * FROM `rm_ekstra_oral` WHERE `id_pasien` = '$newId' LIMIT 1";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {
    
      $people['tonus_bibir']                    = $row['tonus_bibir'];  
      $people['tmj']                            = $row['tmj']; 
      $people['kelenjar_limfe']                 = $row['kelenjar_limfe'];  
      $people['kelainan_tmj']                   = $row['kelainan_tmj'];
      $people['keterangan_ekstra_oral']         = $row['keterangan_ekstra_oral'];
	 
  }
}

$json = json_encode($people);
echo $json;
exit;