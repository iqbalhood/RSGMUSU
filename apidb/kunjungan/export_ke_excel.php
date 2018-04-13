<?php

//Terima Respon dari Halaman Pencarian 
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








// nama file
$namaFile = "report.xls";

// Function penanda awal file (Begin Of File) Excel

function xlsBOF() {
echo pack("ssssss", 0x809, 0x8, 0x0, 0x10, 0x0, 0x0);
return;
}

// Function penanda akhir file (End Of File) Excel

function xlsEOF() {
echo pack("ss", 0x0A, 0x00);
return;
}

// Function untuk menulis data (angka) ke cell excel

function xlsWriteNumber($Row, $Col, $Value) {
echo pack("sssss", 0x203, 14, $Row, $Col, 0x0);
echo pack("d", $Value);
return;
}

// Function untuk menulis data (text) ke cell excel

function xlsWriteLabel($Row, $Col, $Value ) {
$L = strlen($Value);
echo pack("ssssss", 0x204, 8 + $L, $Row, $Col, 0x0, $L);
echo $Value;
return;
}

// header file excel

header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0,pre-check=0");
header("Content-Type: application/force-download");
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");

// header untuk nama file
header("Content-Disposition: attachment;filename=".$namaFile."");

header("Content-Transfer-Encoding: binary ");

// memanggil function penanda awal file excel
xlsBOF();

// ------ membuat kolom pada excel --- //

// mengisi pada cell A1 (baris ke-0, kolom ke-0)
xlsWriteLabel(0,0,"Tanggal");               

// mengisi pada cell A2 (baris ke-0, kolom ke-1)
xlsWriteLabel(0,1,"Nama Pasien");              

// mengisi pada cell A3 (baris ke-0, kolom ke-2)
xlsWriteLabel(0,2,"CO Ass / PPDGS");

// mengisi pada cell A4 (baris ke-0, kolom ke-3)
xlsWriteLabel(0,3,"DPJP ");   

// mengisi pada cell A5 (baris ke-0, kolom ke-4)
xlsWriteLabel(0,4,"Biaya"); 

// mengisi pada cell A6 (baris ke-0, kolom ke-5)
xlsWriteLabel(0,5,"Status"); 




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

    // nilai awal untuk baris cell
    $noBarisCell = 1;

    // nilai awal untuk nomor urut data
    $noData = 1;
    
while ($row = mysql_fetch_array($result)) {
    $event 							        = array();
    // $event["harga"] = mysql_query("SELECT SUM(harga_layanan+harga_bahan) FROM `tabel_layanan_kunjungan`");
    
    $data_kunjungan = jumlah_layanan($row["id_kunjungan"]);
    $data_obat = jumlah_obat($row["id_kunjungan"]);

    
    //echo $data;
    // $event["harga"]							= ($data_kunjungan + $data_obat);
    // $event["id_kunjungan"] 					= $row["id_kunjungan"];
    // $event["id_klinik"] 					= $row["id_klinik"];
    // $event["dokter_pendamping"] 			= $row["dokter_pendamping"];
    // $event["id_dokter"] 					= $row["id_dokter"];
    // $event["id_pasien"] 					= $row["id_pasien"];
    // $event["dokter"] 						= $row["nama_dokter"];
    // $event["status_pembayaran"] 			= $row["status_pembayaran"];
    // $event["pasien"] 						= $row["nama_pasien"];


     // menampilkan no. urut data
   xlsWriteNumber($noBarisCell,0,$row["id_kunjungan"]);

   // menampilkan data nim
   xlsWriteLabel($noBarisCell,1,$row["nama_pasien"]);

   // menampilkan data nama mahasiswa
   xlsWriteLabel($noBarisCell,2,$row["dokter_pendamping"]);

   // menampilkan data nilai
   xlsWriteNumber($noBarisCell,3,$row["nama_dokter"]);

   // menampilkan status kelulusan
   xlsWriteLabel($noBarisCell,4,($data_kunjungan + $data_obat));
   xlsWriteLabel($noBarisCell,5,$row["status_pembayaran"]);
   

   // increment untuk no. baris cell dan no. urut data
   $noBarisCell++;
   $noData++;






    
    //array_push($response["event"], $event);
 }

// memanggil function penanda akhir file excel
xlsEOF();
exit();



} else {
  // memanggil function penanda akhir file excel
  xlsEOF();
  exit();
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







// memanggil function penanda akhir file excel
// xlsEOF();
// exit();
?>