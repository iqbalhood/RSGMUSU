<?php
/*
 * kode untuk tampilak semua produk, pada halaman home
 */
$response = array();

$id_kunjugan = $_GET['id'];


// include db connect class
require_once '../../config/db_connect.php';

// ckonekin ke db
$db = new DB_CONNECT();
	 
	//  get by event
	$result = mysql_query("SELECT * FROM `tabel_cicilan` WHERE id_kunjugan = '$id_kunjugan' ") or die(mysql_error());
		// cek
		if (mysql_num_rows($result) > 0) {
		    // looping hasil
		    // event node
		    $response["event"] = array();
		    
	     while ($row = mysql_fetch_array($result)) {
			$event 							    = array();			
			$event["id_kunjugan"] 				= $row["id_kunjugan"];
			$event["keterangan"] 			    = $row["keterangan"];
			$event["biaya"] 		            = $row["biaya"];
			$event["tanggal"] 			        = $row["tanggal"];
			
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

