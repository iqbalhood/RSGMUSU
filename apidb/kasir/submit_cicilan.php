<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
    
    $idKunjungan    = $request->idKunjungan;
    $pembayaran     = $request->pembayaran;
    $keterangan     = $request->keterangan;
    $tglpembayaran  = $request->tglpembayaran;
    
    $sql = "INSERT INTO `tabel_cicilan` (`id`, `id_kunjugan`, `keterangan`, `biaya`, `tanggal`) VALUES (NULL, '$idKunjungan', '$keterangan', '$pembayaran', '$tglpembayaran');";

    mysqli_query($connect,$sql);

}
exit;