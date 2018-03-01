<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  				= json_decode($postdata);
    $newId  				= $request->newId;    
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
    
   
    
   

    $sql = "UPDATE `data_pasien` SET `no_rekam_medis` = '$noRekamMedis', `tgl_registrasi` = '$tglRegistrasi', `nama` = '$newName', `tempat_lahir` = '$tempatLahir', `tanggal_lahir` = '$tanggalLahir', `jenis_kelamin` = '$newKelamin', `agama` = '$agama', `alamat` = '$alamat', `rtrw` = '$rtrw', `kelurahan` = '$kelurahan', `kecamatan` = '$kecamatan', `kabupaten` = '$kabupaten', `propinsi` = '$propinsi', `nomor_hp` = '$newPhone', `kewarganegaraan` = '$kewarganegaraan', `noktp` = '$noktp', `pendidikan` = '$pendidikan', `pekerjaan` = '$pekerjaan', `status_perkawinan` = '$statusPerkawinan', `tgl_pertama_masuk` = '$tglPertamamasuk', `cara_bayar` = '$caraBayar', `tujuan_kunjungan_pertama` = '$tujuanKunjunganpertama', `alergi` = '$alergi', `catatan` = '$catatan', `tinggi_badan` = '$tinggi_badan', `berat_badan` = '$berat_badan', `golongan_darah` = '$golongan_darah'  WHERE `data_pasien`.`no_rekam_medis` = '$newId';";
	
	mysqli_query($connect,$sql);
}
exit;