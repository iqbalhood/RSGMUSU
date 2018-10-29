<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  				= json_decode($postdata);
	$id_antrian 			= $request->id_antrian;   
	$id_kunjungan 			= $request->id_kunjungan;   
	$element 			    = $request->element;
	$diagnosa 			    = $request->diagnosa;
	$icd10 		            = $request->icd10;
    $amnese 		        = $request->amnese;
   

    $sql = "UPDATE `perawatan` SET `element` = '$element', `diagnosa` = '$diagnosa',  `icd10` = '$icd10' WHERE `id_antrian` = '$id_antrian'";
    $sql1 = "UPDATE `rekam_medis` SET `diagnosa` = '$diagnosa',  `amnese` = '$amnese' WHERE `id_kunjungan` = '$id_kunjungan'";

	mysqli_query($connect,$sql);
	mysqli_query($connect,$sql1);
}
exit;