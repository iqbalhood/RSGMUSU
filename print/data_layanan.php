<?php 
//echo $_GET['kunjungan'];
$total_layanan = 0;

$response = array();

// include db connect class
require_once 'db_connect.php';

$id = $_GET['kunjungan'];

// ckonekin ke db
$db = new DB_CONNECT();
	 
	//  get by event
	$result = mysql_query("SELECT * FROM `tabel_layanan_kunjungan` WHERE `id_kunjungan` = $id  ") or die(mysql_error());
        // cek
        
        $no = 1;
		if (mysql_num_rows($result) > 0) {
		    // looping hasil
		    // event node
        $response["event"] = array();    
	    while ($row = mysql_fetch_array($result)) {
			$event 							= array();			
			$event["id"] 			        = $row["id"];
			$nama_layanan 			= $row["nama_layanan"];
			$harga_bahan 			= $row["harga_bahan"];
            $harga_layanan 		= $row["harga_layanan"];

            $total = $harga_bahan + $harga_layanan;
            $total_layanan += $total;

            $format_harga_bahan = number_format($harga_bahan, 0,".",".");
            $format_harga_layanan = number_format($harga_layanan, 0,".",".");
            $format_total = number_format($total, 0,".",".");
            

            echo ("<tr style='mso-yfti-irow:1;height:14.45pt'>
            <td width=28 valign=top style='width:28.1pt;border:solid windowtext 1.0pt;
            border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
            padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt'>
            <p class=MsoNormal style='mso-element:frame;mso-element-frame-hspace:9.0pt;
            mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
            page;mso-element-left:2.15pt;mso-element-top:3.6pt;mso-height-rule:exactly'><span
            style='font-size:9.0pt'>$no<o:p></o:p></span></p>
            </td>
            <td width=153 valign=top style='width:153.4pt;border-top:none;border-left:
            none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
            mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
            mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt'>
            <p class=MsoNormal style='mso-element:frame;mso-element-frame-hspace:9.0pt;
            mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
            page;mso-element-left:2.15pt;mso-element-top:3.6pt;mso-height-rule:exactly'><span
            style='font-size:9.0pt'>$nama_layanan<o:p></o:p></span></p>
            </td>
            <td width=138 valign=top style='width:138.4pt;border-top:none;border-left:
            none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
            mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
            mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt'>
            <p class=MsoNormal style='mso-element:frame;mso-element-frame-hspace:9.0pt;
            mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
            page;mso-element-left:2.15pt;mso-element-top:3.6pt;mso-height-rule:exactly'><span
            style='font-size:9.0pt'>Rp. $format_harga_bahan<o:p></o:p></span></p>
            </td>
            <td width=105 valign=top style='width:105.1pt;border-top:none;border-left:
            none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
            mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
            mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt'>
            <p class=MsoNormal style='mso-element:frame;mso-element-frame-hspace:9.0pt;
            mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
            page;mso-element-left:2.15pt;mso-element-top:3.6pt;mso-height-rule:exactly'><span style='font-size:9.0pt'>Rp. $format_harga_layanan<o:p></o:p></span></p>
            </td>
            <td width=85 valign=top style='width:3.0cm;border-top:none;border-left:none;
            border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
            mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
            mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt'>
            <p class=MsoNormal style='mso-element:frame;mso-element-frame-hspace:9.0pt;
            mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
            page;mso-element-left:2.15pt;mso-element-top:3.6pt;mso-height-rule:exactly'><span
            class=SpellE><span style='font-size:9.0pt'>Rp. $format_total<o:p></o:p></span></p>
            </td>
           </tr>");


			
			$no++;
		 }
		  
		} 



?>