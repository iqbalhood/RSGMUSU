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
	$result = mysql_query("SELECT * FROM tidakan_medis") or die(mysql_error());
		// cek
		if (mysql_num_rows($result) > 0) {
		    // looping hasil
		    // event node
		    $response["event"] = array();
		    
	     while ($row = mysql_fetch_array($result)) {
			$event 							    = array();			
			$event["id"] 						= $row["id"];
			$event["nama"] 			= $row["nama_tindakan"];
			$event["klinik"] 			        = $row["klinik"];
            $event["harga_bahan"] 				= $row["harga_bahan"];
            $event["harga_tindakan_medis_1"] 	= $row["harga_tindakan_medis_1"];
            $event["harga_tindakan_medis_2"] 	= $row["harga_tindakan_medis_2"];
            $event["harga_tindakan_medis_3"] 	= $row["harga_tindakan_medis_3"];
            $event["harga_tindakan_medis_4"] 	= $row["harga_tindakan_medis_4"];
			
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