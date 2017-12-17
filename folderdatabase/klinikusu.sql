-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 14, 2017 at 01:24 
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `klinikusu`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_dokter`
--

CREATE TABLE IF NOT EXISTS `data_dokter` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `nama` varchar(300) NOT NULL,
  `jenis_kelamin` varchar(1) NOT NULL,
  `nomor_hp` varchar(24) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `data_dokter`
--

INSERT INTO `data_dokter` (`id`, `nama`, `jenis_kelamin`, `nomor_hp`) VALUES
(1, 'dr H Boyke Dian Nugraha SpOG MARS', '1', '081285000336'),
(2, 'Teuku Adifitrian', '1', '081285000335'),
(3, 'Ryan Thamrin', '1', '082368008555'),
(4, 'Dr Farah Quinn', '2', '082368008333'),
(5, 'Dr Jamin Ginting', '1', '081265558638');

-- --------------------------------------------------------

--
-- Table structure for table `data_layanan`
--

CREATE TABLE IF NOT EXISTS `data_layanan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `layanan` varchar(300) NOT NULL,
  `bahan` text NOT NULL,
  `harga_bahan` int(255) NOT NULL,
  `idklinik` int(11) NOT NULL,
  `harga_koas` int(11) NOT NULL,
  `harga_drg` int(11) NOT NULL,
  `harga_drgsp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `data_layanan`
--

INSERT INTO `data_layanan` (`id`, `layanan`, `bahan`, `harga_bahan`, `idklinik`, `harga_koas`, `harga_drg`, `harga_drgsp`) VALUES
(3, 'Ekstraksi gigi', 'Povidone Iodine needle syringe anastesi tampon kassa masker handschoen hemostatika', 25000, 7, 10000, 150000, 200000),
(4, 'Ekstraksi komplikasi', 'Povidone Iodine needle syringe anastesimata bur tulang tampon kassa masker handschoen hemostatika', 25000, 7, 25000, 200000, 300000),
(5, 'Pemolesan tindakan setelah skeling', 'Masker Spuit  Povidone iodine Gelas Kumur PolibibCelemek pasien obat kumur Strerilization Solution Alkohol Kasa Tissue Saliva Ejector', 10000, 2, 15000, 20000, 20000),
(6, 'Pemeriksaan dan Penskeleran Rahang Atas  Rahang Bawah', 'Sarung tangan Masker Disclosing  Solution Spuit  Povidone iodine Gelas Kumur', 32000, 2, 30000, 100000, 200000),
(7, 'Oral Diagnosa Dental Health Education  Oral Profilaxis', 'dacrcpppbrhvas', 0, 4, 40000, 100000, 150000),
(8, 'ANESTESI TOPIKAL', 'crcpceaibtn', 0, 4, 16000, 0, 0),
(9, 'GTP Akrilik RARB', 'alginate elastomer wax merah gips dental stone green kerr resin akrilik swapolimerisasi anasir', 1500000, 6, 650000, 3000000, 3500000),
(10, 'GTSL Akrilik Per rahang', 'alginate elastomer wax merah gips dental stone green kerr shellac resin akrilik anasir klamer', 500000, 6, 350000, 900000, 1000000),
(11, 'kasus', 'kassa steril spatula masker handscoon celemek dettol antiseptik dettol hand wash', 15000, 3, 25000, 100000, 150000),
(12, 'kontrol', 'kassa steril spatula masker handscoon celemek dettol antiseptik dettol hand wash', 15000, 3, 10000, 50000, 100000),
(13, 'Topikal Aplikasi FlourAF RA dan RB', 'none', 0, 1, 25000, 0, 0),
(14, 'KONSULTASI  DIAGNOSA', 'none', 0, 5, 10000, 30000, 50000),
(15, 'KONTROLRECALLPOLISH', 'none', 0, 5, 10000, 30000, 50000),
(16, 'Foto Periapikal', 'none', 0, 9, 15000, 35000, 35000),
(17, 'Foto Oklusal', 'none', 0, 9, 25000, 40000, 40000),
(18, 'Pencetakan Fixed', 'alginate aroma gips stone', 500000, 8, 0, 125000, 0),
(19, 'Perawatan Fungsional', 'kertas tracing gips stone alginate aroma tip suction  saliva ejector', 1000000, 8, 0, 250000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `data_obat`
--

CREATE TABLE IF NOT EXISTS `data_obat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(300) NOT NULL,
  `quantity` varchar(300) NOT NULL,
  `satuan` varchar(300) NOT NULL,
  `harga` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `data_obat`
--

INSERT INTO `data_obat` (`id`, `nama`, `quantity`, `satuan`, `harga`) VALUES
(1, 'Paracetamol', '20', 'Papanw', 2000000),
(2, 'Panadol', '15', 'Botol 500 Ml', 300000),
(6, 'liquid', '12', 'sachet', 500000);

-- --------------------------------------------------------

--
-- Table structure for table `data_pasien`
--

