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
    $namaObat       = $request->namaObat;
    $satuanObat     = $request->satuanObat;
    $quantityObat   = $request->quantityObat;
    $hargaObat      = $request->hargaObat;

    $tgl = date("Y-m-d");

    
    // if($idKunjungan  == '' ||  $idObat == '' || $idPasien  == '' || $quantityObat  == '' ) return;
    
    $sql = "INSERT INTO `tabel_obat_invoice` (`id`, `id_pasien`, `id_kunjungan`, `id_obat`, `nama_obat`, `satuan`, `quantity`, `harga`, `tanggal`) 
                                    VALUES (NULL, '$idPasien', '$idKunjungan', '$idObat', '$namaObat', '$satuanObat', '$quantityObat', '$hargaObat', '$tgl');";

    mysqli_query($connect,$sql);
    
    echo $sql;

}
exit;