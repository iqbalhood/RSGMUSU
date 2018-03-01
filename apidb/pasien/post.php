<?php
require '../connect.php';
error_reporting(0);
$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
   
	$noRekamMedis 			= $request->noRekamMedis;
	$tglRegistrasi 			= $request->tglRegistrasi;
    $newName  				= $request->newName;
	$tempatLahir 			= $request->tempatLahir;
	$tanggalLahir 			= $request->tanggalLahir;
	$newKelamin 			= $request->newKelamin;
	$agama 					= $request->agama;
	$alamat 				= $request->alamat;
	$rtrw 					= $request->rtrw;
	$kelurahan 				= $request->kelurahan;
	$kecamatan 				= $request->kecamatan;
	$kabupaten 				= $request->kabupaten;
	$propinsi 				= $request->propinsi;
	$newPhone 				= $request->newPhone;
	$kewarganegaraan 		= $request->kewarganegaraan;
	$noktp 					= $request->noKtp;
    $pendidikan 			= $request->pendidikan;
	$pekerjaan 				= $request->pekerjaan;
	$statusPerkawinan 		= $request->statusPerkawinan;
	$tglPertamamasuk 		= $request->tglPertamamasuk;
	$caraBayar 				= $request->caraBayar;
	$tujuanKunjunganpertama = $request->tujuanKunjunganpertama;
	$alergi 				= $request->alergi;
	$catatan 				= $request->catatan;
    $tinggi_badan 			= $request->tinggi_badan;
    $berat_badan 			= $request->berat_badan;
    $golongan_darah 		= $request->golongan_darah;
    
	
    
    if($newName  == '' ||  $noRekamMedis == ''  ) return;
    // $noRekamMedis 			= mysqli_real_escape_string($connect,$noRekamMedis);
	// $tglRegistrasi 			= mysqli_real_escape_string($connect,$tglRegistrasi);
    // $newName  				= mysqli_real_escape_string($connect,$newName);
	// $tempatLahir 			= mysqli_real_escape_string($connect,$tempatLahir);
	// $tanggalLahir 			= mysqli_real_escape_string($connect,$tanggalLahir);
	// $newKelamin 			= mysqli_real_escape_string($connect,$newKelamin);
	// $agama 					= mysqli_real_escape_string($connect,$agama);
	// $alamat 				= mysqli_real_escape_string($connect,$alamat);
	// $rtrw 					= mysqli_real_escape_string($connect,$rtrw);
	// $kelurahan 				= mysqli_real_escape_string($connect,$kelurahan);
	// $kecamatan 				= mysqli_real_escape_string($connect,$kecamatan);
	// $kabupaten 				= mysqli_real_escape_string($connect,$kabupaten);
	// $propinsi 				= mysqli_real_escape_string($connect,$propinsi);
    // $newPhone 				= mysqli_real_escape_string($connect,$newPhone);
	// $kewarganegaraan 		= mysqli_real_escape_string($connect,$kewarganegaraan);
	// $noktp 					= mysqli_real_escape_string($connect,$noktp);
	// $pendidikan 			= mysqli_real_escape_string($connect,$pendidikan);
	// $pekerjaan 				= mysqli_real_escape_string($connect,$pekerjaan);
	// $statusPerkawinan 		= mysqli_real_escape_string($connect,$statusPerkawinan);
	// $tglPertamamasuk 		= mysqli_real_escape_string($connect,$tglPertamamasuk);
	// $caraBayar 				= mysqli_real_escape_string($connect,$caraBayar);
	// $tujuanKunjunganpertama = mysqli_real_escape_string($connect,$tujuanKunjunganpertama);
	// $alergi 				= mysqli_real_escape_string($connect,$alergi);
	// $catatan 				= mysqli_real_escape_string($connect,$catatan);
	// $tinggi_badan 			= mysqli_real_escape_string($connect,$tinggi_badan);
	// $berat_badan 			= mysqli_real_escape_string($connect,$berat_badan);
	// $golongan_darah 		= mysqli_real_escape_string($connect,$golongan_darah);

    $sql = "INSERT INTO `data_pasien` ( `no_rekam_medis`, `tgl_registrasi`,`nama`,`tempat_lahir`,`tanggal_lahir`,`jenis_kelamin`, `agama`,`alamat`,`rtrw`,`kelurahan`,`kecamatan`, `kabupaten`, `propinsi`,`nomor_hp`, `kewarganegaraan`, `noktp`, `pendidikan`, `pekerjaan`, `status_perkawinan`,`tgl_pertama_masuk`, `cara_bayar`, `tujuan_kunjungan_pertama`, `alergi`, `catatan` , `tinggi_badan`, `berat_badan`, `golongan_darah`   ) VALUES ( '$noRekamMedis','$tglRegistrasi','$newName', '$tempatLahir','$tanggalLahir','$newKelamin', '$agama','$alamat','$rtrw','$kelurahan','$kecamatan','$kabupaten','$propinsi','$newPhone','$kewarganegaraan','$noktp','$pendidikan','$pekerjaan','$statusPerkawinan','$tglPertamamasuk','$caraBayar','$tujuanKunjunganpertama','$alergi','$catatan', '$tinggi_badan', '$berat_badan', '$golongan_darah')";

	echo $sql;
    mysqli_query($connect,$sql);
    

}
exit;