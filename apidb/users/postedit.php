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
    $newPassword = preg_replace('/[^a-zA-Z]/','',$request->newPassword);
   
	$newAkses = preg_replace('/[^0-9 ]/','',$request->newAkses);
    
    if($newName  == '' ||  $newPassword == '') return;
    
    $newName  = mysqli_real_escape_string($connect,$newName);
    $newPassword = mysqli_real_escape_string($connect,$newPassword);
	$newAkses  = mysqli_real_escape_string($connect,$newAkses);

    $sql = "UPDATE `dca_users` SET `username` = '$newName', `password` = '$newPassword', `akses` = '$newAkses' WHERE `dca_users`.`id` = $newId;";

    mysqli_query($connect,$sql);

    

}
exit;