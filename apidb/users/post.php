<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
    
    $newName  = preg_replace('/[^a-zA-Z ]/','',$request->newName);
    $newPassword  = preg_replace('/[^a-zA-Z ]/','',$request->newPassword);
    $newAkses = preg_replace('/[^0-9 ]/','',$request->newAkses);
    
    if($newName  == '' ||  $newPassword == '' ) return;
    
    $newName  = mysqli_real_escape_string($connect,$newName);
    $newPassword = mysqli_real_escape_string($connect,$newPassword);
	$newAkses  = mysqli_real_escape_string($connect,$newAkses);

    $sql = "INSERT INTO `dca_users` (`id`, `username`, `password`, `akses`) VALUES (NULL, '$newName', '$newPassword', '$newAkses')";

    mysqli_query($connect,$sql);
    

}
exit;