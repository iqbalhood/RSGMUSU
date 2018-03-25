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
	$result = mysql_query("SELECT COUNT(*) FROM tabel_kunjugan  WHERE `id_klinik` = 1 AND (`status` = '1' OR `status` = '0') ") or die(mysql_error());
	$result2 = mysql_query("SELECT COUNT(*) FROM tabel_kunjugan WHERE `id_klinik` = 2 AND (`status` = '1' OR `status` = '0') ") or die(mysql_error());
	$result3 = mysql_query("SELECT COUNT(*) FROM tabel_kunjugan WHERE `id_klinik` = 3 AND (`status` = '1' OR `status` = '0') ") or die(mysql_error());
	$result4 = mysql_query("SELECT COUNT(*) FROM tabel_kunjugan WHERE `id_klinik` = 4 AND (`status` = '1' OR `status` = '0') ") or die(mysql_error());
	$result5 = mysql_query("SELECT COUNT(*) FROM tabel_kunjugan WHERE `id_klinik` = 5 AND (`status` = '1' OR `status` = '0') ") or die(mysql_error());
	$result6 = mysql_query("SELECT COUNT(*) FROM tabel_kunjugan WHERE `id_klinik` = 6 AND (`status` = '1' OR `status` = '0') ") or die(mysql_error());
	$result7 = mysql_query("SELECT COUNT(*) FROM tabel_kunjugan WHERE `id_klinik` = 7 AND (`status` = '1' OR `status` = '0') ") or die(mysql_error());
	$result8 = mysql_query("SELECT COUNT(*) FROM tabel_kunjugan WHERE `id_klinik` = 8 AND (`status` = '1' OR `status` = '0') ") or die(mysql_error());
	$result9 = mysql_query("SELECT COUNT(*) FROM tabel_kunjugan WHERE `id_klinik` = 9 AND (`status` = '1' OR `status` = '0') ") or die(mysql_error());
	$datapasien = mysql_query("SELECT COUNT(*) FROM data_pasien") or die(mysql_error());
		// cek
	
		    $response["event"] = array();
		     
	  while ($row = mysql_fetch_array($result)) {
			$event 							    = array();			
			$event["ikgp"] 						= mysql_result($result,0);
			$event["PERIODONSIA"] 				= mysql_result($result2,0);
			$event["ipm"] 						= mysql_result($result3,0);
			$event["ikga"] 						= mysql_result($result4,0);
			$event["konservasi"] 				= mysql_result($result5,0);
			$event["prosotodonsia"] 			= mysql_result($result6,0);
			$event["bedahmulut"] 				= mysql_result($result7,0);
			$event["ortodonsia"] 				= mysql_result($result8,0);
			$event["radiologi"] 				= mysql_result($result9,0);
			$pengunjung = $event["ikgp"]+$event["PERIODONSIA"]+$event["ipm"]+$event["ikga"]+$event["konservasi"]+$event["prosotodonsia"]+$event["bedahmulut"]+$event["ortodonsia"]+$event["radiologi"];
			$event["pengunjung"] 				= $pengunjung;
			$event["datapasien"] 				= mysql_result($datapasien,0);
			
			array_push($response["event"], $event);
		 }
		    // sukses
		    $response["success"] = 1;
		    // echo JSON response
		    echo json_encode($response);
		
?>