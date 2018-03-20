<?php
require '../connect.php';

$connect = connect();
$id = $_GET['id'];
// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
    
    $newName  		= preg_replace('/[^a-zA-Z ]/','',$request->newName);
	$newBahan 		= preg_replace('/[^a-zA-Z ]/','',$request->newBahan);
	$newHargabahan 	= preg_replace('/[^0-9 ]/','',$request->newHargabahan);
	$newHargakoas 	= preg_replace('/[^0-9 ]/','',$request->newHargakoas);
	$newHargappdgs 	= preg_replace('/[^0-9 ]/','',$request->newHargappdgs);
	$newHargadrg 	= preg_replace('/[^0-9 ]/','',$request->newHargadrg);
	$newHargadrgsp 	= preg_replace('/[^0-9 ]/','',$request->newHargadrgsp);
    
    if($newName  == '' || $newBahan == '' || $newHargabahan == '' || $newHargakoas == '' || $newHargappdgs == '' || $newHargadrg == '' || $newHargadrgsp == '' ) return;
    
    $newName  		= mysqli_real_escape_string($connect,$newName);
	$newBahan  		= mysqli_real_escape_string($connect,$newBahan);
    $newHargabahan 	= mysqli_real_escape_string($connect,$newHargabahan);
	$newHargakoas 	= mysqli_real_escape_string($connect,$newHargakoas);
	$newHargappdgs 	= mysqli_real_escape_string($connect,$newHargappdgs);
	$newHargadrg 	= mysqli_real_escape_string($connect,$newHargadrg);
	$newHargadrgsp 	= mysqli_real_escape_string($connect,$newHargadrgsp);

    $sql = "INSERT INTO `data_layanan` (`id`, `layanan`,`bahan`,`harga_bahan`,`idklinik`,`harga_koas`, `harga_ppdgs`,`harga_drg`,`harga_drgsp`) VALUES (NULL, '$newName', '$newBahan', '$newHargabahan','$id', '$newHargakoas', '$newHargappdgs','$newHargadrg','$newHargadrgsp')";

    mysqli_query($connect,$sql);
    

}
exit;