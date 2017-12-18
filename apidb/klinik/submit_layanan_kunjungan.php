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
    $namaPasien     = $request->namaPasien;
    $namaLayanan    = $request->namaLayanan;
    $hargaLayanan   = $request->hargaLayanan;
    $hargaBahan     = $request->hargaBahan;

    
    $sql = "INSERT INTO `tabel_layanan_kunjungan` (`id`, `id_pasien`, `nama_pasien`, `id_kunjungan`, `nama_layanan`, `harga_layanan`, `harga_bahan`)
             VALUES                            (NULL, ' $idPasien', '$namaPasien', '$idKunjungan', '$namaLayanan', '$hargaLayanan', '$hargaBahan');";


    mysqli_query($connect,$sql);
    

}
exit;