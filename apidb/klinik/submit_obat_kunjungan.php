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
    $idObat         = $request->idObat;
    $namaObat       = $request->namaObat;
    $satuanObat     = $request->satuanObat;
    $quantityObat   = $request->quantityObat;
    $hargaObat      = $request->hargaObat;

    
    if($idKunjungan  == '' ||  $idObat == '' || $idPasien  == '' || $quantityObat  == '' ) return;
    
    $sql = "INSERT INTO `tabel_obat_kunjungan` (`id`, `id_pasien`, `nama_pasien`, `id_kunjungan`, `id_obat`, `nama_obat`, `satuan`, `quantity`, `harga`)
             VALUES                            (NULL, ' $idPasien', '$namaPasien', '$idKunjungan', '$idObat', '$namaObat', '$satuanObat', '$quantityObat', '$hargaObat');";

    mysqli_query($connect,$sql);
    

}
exit;