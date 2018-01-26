<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
    
    $newName  = $request->newName;
    $newPassword  = $request->newPassword;
    $newAkses = $request->newAkses;
    
    if($newName  == '' ||  $newPassword == '' ) return;
   
    $sql = "INSERT INTO `dca_users` (`id`, `username`, `password`, `akses`) VALUES (NULL, '$newName', '$newPassword', '$newAkses')";

    mysqli_query($connect,$sql);

    echo "DIAKSES AN";
    

}
exit;