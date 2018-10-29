<?php



// include db connect class
require_once '../../config/db_connect.php';

// ckonekin ke db
$db = new DB_CONNECT();


$result = mysql_query("SELECT * FROM tabel_kunjugan") or die(mysql_error());
		// cek

		
		if (mysql_num_rows($result) > 0) {
		   
        while ($row = mysql_fetch_array($result)) {

                $timestamp = $row["id_kunjungan"]/1000;
                $actual_date = date("Y-m-d", $timestamp);
                $id_kunjungan = $row["id_kunjungan"];
                echo update_tanggal($id_kunjungan, $actual_date);
              
                
        }
		   
		} else {
		    echo "TIDAK ADA DATA";
		}


        function update_tanggal($id_kunjungan,$actual_date ){
            $k = mysql_query("UPDATE `tabel_kunjugan` SET `tanggal_kunjungan` = '$actual_date' WHERE `tabel_kunjugan`.`id_kunjungan` = '$id_kunjungan'; ");
            if($k){
                echo "SUKSES";
                echo "<br />";
            }

            return "EXCEXUTE <br />";



        }






?>