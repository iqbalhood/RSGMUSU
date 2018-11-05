<?php 

/**
 * digunakan untuk generate file excel.
 * @author 		: Mohammad Iqbal
 * @copyright 	: iqbalhood@gmail.com
 * @license 	: LGPLv2
 * @database 	: - iqbalhood
 * @since		: Sept 2018
 * @version		: 1.0.0
 * 
 * */
$bagianWhere = "";
$klinik = "";
if (isset($_GET['idklinik']))
{
    $klinik = $_GET['idklinik'];
    // if($klinik != 'undefined' && $klinik != '0' ){
    //    // $bagianWhere .= "AND tabel_kunjugan.id_klinik = '$klinik'";
    //     $bagianWhere .= "AND tabel_kunjugan.id_klinik LIKE '%$klinik%'";
    // }
   
}


if (isset($_GET['status']))
{
   $status = $_GET['status'];
   //echo $status;
   if($status !== '0' ){
//    if(($status !== 'undefined' || $status !== '0') && $klinik !== '0' ){

    $bagianWhere .= "AND status_pembayaran = '$status'";

   }else{
    //   echo "lalala";
    $bagianWhere .= "AND (status_pembayaran = '2' OR status_pembayaran = '3')";       
   }
}else{
    $bagianWhere .= "AND (status_pembayaran = '2' OR status_pembayaran = '3')";
}

$tawal = $_GET['tawal'];
$takhir = $_GET['takhir'];


$link = mysqli_connect("localhost", "root", "", "klinikusu");



function get_perawatan($id_kunjungan){
    $exist = '';
    $link = mysqli_connect("localhost", "root", "", "klinikusu");
	$sql = mysqli_query($link,"SELECT  perawatan FROM `perawatan` WHERE `id_antrian` = '$id_kunjungan'");

		while ($row = mysqli_fetch_array($sql)) {

		$exist = $row["perawatan"];	
		
	}	
	
	return $exist;
}


function jumlah_layanan($id_kunjungan){
    $link = mysqli_connect("localhost", "root", "", "klinikusu");
    $k = mysqli_query($link, "SELECT SUM(harga_layanan+harga_bahan) as value_sum FROM `tabel_layanan_kunjungan` WHERE id_kunjungan = '$id_kunjungan' ");
    $row = mysqli_fetch_assoc($k); 
    $sum = $row['value_sum'];
    return $sum;
    }
    
    function jumlah_obat($id_kunjungan){
        $link = mysqli_connect("localhost", "root", "", "klinikusu");
    $k = mysqli_query($link,"SELECT SUM(quantity*harga) as value_sum FROM `tabel_obat_kunjungan` WHERE id_kunjungan  = '$id_kunjungan'  ");
    $row = mysqli_fetch_assoc($k); 
    $sum = $row['value_sum'];
    return $sum;
    }











//ini adalah require yang dibutuhkan cukup merequire file pertama di PHP Excel. 
//sesuaikan dengan Path Milik anda
	require_once "../vendors/excel/PHPExcel.php"; 
/*start - BLOCK PROPERTIES FILE EXCEL*/
	$file = new PHPExcel ();
	$file->getProperties ()->setCreator ( "Mohammad Iqbal" );
	$file->getProperties ()->setLastModifiedBy ( "Mohammad Iqbal" );
	$file->getProperties ()->setTitle ( "Laporan RSGM USU" );
	$file->getProperties ()->setSubject ( "Laporan RSGM USU" );
	$file->getProperties ()->setDescription ( "Laporan RSGM USU" );
	$file->getProperties ()->setKeywords ( "Laporan RSGM USU" );
	$file->getProperties ()->setCategory ( "Laporan RSGM USU" );
/*end - BLOCK PROPERTIES FILE EXCEL*/

