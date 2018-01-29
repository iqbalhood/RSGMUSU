<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");



if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);
 
    $idKunjungan                    = $request->idKunjungan;
    $idAntrian                      = $request->idAntrian;
    $idPasien                       = $request->idPasien;

    $kebersihanMulut                = $request->kebersihanMulut;

    $mukosaBukal                    = $request->mukosaBukal;
    $kelainanMukosaBukal            = $request->kelainanMukosaBukal;

    $mukosaLabial                   = $request->mukosaLabial;
    $kelainanMukosaLabial           = $request->kelainanMukosaLabial;

    $frenulumLabial                 = $request->frenulumLabial;
    $kelainanFrenulumLabial         = $request->kelainanFrenulumLabial;

    $lidah                          = $request->lidah;
    $kelainanLidah                  = $request->kelainanLidah;

    $palatum                        = $request->palatum;
    $kelainanPalatum                = $request->kelainanPalatum;
    
    $tonsil                         = $request->tonsil;
    $kelainanTonsil                 = $request->kelainanTonsil;

    $dasarMulut                     = $request->dasarMulut;
    $kelainanDasarMulut             = $request->kelainanDasarMulut;

    $gingiva                        = $request->gingiva;
    $kelainanGigiva                 = $request->kelainanGigiva;

    $keteranganJaringanLunakMulut   = $request->keteranganJaringanLunakMulut;
    


    $sql = "INSERT INTO `rm_jaringan_lunak_mulut` (`id`, `id_kunjungan`, `id_antrian`, `id_pasien`, `kebersihan_mulut`, 
                                                    `mukosa_bukal`, `kelainan_mukosa_bukal`,
                                                    `mukosa_labial`, `kelainan_mukosa_labial`,
                                                    `frenulum_labial`, `kelainan_frenulum_labial`,
                                                    `lidah`, `kelainan_lidah`,
                                                    `palatum`, `kelainan_palatum`,
                                                    `tonsil`, `kelainan_tonsil`, 
                                                    `dasar_mulut`, `kelainan_dasar_mulut`,
                                                    `gingiva`, `kelainan_gingiva`,
                                                    `keterangan_jaringan_lunak_mulut`) 
                                                           
             VALUES                               (NULL, '$idKunjungan', '$idAntrian', '$idPasien', '$kebersihanMulut',
                                                     '$mukosaBukal', '$kelainanMukosaLabial',
                                                     '$mukosaLabial', '$kelainanMukosaLabial',
                                                     '$frenulumLabial', '$kelainanFrenulumLabial',
                                                     '$lidah', '$kelainanLidah', 
                                                     '$palatum', '$kelainanPalatum',
                                                     '$tonsil', '$kelainanTonsil',
                                                     '$dasarMulut', '$kelainanDasarMulut', 
                                                     '$gingiva', '$kelainanGigiva', 
                                                     '$keteranganJaringanLunakMulut');";



    mysqli_query($connect,$sql);
    

}
exit;