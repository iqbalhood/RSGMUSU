<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
    
    $newName  = $request->newName;
    $newQuantity = preg_replace('/[^0-9 ]/','',$request->newQuantity);
    $newSatuan = preg_replace('/[^a-zA-Z]/','',$request->newSatuan);
	$newHarga = preg_replace('/[^0-9 ]/','',$request->newHarga);
    
    if($newName  == '' ||  $newQuantity == '' ||  $newSatuan == ''||  $newHarga == '' ) return;
    
   
    $newQuantity = mysqli_real_escape_string($connect,$newQuantity);
	$newSatuan  = mysqli_real_escape_string($connect,$newSatuan);
    $newHarga = mysqli_real_escape_string($connect,$newHarga);

    $sql = "INSERT INTO `data_obat` (`id`, `nama`, `quantity`, `satuan`, `harga`) VALUES (NULL, '$newName', '$newQuantity', '$newSatuan', '$newHarga')";

    mysqli_query($connect,$sql);
    

}
exit;