<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
    
    $newName  = preg_replace('/[^a-zA-Z ]/','',$request->newName);
	$newHarga = preg_replace('/[^0-9 ]/','',$request->newHarga);
    
    if($newName  == '' || $newHarga == '' ) return;
    
    $newName  = mysqli_real_escape_string($connect,$newName);
    $newHarga = mysqli_real_escape_string($connect,$newHarga);

    $sql = "INSERT INTO `data_layanan` (`id`, `layanan`,`harga`) VALUES (NULL, '$newName', '$newHarga')";

    mysqli_query($connect,$sql);
    

}
exit;