/*start - BLOCK SETUP SHEET*/
	$file->createSheet ( NULL,0);
	$file->setActiveSheetIndex ( 0 );
	$sheet = $file->getActiveSheet ( 0 );
	//memberikan title pada sheet
	$sheet->setTitle ( "LAPORAN PEMBAYARAN" );
/*end - BLOCK SETUP SHEET*/

/*start - BLOCK HEADER*/
	$sheet	->setCellValue ( "A1", "No" )
			->setCellValue ( "B1", "Tanggal Perawatan" )
			->setCellValue ( "C1", "Tanggal Pembayaran" )
			->setCellValue ( "D1", "Nomor Rekam Medis" )
			->setCellValue ( "E1", "Nama Pasien" )
			->setCellValue ( "F1", "Co Ass / PPDGS" )
			->setCellValue ( "G1", "DPJP" )
			->setCellValue ( "H1", "Perawatan" )
			->setCellValue ( "I1", "Biaya" )
			->setCellValue ( "J1", "Status" );
/*end - BLOCK HEADER*/

/* start - BLOCK MEMASUKAN DATABASE*/
	//ganti dengan database anda
    $result = mysqli_query($link, "SELECT 	tabel_kunjugan.id_kunjungan,
    tabel_kunjugan.id_klinik,
    tabel_kunjugan.dokter_pendamping,
    tabel_kunjugan.id_dokter,
    tabel_kunjugan.id_pasien,
    tabel_kunjugan.tanggal_pembayaran,
    tabel_kunjugan.status_pembayaran,
    tabel_kunjugan.tanggal_kunjungan,
    data_dokter.nama AS nama_dokter,
    data_pasien.nama AS nama_pasien
    FROM tabel_kunjugan
    LEFT JOIN data_dokter ON tabel_kunjugan.id_dokter = data_dokter.id
    LEFT JOIN data_pasien ON tabel_kunjugan.id_pasien = data_pasien.no_rekam_medis
    WHERE  id_klinik LIKE '%$klinik%' AND `tanggal_kunjungan` BETWEEN '$tawal' AND '$takhir'  ".$bagianWhere." ");
    $nomor_row  = 1;
    $nomor  = 1;
while ($row = mysqli_fetch_array($result)) {
        $nomor++;
        $data_kunjungan = jumlah_layanan($row["id_kunjungan"]);
        $data_obat = jumlah_obat($row["id_kunjungan"]);

        $harga						= ($data_kunjungan + $data_obat);

        $status = "";
        if($row["status_pembayaran"] == '2'){
            $status = "LUNAS";
        }else{
            $status = "CICILAN";
        }


        $perawatan =  get_perawatan($row["id_kunjungan"]);
		$sheet	->setCellValue ( "A".$nomor, $nomor_row )
				->setCellValue ( "B".$nomor, $row["tanggal_kunjungan"] )
				->setCellValue ( "C".$nomor, $row["tanggal_pembayaran"] )
				->setCellValue ( "D".$nomor, $row["id_pasien"] )
				->setCellValue ( "E".$nomor, $row["nama_pasien"] )
				->setCellValue ( "F".$nomor, $row["dokter_pendamping"] )
				->setCellValue ( "G".$nomor, $row["nama_dokter"] )
				->setCellValue ( "H".$nomor,  $perawatan	 )
                ->setCellValue ( "I".$nomor, $harga )
                ->setCellValue ( "J".$nomor, $status );
                $nomor_row++;
	}
/* end - BLOCK MEMASUKAN DATABASE*/

/* start - BLOCK MEMBUAT LINK DOWNLOAD*/
	header ( 'Content-Type: application/vnd.ms-excel' );
	//namanya adalah keluarga.xls
	header ( 'Content-Disposition: attachment;filename="laporan_kasir.xls"' ); 
	header ( 'Cache-Control: max-age=0' );
	$writer = PHPExcel_IOFactory::createWriter ( $file, 'Excel5' );
	$writer->save ( 'php://output' );
/* start - BLOCK MEMBUAT LINK DOWNLOAD*/


?>