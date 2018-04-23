<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
$newId = $request->newId;
// Get the data
$people = array();

$sql = "SELECT * FROM `rm_jaringan_lunak_mulut` WHERE `id_pasien` = '$newId' LIMIT 1";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {
    
      $people['kebersihan_mulut']                    = $row['kebersihan_mulut'];  
      $people['mukosa_bukal']                        = $row['mukosa_bukal']; 
      $people['kelainan_mukosa_bukal']               = $row['kelainan_mukosa_bukal'];  
      $people['mukosa_labial']                       = $row['mukosa_labial'];
      $people['kelainan_mukosa_labial']              = $row['kelainan_mukosa_labial'];
      $people['frenulum_labial']                     = $row['frenulum_labial'];
      $people['kelainan_frenulum_labial']            = $row['kelainan_frenulum_labial'];
      $people['lidah']                               = $row['lidah'];
      $people['kelainan_lidah']                      = $row['kelainan_lidah'];
      $people['palatum']                             = $row['palatum'];
      $people['kelainan_palatum']                    = $row['kelainan_palatum'];
      $people['tonsil']                              = $row['tonsil'];
      $people['kelainan_tonsil']                     = $row['kelainan_tonsil'];
      $people['dasar_mulut']                         = $row['dasar_mulut'];
      $people['kelainan_dasar_mulut']                = $row['kelainan_dasar_mulut'];
      $people['gingiva']                             = $row['gingiva'];
      $people['kelainan_gingiva']                    = $row['kelainan_gingiva'];
      $people['keterangan_jaringan_lunak_mulut']     = $row['keterangan_jaringan_lunak_mulut'];
	 
  }
}

$json = json_encode($people);
echo $json;
exit;