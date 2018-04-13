<?php

$bagianWhere = "";

if (isset($_GET['klinik']))
{
    $klinik = $_GET['klinik'];
    if($klinik != 'undefined' && $klinik != '0' ){
        $bagianWhere .= "AND tabel_kunjugan.id_klinik = '$klinik'";
    }
   
}


if (isset($_GET['status']))
{
   $status = $_GET['status'];
   if($status != 'undefined' && $klinik != '0' ){
   $bagianWhere .= "AND tabel_kunjugan.status_pembayaran = '$status'";
   }else{
    $bagianWhere .= "AND (tabel_kunjugan.status_pembayaran = '2' OR tabel_kunjugan.status_pembayaran = '3')";       
   }
  
}else{
    $bagianWhere .= "AND (tabel_kunjugan.status_pembayaran = '2' OR tabel_kunjugan.status_pembayaran = '3')";
}

$tawal = $_GET['tawal'];
$takhir = $_GET['takhir'];

$response = array();

// include db connect class
require_once '../../config/db_connect.php';

// ckonekin ke db
$db = new DB_CONNECT();





$query = "SELECT 	tabel_kunjugan.id_kunjungan,
tabel_kunjugan.id_klinik,
tabel_kunjugan.dokter_pendamping,
tabel_kunjugan.id_dokter,
tabel_kunjugan.id_pasien,
tabel_kunjugan.status_pembayaran,
tabel_kunjugan.tanggal_kunjungan,
data_dokter.nama AS nama_dokter,
data_pasien.nama AS nama_pasien
FROM tabel_kunjugan
INNER JOIN data_dokter ON tabel_kunjugan.id_dokter = data_dokter.id
INNER JOIN data_pasien ON tabel_kunjugan.id_pasien = data_pasien.no_rekam_medis
WHERE tabel_kunjugan.tanggal_kunjungan BETWEEN '$tawal' AND '$takhir'  ".$bagianWhere." ORDER BY tabel_kunjugan.id_kunjungan ";




$result = mysql_query($query) or die(mysql_error());

//echo $query;

	
if (mysql_num_rows($result) > 0) {
    // looping hasil
    // event node
    $response["event"] = array();
    
while ($row = mysql_fetch_array($result)) {
    $event 							        = array();
    // $event["harga"] = mysql_query("SELECT SUM(harga_layanan+harga_bahan) FROM `tabel_layanan_kunjungan`");
    
    $data_kunjungan = jumlah_layanan($row["id_kunjungan"]);
    $data_obat = jumlah_obat($row["id_kunjungan"]);

    
    //echo $data;
    $event["harga"]							= ($data_kunjungan + $data_obat);
    $event["id_kunjungan"] 					= $row["id_kunjungan"];
    $event["id_klinik"] 					= $row["id_klinik"];
    $event["dokter_pendamping"] 			= $row["dokter_pendamping"];
    $event["id_dokter"] 					= $row["id_dokter"];
    $event["id_pasien"] 					= $row["id_pasien"];
    $event["dokter"] 						= $row["nama_dokter"];
    $event["status_pembayaran"] 			= $row["status_pembayaran"];
    $event["pasien"] 						= $row["nama_pasien"];
    
    array_push($response["event"], $event);
 }
    // sukses
    $response["success"] = 1;

    // echo JSON response
    echo json_encode($response);
} else {
    $response["success"] = 0;
    $response["message"] = "Tidak ada data yang ditemukan";

    echo json_encode($response);
}

function jumlah_layanan($id_kunjungan){
$k = mysql_query("SELECT SUM(harga_layanan+harga_bahan) as value_sum FROM `tabel_layanan_kunjungan` WHERE id_kunjungan = '$id_kunjungan' ");
$row = mysql_fetch_assoc($k); 
$sum = $row['value_sum'];
return $sum;
}

function jumlah_obat($id_kunjungan){
$k = mysql_query("SELECT SUM(quantity*harga) as value_sum FROM `tabel_obat_kunjungan` WHERE id_kunjungan  = '$id_kunjungan'  ");
$row = mysql_fetch_assoc($k); 
$sum = $row['value_sum'];
return $sum;
}


