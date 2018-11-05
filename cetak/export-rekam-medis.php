<?php

$link = mysqli_connect("localhost", "root", "", "klinikusu");

$idpasien = $_GET['idpasien'];
$sql = "SELECT * FROM perawatan WHERE `id_pasien` = '$idpasien'";
$result = mysqli_query($link,$sql);

while ($row = mysqli_fetch_array($result)) {


    $response["event"] = array();
		    
    

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
       $event["id_pasien"] 			        = $row["id_pasien"];
       $event["id_kunjungan"] 			    = get_id_kunjungan($row["id_antrian"]);
       $event["nama_dokter"] 			    = $row["nama_dokter"];
       $event["klinik"] 			   		= $klinik;
       $event["element"] 			   		= $row["element"];
       $event["diagnosa"] 			   		= $row["diagnosa"];		
       $event["perawatan"] 			   	    = $row["perawatan"];		
       $event["icd10"] 			   		    = $row["icd10"];
   
       array_push($response["event"], $event);
    }
       // sukses
       $response["success"] = 1;

       // echo JSON response
       echo json_encode($response);



function get_id_kunjungan($id_antrian){
$link = mysqli_connect("localhost", "root", "", "klinikusu");
    
    $exist = '';
    $sql = "SELECT * FROM `tabel_kunjugan` WHERE `id_antrian` = '$id_antrian'";
    $result = mysqli_query($link, $sql);
   

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {

        $exist = $row["id_kunjungan"];	
        
    }	
    }
    return $exist;
}






?>