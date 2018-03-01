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
	$result = mysql_query("SELECT * FROM data_layanan where idklinik = $id") or die(mysql_error());
		// cek
		if (mysql_num_rows($result) > 0) {
		    // looping hasil
		    // event node
		    $response["event"] = array();
		    
	  while ($row = mysql_fetch_array($result)) {
			$event 							    = array();			
			$event["id"] 						= $row["id"];
			$event["layanan"] 					= $row["layanan"];
			$event["bahan"] 					= $row["bahan"];
			$event["harga_bahan"] 					= $row["harga_bahan"];
			$event["harga_koas"] 					= $row["harga_koas"];
			$event["harga_drg"] 					= $row["harga_drg"];
			$event["harga_drgsp"] 					= $row["harga_drgsp"];
			
			
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