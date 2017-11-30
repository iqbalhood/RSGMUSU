<?php
/*
 * kode untuk tampilak semua produk, pada halaman home
 */

$response = array();

$id = $_GET['id'];

// include db connect class
require_once '../../config/db_connect.php';

// ckonekin ke db
$db = new DB_CONNECT();
	 
	//  get by event
	$result = mysql_query("SELECT 	tabel_kunjugan.id_kunjungan,
									tabel_kunjugan.id_klinik,
									tabel_kunjugan.dokter_pendamping,
									tabel_kunjugan.id_dokter,
									tabel_kunjugan.id_pasien,
									data_dokter.nama AS nama_dokter,
									data_pasien.nama AS nama_pasien
								FROM tabel_kunjugan
								INNER JOIN data_dokter ON tabel_kunjugan.id_dokter = data_dokter.id
								INNER JOIN data_pasien ON tabel_kunjugan.id_pasien = data_pasien.id
								WHERE tabel_kunjugan.id_klinik = $id
								ORDER BY tabel_kunjugan.id_kunjungan") or die(mysql_error());
		// cek
		if (mysql_num_rows($result) > 0) {
		    // looping hasil
		    // event node
		    $response["event"] = array();
		    
	  while ($row = mysql_fetch_array($result)) {
			$event 							        = array();			
			$event["id_kunjungan"] 					= $row["id_kunjungan"];
			$event["id_klinik"] 					= $row["id_klinik"];
			$event["dokter_pendamping"] 			= $row["dokter_pendamping"];
			$event["id_dokter"] 					= $row["id_dokter"];
			$event["id_pasien"] 					= $row["id_pasien"];
			$event["dokter"] 						= $row["nama_dokter"];
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


?>



