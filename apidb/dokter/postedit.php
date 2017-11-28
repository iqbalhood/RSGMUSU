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
    $newPhone = preg_replace('/[^0-9 ]/','',$request->newPhone);
    $newKelamin = preg_replace('/[^0-9 ]/','',$request->newKelamin);
    
    if($newName  == '' ||  $newPhone == ''  ) return;
    
    $newName  = mysqli_real_escape_string($connect,$newName);
    $newPhone = mysqli_real_escape_string($connect,$newPhone);

    $sql = "UPDATE `data_dokter` SET `nama` = '$newName', `jenis_kelamin` = '$newKelamin', `nomor_hp` = '$newPhone' WHERE `data_dokter`.`id` = $newId;";

    mysqli_query($connect,$sql);

    

}
exit;