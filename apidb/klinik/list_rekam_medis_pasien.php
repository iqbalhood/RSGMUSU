<?php
/*
 * kode untuk tampilak semua produk, pada halaman home
 */
$response = array();

$idpasien = $_GET['idpasien'];


// include db connect class
require_once '../../config/db_connect.php';

// ckonekin ke db
$db = new DB_CONNECT();
	 
	//  get by event
	$result = mysql_query("SELECT * FROM rekam_medis WHERE `id_pasien` = '$idpasien'") or die(mysql_error());
		// cek
		if (mysql_num_rows($result) > 0) {
		    // looping hasil
		    // event node
		    $response["event"] = array();
		    
	     while ($row = mysql_fetch_array($result)) {
			$event 							    = array();			
			$event["id_kunjungan"] 				= $row["id_kunjungan"];
			$event["id_pasien"] 			    = $row["id_pasien"];
			$event["id_dokter"] 		        = $row["id_dokter"];
			$event["nama_dokter"] 			    = $row["nama_dokter"];
			
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

