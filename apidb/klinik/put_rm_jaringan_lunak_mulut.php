<?php
require '../connect.php';

$connect = connect();

// Add the new data to the database.
$postdata = file_get_contents("php://input");



if(isset($postdata) && !empty($postdata))
{
    $request  = json_decode($postdata);

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
    $kelainanGingiva                 = $request->kelainanGingiva;

    $keteranganJaringanLunakMulut   = $request->keteranganJaringanLunakMulut;
    

    $result = mysqli_query($connect,"SELECT * FROM `rm_ekstra_oral` WHERE `id_pasien` = '$idPasien'");

    if (mysqli_num_rows($result) > 0) {

        $sql = "UPDATE `rm_jaringan_lunak_mulut` SET
        `kebersihan_mulut`          = '$kebersihanMulut',
        `mukosa_bukal`              = '$mukosaBukal', 
        `kelainan_mukosa_bukal`     = '$kelainanMukosaBukal',
        `mukosa_labial`             = '$mukosaLabial',
        `kelainan_mukosa_labial`    = '$kelainanMukosaLabial', 
        `frenulum_labial`           = '$frenulumLabial',
        `kelainan_frenulum_labial`  = '$kelainanFrenulumLabial',
        `lidah`                     = '$lidah', 
        `kelainan_lidah`            = '$kelainanLidah',
        `palatum`                   = '$palatum', 
        `kelainan_palatum`          = '$kelainanPalatum',
        `tonsil`                    = '$tonsil', 
        `kelainan_tonsil`           = '$kelainanTonsil', 
        `dasar_mulut`               = '$dasarMulut', 
        `kelainan_dasar_mulut`      = '$kelainanDasarMulut', 
        `gingiva`                   = '$gingiva',
        `kelainan_gingiva`          = '$kelainanGingiva',
        `keterangan_jaringan_lunak_mulut` = '$keteranganJaringanLunakMulut' 
                  
        WHERE `rm_jaringan_lunak_mulut`.`id_pasien` = '$idPasien';";


        mysqli_query($connect,$sql);



    }else{

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
               
        VALUES                               (NULL, '', '', '$idPasien', '$kebersihanMulut',
         '$mukosaBukal', '$kelainanMukosaLabial',
         '$mukosaLabial', '$kelainanMukosaLabial',
         '$frenulumLabial', '$kelainanFrenulumLabial',
         '$lidah', '$kelainanLidah', 
         '$palatum', '$kelainanPalatum',
         '$tonsil', '$kelainanTonsil',
         '$dasarMulut', '$kelainanDasarMulut', 
         '$gingiva', '$kelainanGingiva', 
         '$keteranganJaringanLunakMulut');";

        mysqli_query($connect,$sql);

    }


   
    

}
exit;