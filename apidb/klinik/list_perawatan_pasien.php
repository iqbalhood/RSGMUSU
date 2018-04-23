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
	$result = mysql_query("SELECT * FROM perawatan WHERE `id_pasien` = '$idpasien'") or die(mysql_error());
		// cek
		if (mysql_num_rows($result) > 0) {
		    // looping hasil
		    // event node
		    $response["event"] = array();
		    
	     while ($row = mysql_fetch_array($result)) {

			if ($row["id_klinik"] == "1" ) {

				$klinik = "IKGP/IKGM";

			}


			if ($row["id_klinik"] == "2" ) {

				$klinik = "PERIODONSIA";

			}


			if ($row["id_klinik"] == "3" ) {

				$klinik = "ILMU PENYAKIT MULUT";

			}


			if ($row["id_klinik"] == "4" ) {

				$klinik = "ILMU KEDOKTERAN GIGI ANAK";

			}


			if ($row["id_klinik"] == "5" ) {

				$klinik = "KONSERVASI";

			}


			if ($row["id_klinik"] == "6" ) {

				$klinik = "PROSTODONSIA";

			}


			if ($row["id_klinik"] == "7" ) {

				$klinik = "ILMU BEDAH MULUT";

			}


			if ($row["id_klinik"] == "8" ) {

				$klinik = "ORTODONSIA";

			}


			if ($row["id_klinik"] == "9" ) {

				$klinik = "RADIOLOGI KEDOKTERAN GIGI";

			}



			$event 							    = array();
			$event["id_antrian"] 			    = $row["id_antrian"];			
			$event["id_pasien"] 			    = $row["id_pasien"];
			$event["id_kunjungan"] 			    = get_id_kunjungan($row["id_antrian"]);
			$event["nama_dokter"] 			    = $row["nama_dokter"];
			$event["klinik"] 			   		= $klinik;
			$event["element"] 			   		= $row["element"];
			$event["diagnosa"] 			   		= $row["diagnosa"];		
			$event["perawatan"] 			   	= $row["perawatan"];		
			$event["icd10"] 			   		= $row["icd10"];
		
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

		function get_id_kunjungan($id_antrian){
			$exist = '';
			$sql = mysql_query("SELECT * FROM `tabel_kunjugan` WHERE `id_antrian` = '$id_antrian'");
			if (mysql_num_rows($sql) > 0) {
				while ($row = mysql_fetch_array($sql)) {

				$exist = $row["id_kunjungan"];	
				
			}	
			}
			return $exist;
		}