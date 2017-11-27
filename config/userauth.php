<?php

error_reporting(0);

// include db connect class
require_once __DIR__ . '/db_connect.php';

// ckonekin ke db
$db = new DB_CONNECT();




//SQL
        $sql = "SELECT * FROM `dca_users` WHERE `username` = '".$_POST['username']."' AND `password` = '".$_POST['password']."'";

		//  get by event
		$result = mysql_query($sql) or die(mysql_error());

		// cek
		if (mysql_num_rows($result) > 0) {
            $stat = "correct";
            $myObj = NULL;
            $myObj->status = $stat;
           
            while ($row = mysql_fetch_array($result)) {
               
                $myObj->akses = $row["akses"];		
                
            }
            
            $myJSON = json_encode($myObj);
            
            echo $myJSON;
        } else{ 
           
            $stat = "wrong";
            $myObj = NULL;
            $myObj->status = $stat;
            $myObj->akses = $stat;		
            $myJSON = json_encode($myObj);
            echo $myJSON;
        }







?>
