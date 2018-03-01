<?php
/*
 * kode untuk tampilak semua produk, pada halaman home
 */
$response = array();

$idkunjungan = $_GET['idkunjungan'];


// include db connect class
require_once '../../config/db_connect.php';

// ckonekin ke db
$db = new DB_CONNECT();
	 
	//  get by event
	$result = mysql_query("SELECT * FROM tabel_kunjugan WHERE `id_kunjungan` = '$idkunjungan'") or die(mysql_error());
		// cek
		if (mysql_num_rows($result) > 0) {
		    // looping hasil
		    // event node
		    $response["event"] = array();
		    
	     while ($row = mysql_fetch_array($result)) {
$nama_klinik = "";

if($row["id_klinik"] == "1"){
	$nama_klinik = "IKGP/IKGM";
}

if($row["id_klinik"] == "2"){
	$nama_klinik = "PERIODONSIA";	
}

if($row["id_klinik"] == "3"){	
	$nama_klinik = "Ilmu Penyakit Mulut";
}

if($row["id_klinik"] == "4"){		
	$nama_klinik = "Ilmu Kedokteran Gigi Anak";			
}

if($row["id_klinik"] == "5"){		
	$nama_klinik = "Konservasi";				
}

if($row["id_klinik"] == "6"){
	$nama_klinik = "Prosotodonsia";
}
if($row["id_klinik"] == "7"){
	$nama_klinik = "Bedah Mulut";
}
if($row["id_klinik"] == "8"){
	$nama_klinik = "Ortodonsia";
}
if($row["id_klinik"] == "9"){
	$nama_klinik = "Radiologi Kedokteran Gigi";
}




			$event 							    = array();			
            $event["id_kunjungan"] 				= $row["id_kunjungan"];
            $event["id_antrian"] 				= $row["id_antrian"];            
			$event["id_klinik"] 				= $row["id_klinik"];
			$event["nama_klinik"] 				= $nama_klinik;
			$event["dokter_pendamping"] 		= $row["dokter_pendamping"];
			$event["id_dokter"] 		        = $row["id_dokter"];
			
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

