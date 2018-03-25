<?php 
//echo $_GET['kunjungan'];
$total_layanan = 0;

$response = array();

// include db connect class
require_once 'db_connect.php';

$id = $_GET['kunjungan'];

// ckonekin ke db
//  $db = new DB_CONNECT();

$total_cicilan = 0;
	 
	//  get by event
	$result = mysql_query("SELECT * FROM `tabel_cicilan` WHERE id_kunjugan = '$id' ") or die(mysql_error());
        // cek
        
        $no = 1;
		if (mysql_num_rows($result) > 0) {
		    // looping hasil
		    // event node
        $response["event"] = array();    
	    while ($row = mysql_fetch_array($result)) {
			$event 							    = array();			
			$event["id_kunjugan"] 				= $row["id_kunjugan"];
			$keterangan 			    = $row["keterangan"];
			$biaya 		            = $row["biaya"];
			$tanggal 			        = $row["tanggal"];
            $tampil_cicilan = number_format($biaya, 0,".",".");
            $total_cicilan += $biaya;

        //     echo ("<tr style='mso-yfti-irow:1;height:14.45pt'>
        //     <td width=28 valign=top style='width:28.1pt;border:solid windowtext 1.0pt;
        //     border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
        //     padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt'>
        //     <p class=MsoNormal style='mso-element:frame;mso-element-frame-hspace:9.0pt;
        //     mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
        //     page;mso-element-left:2.15pt;mso-element-top:3.6pt;mso-height-rule:exactly'><span
        //     style='font-size:9.0pt'>$no<o:p></o:p></span></p>
        //     </td>
        //     <td width=153 valign=top style='width:153.4pt;border-top:none;border-left:
        //     none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
        //     mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
        //     mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt'>
        //     <p class=MsoNormal style='mso-element:frame;mso-element-frame-hspace:9.0pt;
        //     mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
        //     page;mso-element-left:2.15pt;mso-element-top:3.6pt;mso-height-rule:exactly'><span
        //     style='font-size:9.0pt'>$tanggal<o:p></o:p></span></p>
        //     </td>
        //     <td width=138 valign=top style='width:138.4pt;border-top:none;border-left:
        //     none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
        //     mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
        //     mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt'>
        //     <p class=MsoNormal style='mso-element:frame;mso-element-frame-hspace:9.0pt;
        //     mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
        //     page;mso-element-left:2.15pt;mso-element-top:3.6pt;mso-height-rule:exactly'><span
        //     style='font-size:9.0pt'>$keterangan<o:p></o:p></span></p>
        //     </td>
        
        //     <td width=85 valign=top style='width:3.0cm;border-top:none;border-left:none;
        //     border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
        //     mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
        //     mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt'>
        //     <p class=MsoNormal style='mso-element:frame;mso-element-frame-hspace:9.0pt;
        //     mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
        //     page;mso-element-left:2.15pt;mso-element-top:3.6pt;mso-height-rule:exactly'><span
        //     class=SpellE><span style='font-size:9.0pt'>Rp. $biaya<o:p></o:p></span></p>
        //     </td>
        //    </tr>");


           echo (" <tr style='mso-yfti-irow:4;height:12.7pt'>
            <td width=28 valign=top style='width:28.1pt;border:solid windowtext 1.0pt;
            border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
            padding:0cm 5.4pt 0cm 5.4pt;height:12.7pt'>
            <p class=MsoNormal style='mso-element:frame;mso-element-frame-hspace:9.0pt;
            mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
            page;mso-element-left:2.15pt;mso-element-top:3.6pt;mso-height-rule:exactly'><span
            style='font-size:9.0pt'>$no<o:p></o:p></span></p>
            </td>
            <td width=153 valign=top style='width:153.4pt;border-top:none;border-left:
            none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
            mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
            mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:12.7pt'>
            <p class=MsoNormal style='mso-element:frame;mso-element-frame-hspace:9.0pt;
            mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
            page;mso-element-left:2.15pt;mso-element-top:3.6pt;mso-height-rule:exactly'><span
            class=SpellE><span style='font-size:9.0pt'>$tanggal</span></span><span
            style='font-size:9.0pt'><o:p></o:p></span></p>
            </td>
            <td width=244 colspan=2 valign=top style='width:243.5pt;border-top:none;
            border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
            mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
            mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:12.7pt'>
            <p class=MsoNormal style='mso-element:frame;mso-element-frame-hspace:9.0pt;
            mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
            page;mso-element-left:2.15pt;mso-element-top:3.6pt;mso-height-rule:exactly'><span
            class=SpellE><span style='font-size:9.0pt'></span></span><span
            style='font-size:9.0pt'>$keterangan<o:p></o:p></span></p>
            </td>
            <td width=85 valign=top style='width:3.0cm;border-top:none;border-left:none;
            border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
            mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
            mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:12.7pt'>
            <p class=MsoNormal style='mso-element:frame;mso-element-frame-hspace:9.0pt;
            mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
            page;mso-element-left:2.15pt;mso-element-top:3.6pt;mso-height-rule:exactly'><span
            class=SpellE><span style='font-size:9.0pt'>Rp</span></span><span
            style='font-size:9.0pt'>. $tampil_cicilan<o:p></o:p></span></p>
            </td>
           </tr>");


			
			$no++;
		 }
		  
		} 



?>