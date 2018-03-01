<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
    
    $newName  = $request->newName;
    $newPhone = $request->newPhone;
    $newKelamin = preg_replace('/[^0-9 ]/','',$request->newKelamin);
    $newKlinik = preg_replace('/[^0-9 ]/','',$request->newKlinik);
    
    if($newName  == '' && $newKlinik  == '' ) return;
    
    $sql = "INSERT INTO `data_dokter` (`id`, `nama`,`klinik`, `jenis_kelamin`, `nomor_hp`) 
    VALUES (NULL, '$newName','$newKlinik', '$newKelamin', '$newPhone')";

    mysqli_query($connect,$sql);

}
exit;