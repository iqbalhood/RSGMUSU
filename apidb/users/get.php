<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
$newId = preg_replace('/[^0-9 ]/','',$request->newId);
// Get the data
$people = array();

$sql = "SELECT * FROM dca_users WHERE `id` = $newId";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {
      $people['id']             = $row['id'];
      $people['username']           = $row['username'];
      $people['password']          = $row['password'];
      $people['akses']  			= $row['akses']; 	  
  }
}

$json = json_encode($people);
echo $json;
exit;