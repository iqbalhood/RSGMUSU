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
    $newQuantity = preg_replace('/[^0-9 ]/','',$request->newQuantity);
    $newSatuan = preg_replace('/[^a-zA-Z]/','',$request->newSatuan);
	$newHarga = preg_replace('/[^0-9 ]/','',$request->newHarga);
    
    if($newName  == '' ||  $newQuantity == '' ||  $newSatuan == ''||  $newHarga == '') return;
    
    $newName  = mysqli_real_escape_string($connect,$newName);
    $newQuantity = mysqli_real_escape_string($connect,$newQuantity);
	$newSatuan  = mysqli_real_escape_string($connect,$newSatuan);
    $newHarga = mysqli_real_escape_string($connect,$newHarga);

    $sql = "UPDATE `data_obat` SET `nama` = '$newName', `quantity` = '$newQuantity', `satuan` = '$newSatuan',`harga` = '$newHarga' WHERE `data_obat`.`id` = $newId;";

    mysqli_query($connect,$sql);

    

}
exit;