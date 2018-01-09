<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
   
	$noRekamMedis = preg_replace('/[^0-9 ]/','',$request->noRekamMedis);
	$tglRegistrasi = preg_replace('/[^0-9 ]/','',$request->tglRegistrasi);
    $newName  = preg_replace('/[^a-zA-Z ]/','',$request->newName);
	$tempatLahir = preg_replace('/[^a-zA-Z ]/','',$request->tempatLahir);
	$tanggalLahir = preg_replace('/[^0-9 ]/','',$request->tanggalLahir);
	$newKelamin = preg_replace('/[^0-9 ]/','',$request->newKelamin);
	$agama = preg_replace('/[^0-9 ]/','',$request->agama);
	$alamat = preg_replace('/[^a-zA-Z0-9 ]/','',$request->alamat);
	$rtrw = $request->rtrw;
	$kelurahan = preg_replace('/[^a-zA-Z ]/','',$request->kelurahan);
	$kecamatan = preg_replace('/[^a-zA-Z ]/','',$request->kecamatan);
	$kabupaten = preg_replace('/[^a-zA-Z ]/','',$request->kabupaten);
	$propinsi = preg_replace('/[^a-zA-Z ]/','',$request->propinsi);
	$newPhone = preg_replace('/[^0-9 ]/','',$request->newPhone);
	$kewarganegaraan = preg_replace('/[^a-zA-Z ]/','',$request->kewarganegaraan);
	$noktp = preg_replace('/[^0-9 ]/','',$request->noKtp);
    $pendidikan = $request->pendidikan;
	$pekerjaan = preg_replace('/[^a-zA-Z ]/','',$request->pekerjaan);
	$statusPerkawinan = preg_replace('/[^a-zA-Z ]/','',$request->statusPerkawinan);
	$tglPertamamasuk = preg_replace('/[^0-9 ]/','',$request->tglPertamamasuk);
	$caraBayar = preg_replace('/[^0-9 ]/','',$request->caraBayar);
	$tujuanKunjunganpertama = preg_replace('/[^0-9 ]/','',$request->tujuanKunjunganpertama);
	$alergi = preg_replace('/[^a-zA-Z ]/','',$request->alergi);
	$catatan = preg_replace('/[^a-zA-Z ]/','',$request->catatan);
    
	
    
    if($newName  == '' ||  $newPhone == ''  ) return;
    $noRekamMedis = mysqli_real_escape_string($connect,$noRekamMedis);
	$tglRegistrasi = mysqli_real_escape_string($connect,$tglRegistrasi);
    $newName  = mysqli_real_escape_string($connect,$newName);
	$tempatLahir = mysqli_real_escape_string($connect,$tempatLahir);
	$tanggalLahir = mysqli_real_escape_string($connect,$tanggalLahir);
	$newKelamin = mysqli_real_escape_string($connect,$newKelamin);
	$agama = mysqli_real_escape_string($connect,$agama);
	$alamat = mysqli_real_escape_string($connect,$alamat);
	$rtrw = mysqli_real_escape_string($connect,$rtrw);
	$kelurahan = mysqli_real_escape_string($connect,$kelurahan);
	$kecamatan = mysqli_real_escape_string($connect,$kecamatan);
	$kabupaten = mysqli_real_escape_string($connect,$kabupaten);
	$propinsi = mysqli_real_escape_string($connect,$propinsi);
    $newPhone = mysqli_real_escape_string($connect,$newPhone);
	$kewarganegaraan = mysqli_real_escape_string($connect,$kewarganegaraan);
	$noktp = mysqli_real_escape_string($connect,$noktp);
	$pendidikan = mysqli_real_escape_string($connect,$pendidikan);
	$pekerjaan = mysqli_real_escape_string($connect,$pekerjaan);
	$statusPerkawinan = mysqli_real_escape_string($connect,$statusPerkawinan);
	$tglPertamamasuk = mysqli_real_escape_string($connect,$tglPertamamasuk);
	$caraBayar = mysqli_real_escape_string($connect,$caraBayar);
	$tujuanKunjunganpertama = mysqli_real_escape_string($connect,$tujuanKunjunganpertama);
	$alergi = mysqli_real_escape_string($connect,$alergi);
	$catatan = mysqli_real_escape_string($connect,$catatan);

    $sql = "INSERT INTO `data_pasien` (`id`, `no_rekam_medis`, `tgl_registrasi`,`nama`,`tempat_lahir`,`tanggal_lahir`,`jenis_kelamin`, `agama`,`alamat`,`rtrw`,`kelurahan`,`kecamatan`, `kabupaten`, `propinsi`,`nomor_hp`, `kewarganegaraan`, `noktp`, `pendidikan`, `pekerjaan`, `status_perkawinan`,`tgl_pertama_masuk`, `cara_bayar`, `tujuan_kunjungan_pertama`, `alergi`, `catatan` ) VALUES (NULL, '$noRekamMedis','$tglRegistrasi','$newName', '$tempatLahir','$tanggalLahir','$newKelamin', '$agama','$alamat','$rtrw','$kelurahan','$kecamatan','$kabupaten','$propinsi','$newPhone','$kewarganegaraan','$noktp','$pendidikan','$pekerjaan','$statusPerkawinan','$tglPertamamasuk','$caraBayar','$tujuanKunjunganpertama','$alergi','$catatan')";

    mysqli_query($connect,$sql);
    

}
exit;