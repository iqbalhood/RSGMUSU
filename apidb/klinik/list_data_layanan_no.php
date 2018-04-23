<?php
/*
 * kode untuk tampilak semua produk, pada halaman home
 */

$response = array();

// include db connect class
require_once '../../config/db_connect.php';

$id = $_GET['id'];

// ckonekin ke db
$db = new DB_CONNECT();
	 
	//  get by event
	$result = mysql_query("SELECT * FROM `tabel_layanan_kunjungan` WHERE `id_kunjungan` = $id  ") or die(mysql_error());
		// cek
		if (mysql_num_rows($result) > 0) {
		    // looping hasil
		    // event node
        $response["event"] = array();    
	    while ($row = mysql_fetch_array($result)) {
			$event 							= array();			
			$event["id"] 			        = $row["id"];
			$event["nama_layanan"] 			= $row["nama_layanan"];
			$event["harga_bahan"] 			= $row["harga_bahan"];
			$event["harga_layanan"] 		= $row["harga_layanan"];
			$event["icd"] 		= $row["icd"];
			
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