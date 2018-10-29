<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  				= json_decode($postdata);
	$id 			        = $request->id;   
	$element 			    = $request->element;
	$diagnosa 			    = $request->diagnosa;
	$icd10 		            = $request->icd10;
    
   
    
   

    $sql = "UPDATE `data_pasien` SET `no_rekam_medis` = '$noRekamMedis', `tgl_registrasi` = '$tglRegistrasi', `nama` = '$newName', `tempat_lahir` = '$tempatLahir', `tanggal_lahir` = '$tanggalLahir', `jenis_kelamin` = '$newKelamin', `agama` = '$agama', `alamat` = '$alamat', `rtrw` = '$rtrw', `kelurahan` = '$kelurahan', `kecamatan` = '$kecamatan', `kabupaten` = '$kabupaten', `propinsi` = '$propinsi', `nomor_hp` = '$newPhone', `kewarganegaraan` = '$kewarganegaraan', `noktp` = '$noktp', `pendidikan` = '$pendidikan', `pekerjaan` = '$pekerjaan', `status_perkawinan` = '$statusPerkawinan', `tgl_pertama_masuk` = '$tglPertamamasuk', `cara_bayar` = '$caraBayar', `tujuan_kunjungan_pertama` = '$tujuanKunjunganpertama', `alergi` = '$alergi', `catatan` = '$catatan', `tinggi_badan` = '$tinggi_badan', `berat_badan` = '$berat_badan', `golongan_darah` = '$golongan_darah'  WHERE `data_pasien`.`no_rekam_medis` = '$newId';";

	mysqli_query($connect,$sql);
}
exit;