CREATE TABLE IF NOT EXISTS `data_pasien` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `no_registrasi` varchar(20) NOT NULL,
  `tgl_registrasi` date NOT NULL,
  `nama` varchar(200) NOT NULL,
  `tempat_lahir` varchar(20) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `jenis_kelamin` varchar(200) NOT NULL,
  `agama` varchar(20) NOT NULL,
  `alamat` varchar(200) NOT NULL,
  `rtrw` varchar(10) NOT NULL,
  `kelurahan` varchar(20) NOT NULL,
  `kecamatan` varchar(20) NOT NULL,
  `kabupaten` varchar(20) NOT NULL,
  `propinsi` varchar(20) NOT NULL,
  `nomor_hp` varchar(200) NOT NULL,
  `kewarganegaraan` varchar(20) NOT NULL,
  `noktp` varchar(50) NOT NULL,
  `pendidikan` varchar(20) NOT NULL,
  `pekerjaan` varchar(20) NOT NULL,
  `status_perkawinan` varchar(10) NOT NULL,
  `tgl_pertama_masuk` date NOT NULL,
  `cara_bayar` varchar(20) NOT NULL,
  `tujuan_kunjungan_pertama` varchar(50) NOT NULL,
  `alergi` varchar(100) NOT NULL,
  `catatan` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `data_pasien`
--

INSERT INTO `data_pasien` (`id`, `no_registrasi`, `tgl_registrasi`, `nama`, `tempat_lahir`, `tanggal_lahir`, `jenis_kelamin`, `agama`, `alamat`, `rtrw`, `kelurahan`, `kecamatan`, `kabupaten`, `propinsi`, `nomor_hp`, `kewarganegaraan`, `noktp`, `pendidikan`, `pekerjaan`, `status_perkawinan`, `tgl_pertama_masuk`, `cara_bayar`, `tujuan_kunjungan_pertama`, `alergi`, `catatan`) VALUES
(1, '', '0000-00-00', '$newName', '', '0000-00-00', '$newKelamin', '', '', '', '', '', '', '', '$newPhone', '', '', '', '', '', '0000-00-00', '', '', '', ''),
(2, '', '0000-00-00', '$newName', '', '0000-00-00', '$newKelamin', '', '', '', '', '', '', '', '$newPhone', '', '', '', '', '', '0000-00-00', '', '', '', ''),
(3, '', '0000-00-00', '$newName', '', '0000-00-00', '$newKelamin', '', '', '', '', '', '', '', '$newPhone', '', '', '', '', '', '0000-00-00', '', '', '', ''),
(4, '', '0000-00-00', '$newName', '', '0000-00-00', '$newKelamin', '', '', '', '', '', '', '', '$newPhone', '', '', '', '', '', '0000-00-00', '', '', '', ''),
(5, '', '0000-00-00', '$newName', '', '0000-00-00', '$newKelamin', '', '', '', '', '', '', '', '$newPhone', '', '', '', '', '', '0000-00-00', '', '', '', ''),
(6, '', '0000-00-00', 'fahrul', '', '0000-00-00', 'Pria', '', '', '', '', '', '', '', '0812', '', '', '', '', '', '0000-00-00', '', '', '', ''),
(7, '111', '2017-01-01', 'fahrul', 'medan', '2017-01-01', '1', '', 'jl ahmad dahlan no ', '', 'buntu', 't morawa', 'deli serdang', 'sumatera utara', '081112341234', 'wni', '11207865121', 's', 'developer', 'menikah', '2017-01-01', '', '', 'obat nyamuk', 'panjang'),
(8, '1212', '2017-01-01', 'gondo', 'medan', '2017-01-01', '2', '', 'medan', '', 'medan', 'medan', 'medan', 'sumut', '08112123121', 'indonesia', '11201212912', 'S', 'mahasiswa', 'kawin', '2017-01-01', '', '', 'cicak', 'y'),
(9, '1234', '2017-01-01', 'iqbal', 'tebing tinggi', '2017-01-01', '1', '1', 'jl mongonsidi no ', '1', 'anggrung', 'polonia', 'medan', 'sumatera utara', '081112345678', 'indonesia', '112934762329211', 'D3', 'developer', 'belum nika', '2017-01-01', '1', '9', 'tepung', 'coba');

-- --------------------------------------------------------

--
-- Table structure for table `dca_users`
--

CREATE TABLE IF NOT EXISTS `dca_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `akses` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `dca_users`
--

INSERT INTO `dca_users` (`id`, `username`, `password`, `akses`) VALUES
(1, 'iqbal', 'password', '1'),
(2, 'joni', 'joni', '3'),
(4, 'wa', 'gue', '5'),
(5, 'santi', 'santi', '4'),
(6, 'boyke', 'boyke', '2');

-- --------------------------------------------------------

--
-- Table structure for table `statistik`
--

CREATE TABLE IF NOT EXISTS `statistik` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `statistik`
--

INSERT INTO `statistik` (`id`, `nama`) VALUES
(1, 'fdsafdsf');

-- --------------------------------------------------------

--
-- Table structure for table `tabel_kunjugan`
--

CREATE TABLE IF NOT EXISTS `tabel_kunjugan` (
  `id_kunjungan` varchar(200) NOT NULL,
  `id_klinik` int(200) NOT NULL,
  `dokter_pendamping` varchar(300) NOT NULL,
  `id_dokter` int(200) NOT NULL,
  `id_pasien` int(200) NOT NULL,
  PRIMARY KEY (`id_kunjungan`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tabel_kunjugan`
--
