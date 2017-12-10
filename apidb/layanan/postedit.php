<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
    $newId  = preg_replace('/[^0-9 ]/','',$request->newId);    
    $newName  = preg_replace('/[^a-zA-Z ]/','',$request->newName);
	$newBahan = preg_replace('/[^a-zA-Z ]/','',$request->newBahan);    
	$newHargabahan = preg_replace('/[^0-9 ]/','',$request->newHargabahan);
	$newHargakoas = preg_replace('/[^0-9 ]/','',$request->newHargakoas);
	$newHargadrg = preg_replace('/[^0-9 ]/','',$request->newHargadrg);
	$newHargadrgsp = preg_replace('/[^0-9 ]/','',$request->newHargadrgsp);
    
    if($newName  == '' || $newBahan == '' || $newHargabahan == '' || $newHargakoas == '' || $newHargadrg == '' || $newHargadrgsp == '' ) return;
    
    $newName  = mysqli_real_escape_string($connect,$newName);
	$newBahan  = mysqli_real_escape_string($connect,$newBahan);
    $newHargabahan = mysqli_real_escape_string($connect,$newHargabahan);
	$newHargakoas = mysqli_real_escape_string($connect,$newHargakoas);
	$newHargadrg = mysqli_real_escape_string($connect,$newHargadrg);
	$newHargadrgsp = mysqli_real_escape_string($connect,$newHargadrgsp);

    $sql = "UPDATE `data_layanan` SET `layanan` = '$newName',`bahan` = '$newBahan' ,`harga_bahan` = '$newHargabahan',`harga_koas` = '$newHargakoas',`harga_drg` = '$newHargadrg',`harga_drgsp` = '$newHargadrgsp' WHERE `data_layanan`.`id` = $newId;";

    mysqli_query($connect,$sql);

    

}
exit;