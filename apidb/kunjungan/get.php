<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
$newId = preg_replace('/[^0-9 ]/','',$request->newId);
// Get the data
$people = array();

$sql = "SELECT 	tabel_kunjugan.id_kunjungan,
                tabel_kunjugan.id_antrian,
                tabel_kunjugan.id_klinik,
                tabel_kunjugan.dokter_pendamping,
                tabel_kunjugan.id_dokter,
                tabel_kunjugan.id_pasien,
                tabel_kunjugan.biaya_rekam_medis,
                data_dokter.nama AS nama_dokter,
                data_pasien.nama AS nama_pasien
                FROM tabel_kunjugan
                INNER JOIN data_dokter ON tabel_kunjugan.id_dokter = data_dokter.id
                INNER JOIN data_pasien ON tabel_kunjugan.id_pasien = data_pasien.no_rekam_medis
                WHERE tabel_kunjugan.id_kunjungan = $newId
                ORDER BY tabel_kunjugan.id_kunjungan";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {
    $people["id_kunjungan"] 			= $row["id_kunjungan"];
    $people["id_antrian"] 			  = $row["id_antrian"];
    $people["id_klinik"] 					= $row["id_klinik"];
    $people["dokter_pendamping"] 	= $row["dokter_pendamping"];
    $people["id_dokter"] 					= $row["id_dokter"];
    $people["id_pasien"] 					= $row["id_pasien"];
    $people["dokter"] 						= $row["nama_dokter"];
    $people["pasien"] 						= $row["nama_pasien"];	  
    $people["biaya_rekam_medis"] 	= $row["biaya_rekam_medis"];	  
  }
}

$json = json_encode($people);
echo $json;
exit;

?>