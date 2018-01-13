<?php
/*
 * kode untuk tampilak semua produk, pada halaman home
 */

$response = array();


// include db connect class
require_once '../../config/db_connect.php';

// ckonekin ke db
$db = new DB_CONNECT();
	 
	//  get by event
	$result = mysql_query("SELECT * FROM data_pasien") or die(mysql_error());
		// cek
		if (mysql_num_rows($result) > 0) {
		    // looping hasil
		    // event node
		    $response["event"] = array();
		    
	  while ($row = mysql_fetch_array($result)) {
			$event 							    = array();			
			$event["id"] 						= $row["id"];
			$event["no_rekam_medis"] 			= $row["no_rekam_medis"];
			$event["nama"] 					    = $row["nama"];
			$event["tanggal_lahir"] 			= $row["tanggal_lahir"];
			$event["jenis_kelamin"] 			= $row["jenis_kelamin"];
			$event["phone"] 					= $row["nomor_hp"];
			
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