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
	$newHarga = preg_replace('/[^0-9 ]/','',$request->newHarga);
    
    if($newName  == '' || $newHarga == '') return;
    
    $newName  = mysqli_real_escape_string($connect,$newName);    
    $newHarga = mysqli_real_escape_string($connect,$newHarga);

    $sql = "UPDATE `data_layanan` SET `layanan` = '$newName',`harga` = '$newHarga' WHERE `data_layanan`.`id` = $newId;";

    mysqli_query($connect,$sql);

    

}
exit;