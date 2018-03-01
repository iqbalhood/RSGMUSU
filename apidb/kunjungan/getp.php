<?php
require '../connect.php';

$connect = connect();

$newId = $_GET['id'];
// Get the data
$people = array();

$sql = "SELECT 	tabel_kunjugan.id_kunjungan,
                tabel_kunjugan.id_klinik,
                tabel_kunjugan.dokter_pendamping,
                tabel_kunjugan.id_dokter,
                tabel_kunjugan.id_pasien,
                data_dokter.nama AS nama_dokter,
                data_pasien.nama AS nama_pasien
                FROM tabel_kunjugan
                INNER JOIN data_dokter ON tabel_kunjugan.id_dokter = data_dokter.id
                INNER JOIN data_pasien ON tabel_kunjugan.id_pasien = data_pasien.id
                WHERE tabel_kunjugan.id_kunjungan = $newId";

                echo $sql;

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {
    $people["id_kunjungan"] 			= $row["id_kunjungan"];
    $people["id_klinik"] 					= $row["id_klinik"];
    $people["dokter_pendamping"] 	= $row["dokter_pendamping"];
    $people["id_dokter"] 					= $row["id_dokter"];
    $people["id_pasien"] 					= $row["id_pasien"];
    $people["dokter"] 						= $row["nama_dokter"];
    $people["pasien"] 						= $row["nama_pasien"];	  
  }
}

$json = json_encode($people);
echo $json;
exit;

?>