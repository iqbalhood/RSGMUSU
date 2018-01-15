<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
$newId = preg_replace('/[^0-9 ]/','',$request->newId);

// Get the data
$people = array();

$sql = "SELECT * FROM data_pasien WHERE `id` = $newId";


if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {
      $people['id']             			= $row['id'];
	  $people['no_rekam_medis']  			= $row['no_rekam_medis'];
	  $people['tgl_registrasi'] 			= $row['tgl_registrasi'];
      $people['name']           			= $row['nama'];
	  $people['tempat_lahir']   			= $row['tempat_lahir'];
	  $people['tanggal_lahir']  			= $row['tanggal_lahir'];
	  $people['jenis_kelamin']  			= $row['jenis_kelamin'];
	  $people['agama']          			= $row['agama'];
	  $people['alamat']         			= $row['alamat'];
	  $people['rtrw']           			= $row['rtrw'];
	  $people['kelurahan']      			= $row['kelurahan'];
	  $people['kecamatan']      			= $row['kecamatan'];
	  $people['kabupaten']      			= $row['kabupaten'];
	  $people['propinsi']       			= $row['propinsi'];
      $people['phone']          			= $row['nomor_hp'];
	  $people['kewarganegaraan']			= $row['kewarganegaraan'];
	  $people['noktp']          			= $row['noktp'];
	  $people['pendidikan']     			= $row['pendidikan'];
	  $people['pekerjaan']      			= $row['pekerjaan'];
	  $people['status_perkawinan'] 			= $row['status_perkawinan'];
	  $people['tgl_pertama_masuk'] 			= $row['tgl_pertama_masuk'];
	  $people['cara_bayar']        			= $row['cara_bayar'];
	  $people['tujuan_kunjungan_pertama'] 	= $row['tujuan_kunjungan_pertama'];
	  $people['alergi']  					= $row['alergi'];
	  $people['catatan']  					= $row['catatan'];
	  $people['tinggi_badan']  				= $row['tinggi_badan'];
	  $people['berat_badan']  				= $row['berat_badan'];
	  $people['golongan_darah']  			= $row['golongan_darah'];
	  $people['umur']						= date_diff(date_create($row['tanggal_lahir']), date_create('today'))->y;
           
  }
}

$json = json_encode($people);
echo $json;
exit;