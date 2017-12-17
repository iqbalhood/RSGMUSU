<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");



if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
    
    $idKunjungan    = $request->idKunjungan;
    $idPasien       = $request->idPasien;
    $idObat         = $request->idObat;
    $quantityObat   = $request->quantityObat;

    
    if($idKunjungan  == '' ||  $idObat == '' || $idPasien  == '' || $quantityObat  == '' ) return;
    
    $sql = "INSERT INTO `tabel_obat_kunjungan` (`id`, `id_pasien`, `id_kunjungan`, `id_obat`) VALUES (NULL, '1', '$idKunjungan', '$idObat');";

    mysqli_query($connect,$sql);
    

}
exit;