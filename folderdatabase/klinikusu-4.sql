-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 28, 2018 at 06:15 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `klinikusu`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_dokter`
--

CREATE TABLE `data_dokter` (
  `id` int(8) NOT NULL,
  `nama` varchar(300) NOT NULL,
  `jenis_kelamin` varchar(1) NOT NULL,
  `nomor_hp` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_dokter`
--

INSERT INTO `data_dokter` (`id`, `nama`, `jenis_kelamin`, `nomor_hp`) VALUES
(1, 'dr. Dian Nugraha', '1', '081285000336'),
(2, 'dr. Teuku Adifitrian', '1', '081285000335'),
(3, 'dr. Ryan Baskoro', '1', '082368008555'),
(4, 'dr. Maruli Siregar', '2', '082368008333');

-- --------------------------------------------------------

--
-- Table structure for table `data_layanan`
--

CREATE TABLE `data_layanan` (
  `id` int(11) NOT NULL,
  `layanan` varchar(300) NOT NULL,
  `bahan` text NOT NULL,
  `harga_bahan` int(255) NOT NULL,
  `idklinik` int(11) NOT NULL,
  `harga_koas` int(11) NOT NULL,
  `harga_drg` int(11) NOT NULL,
  `harga_drgsp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

CREATE TABLE `data_obat` (
  `id` int(11) NOT NULL,
  `nama` varchar(300) NOT NULL,
  `quantity` varchar(300) NOT NULL,
  `satuan` varchar(300) NOT NULL,
  `harga` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_obat`
--

INSERT INTO `data_obat` (`id`, `nama`, `quantity`, `satuan`, `harga`) VALUES
(1, 'Paracetamol', '15', 'Papan', 2000000),
(2, 'Panadol', '15', 'Botol 500 Ml', 300000),
(3, 'Liquid Chlorophyll', '15', 'Botol 800 Mg', 600000),
(4, 'Alkohol', '13', 'Liter', 5000000);

-- --------------------------------------------------------

--
-- Table structure for table `data_pasien`
--

CREATE TABLE `data_pasien` (
  `id` int(20) NOT NULL,
  `no_rekam_medis` varchar(20) NOT NULL,
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
  `status_perkawinan` varchar(30) NOT NULL,
  `tgl_pertama_masuk` date NOT NULL,
  `cara_bayar` varchar(20) NOT NULL,
  `tujuan_kunjungan_pertama` varchar(50) NOT NULL,
  `alergi` varchar(100) NOT NULL,
  `catatan` text NOT NULL,
  `tinggi_badan` varchar(20) NOT NULL,
  `berat_badan` varchar(20) NOT NULL,
  `golongan_darah` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_pasien`
--

INSERT INTO `data_pasien` (`id`, `no_rekam_medis`, `tgl_registrasi`, `nama`, `tempat_lahir`, `tanggal_lahir`, `jenis_kelamin`, `agama`, `alamat`, `rtrw`, `kelurahan`, `kecamatan`, `kabupaten`, `propinsi`, `nomor_hp`, `kewarganegaraan`, `noktp`, `pendidikan`, `pekerjaan`, `status_perkawinan`, `tgl_pertama_masuk`, `cara_bayar`, `tujuan_kunjungan_pertama`, `alergi`, `catatan`, `tinggi_badan`, `berat_badan`, `golongan_darah`) VALUES
(7, '111', '2017-01-01', 'Fahri Hamzah', 'Medan', '1965-11-10', '1', '1', 'Jalan Sekolah Pembangunan no89', '009/009', 'buntu', 't morawa', 'deli serdang', 'sumatera utara', '081112341234', 'wni', '11207865121', 's', 'developer', '1', '2017-01-01', '1', '1', 'obat nyamuk', 'panjang', '165', '80', 'A'),
(8, '1212', '2017-01-01', 'Simponi Nusantara', 'Medan', '1986-10-09', '2', '', 'Jalan Sei Serayu No 85 Babura', '', 'Babura Sunggal', 'Medan Sunggal', 'Medan', 'sumut', '08112123121', 'indonesia', '11201212912', 'S', 'mahasiswa', '1', '2017-01-01', '', '', 'cicak', 'y', '165', '80', 'O'),
(9, '1234', '2017-01-01', 'Mohammad Iqbal', 'Tebing Tinggi', '1991-01-14', '1', '1', 'Jalan Sekolah Pembangunan No7a Medan Sunggal', '1', 'anggrung', 'polonia', 'medan', 'sumatera utara', '081112345678', 'indonesia', '112934762329211', 'D3', 'developer', '', '2017-01-01', '1', '1', 'tepung', 'coba', '165', '80', 'B'),
(10, '1234', '2017-01-01', 'Malika Kedelai Hitam', 'Tebing Tinggi', '1986-07-12', '2', '1', 'Jalan Sekolah Pembangunan No7a Medan Sunggal', '1', 'anggrung', 'polonia', 'medan', 'sumatera utara', '081112345678', 'indonesia', '112934762329211', 'D3', 'developer', '', '2017-01-01', '1', '1', 'tepung', 'coba', '165', '80', 'AB'),
(11, '1212', '2017-01-01', 'Shania Junianatha', 'Medan', '1998-06-27', '2', '3', 'Jalan Sei Serayu No 85 Babura', '001/001', 'Babura Sunggal', 'Medan Sunggal', 'Medan', 'sumut', '08112123121', 'indonesia', '11201212912', 'SMA', 'mahasiswa', '', '2017-01-01', '1', '2', 'cicak', 'y', '165', '80', 'A'),
(12, '31422', '2017-01-01', 'Tiada Lagi Melodi', 'Medan', '1994-01-11', '2', '1', 'Jalan Sei Serayu No 85 Babura', '009/009', 'Babura Sunggal', 'Medan Sunggal', 'Medan', 'sumut', '08112123121', 'indonesia', '11201212912', 'S', 'mahasiswa', '', '2017-01-01', '1', '1', 'cicak', 'y', '159', '55', 'B'),
(13, '312131', '0000-00-00', 'Martin Leo Sitepu', 'Medan', '1994-09-20', '1', '1', 'Jalan Mongonsidi No6 Medan', '001/001', 'Anggrung', 'Medan Polonia', 'Medan', 'Sumatera Utara', '082368008333', 'Indonesia', '1411368008333', 'S1', 'Tukang Ikan', '1', '2018-01-27', '2', '2', 'KUCING', 'Orangnya Baik Bangetttt', '170', '66', 'O'),
(14, '1515406432910', '0000-00-00', 'Martin Sinambela', 'Medan', '1984-01-18', '1', '3', 'Jalan Sekolah Pembangunan', '09/56', 'Kampung Kelumpang', 'Medan Baru', 'Medan', 'Sumatera Utara', '08235688998998', 'Indonesia', '123455121232', 'S3', 'Kuliahan', '1', '2018-01-11', '1', '1', 'Susu', 'Susu Kuda Liar Dia tak bisa', '190', '80', 'B'),
(15, '1516011146877', '0000-00-00', 'Babe Cabita', 'Medan', '1995-03-08', '1', '1', 'Jl Ps 1 Tj Sari Medan Selayang Kota Medan Sumatera Utara 20154', '005/005', 'Tj Sari', 'Medan Selayang', 'Medan', 'Sumatera Utara', '08112642109', 'Indonesia', '14098071679699797', 'S1', 'Standup Comedian', '2', '2018-01-23', '2', '6', 'Alergi Ikan Lele', 'Lumayan Lucu Lah', '165', '80', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `dca_users`
--

CREATE TABLE `dca_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `akses` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dca_users`
--

INSERT INTO `dca_users` (`id`, `username`, `password`, `akses`) VALUES
(1, 'iqbal', 'password', '1'),
(2, 'joni', 'joni', '3'),
(3, 'dokter', 'dokter', '2'),
(4, 'dede', 'dede', '3'),
(5, 'dodi', 'dodi', '1'),
(9, 'didi', 'didi', '1'),
(11, 'duda', 'duda', '1');

-- --------------------------------------------------------

--
-- Table structure for table `ondontograma`
--

CREATE TABLE `ondontograma` (
  `id` int(11) NOT NULL,
  `id_kunjungan` varchar(30) NOT NULL,
  `id_antrian` varchar(30) NOT NULL,
  `id_pasien` varchar(30) NOT NULL,
  `keterangan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ondontograma`
--

INSERT INTO `ondontograma` (`id`, `id_kunjungan`, `id_antrian`, `id_pasien`, `keterangan`) VALUES
(7, '1515572197437', '1516117127920', '14', '[{"teeth":41,"explaination":"Gigi Hilang","keterangan":"vvvv","$$hashKey":"object:16"},{"teeth":42,"explaination":"Anomali Bentuk","keterangan":"vvvv","$$hashKey":"object:18"}]'),
(9, '1515570329227', '1515570329227', '13', '[{"teeth":46,"explaination":"Belum Erupsi","keterangan":"SUSU KEDELAI","url":"../img/small/belum_erupsi.png","$$hashKey":"object:16"},{"teeth":41,"explaination":"Gigi Hilang","keterangan":"SUSU KEDELAI","url":"../img/small/gigi_hilang.png","$$hashKey":"object:18"}]');

-- --------------------------------------------------------

--
-- Table structure for table `perawatan`
--

CREATE TABLE `perawatan` (
  `id` int(30) NOT NULL,
  `id_pasien` varchar(30) NOT NULL,
  `id_antrian` varchar(30) NOT NULL,
  `id_klinik` varchar(30) NOT NULL,
  `element` text NOT NULL,
  `diagnosa` text NOT NULL,
  `perawatan` text NOT NULL,
  `id_dokter` varchar(30) NOT NULL,
  `nama_dokter` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `perawatan`
--

INSERT INTO `perawatan` (`id`, `id_pasien`, `id_antrian`, `id_klinik`, `element`, `diagnosa`, `perawatan`, `id_dokter`, `nama_dokter`) VALUES
(13, '10', '1515574323896', '9', 'Tenggorokan Sakit', 'Salah Minum', 'Rawat Inap', '3', 'dr. Ryan Baskoro'),
(14, '10', '1515574323896', '9', 'P19, P20', 'Salah Makan ', 'Diberi Vitamin', '3', 'dr. Ryan Baskoro'),
(15, '14', '1515572197437', '1', 'P18', 'Nyeri Gigi', 'Gigi Di Tambal', '1', 'dr. Dian Nugraha'),
(17, '10', '1514616829448', '9', 'Y', 'Y', 'Y', '3', 'dr. Ryan Baskoro'),
(18, '12', '1516884068592', '9', 'Y', 'Y', 'X', '3', 'dr. Ryan Baskoro');

-- --------------------------------------------------------

--
-- Table structure for table `rekam_medis`
--

CREATE TABLE `rekam_medis` (
  `id_kunjungan` varchar(20) NOT NULL,
  `id_pasien` varchar(20) NOT NULL,
  `id_dokter` varchar(20) NOT NULL,
  `nama_dokter` text NOT NULL,
  `amnese` text NOT NULL,
  `diagnosa` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rekam_medis`
--

INSERT INTO `rekam_medis` (`id_kunjungan`, `id_pasien`, `id_dokter`, `nama_dokter`, `amnese`, `diagnosa`) VALUES
('1513573922711 ', '9', '3', 'dr. Ryan Baskoro', 'Iqbal Muhammad Fajri', 'Sakit Demam'),
('1513584794436 ', '7', '1', 'dr. Dian Nugraha', 'Contoh Anamnese', 'Contoh Diagnosa'),
('1513842542159 ', '7', '2', 'dr. Teuku Adifitrian', 'Contoh', 'Contoh'),
('1513844347015 ', '9', '1', 'dr. Dian Nugraha', 'contoh anamnese', 'contoh diagnosa'),
('1514435747068 ', '12', '4', 'dr. Maruli Siregar', 'sdfasfasfa', 'asfdasfdafsd'),
('1514449206314 ', '11', '1', 'dr. Dian Nugraha', 'Anamnese', 'Diagnosa'),
('1514616829448 ', '10', '3', 'dr. Ryan Baskoro', 'Y', 'Y'),
('1515423830705 ', '14', '2', 'dr. Teuku Adifitrian', 'Anamnese', 'Diagnosa'),
('1515572197437 ', '14', '3', 'dr. Ryan Baskoro', 'Contoh', 'Contoh'),
('1515574323896 ', '9', '3', 'dr. Ryan Baskoro', 'Anamnese', 'Diagnoes'),
('1516829258082 ', '10', '2', 'dr. Teuku Adifitrian', 'Anamnese', 'Diagnosa Paeien'),
('1516882014306 ', '7', '1', 'dr. Dian Nugraha', 'sadasfasdfa', 'safddasfas'),
('1516884068592 ', '12', '3', 'dr. Ryan Baskoro', 'Y', 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `rm_ekstra_oral`
--

CREATE TABLE `rm_ekstra_oral` (
  `tonus_bibir` varchar(300) NOT NULL,
  `tmj` varchar(300) NOT NULL,
  `kelenjar_limfe` varchar(300) NOT NULL,
  `kelainan_tmj` text NOT NULL,
  `keterangan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rm_jaringan_lunak_mulut`
--

CREATE TABLE `rm_jaringan_lunak_mulut` (
  `id` int(30) NOT NULL,
  `id_klinik` varchar(30) NOT NULL,
  `id_antrian` varchar(30) NOT NULL,
  `id_pasien` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rm_riwayat_penyakit`
--

CREATE TABLE `rm_riwayat_penyakit` (
  `id` int(2) NOT NULL,
  `id_kunjungan` varchar(30) NOT NULL,
  `id_antrian` varchar(30) NOT NULL,
  `id_pasien` varchar(300) NOT NULL,
  `status_jantung` tinyint(1) NOT NULL,
  `keterangan_jantung` text NOT NULL,
  `status_hipertensi` tinyint(1) NOT NULL,
  `keterangan_hipertensi` text NOT NULL,
  `status_diabetes` tinyint(1) NOT NULL,
  `keterangan_diabetes` text NOT NULL,
  `status_alergi` tinyint(1) NOT NULL,
  `keterangan_alergi` text NOT NULL,
  `status_asma` tinyint(1) NOT NULL,
  `keterangan_asma` text NOT NULL,
  `status_hepar` tinyint(1) NOT NULL,
  `keterangan_hepar` text NOT NULL,
  `status_lambung` tinyint(1) NOT NULL,
  `keterangan_lambung` text NOT NULL,
  `status_lain` tinyint(1) NOT NULL,
  `keterangan_lain` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rm_riwayat_penyakit`
--

INSERT INTO `rm_riwayat_penyakit` (`id`, `id_kunjungan`, `id_antrian`, `id_pasien`, `status_jantung`, `keterangan_jantung`, `status_hipertensi`, `keterangan_hipertensi`, `status_diabetes`, `keterangan_diabetes`, `status_alergi`, `keterangan_alergi`, `status_asma`, `keterangan_asma`, `status_hepar`, `keterangan_hepar`, `status_lambung`, `keterangan_lambung`, `status_lain`, `keterangan_lain`) VALUES
(9, '1515572197437', '1516117127920 ', '14', 1, 'asfdasfsafdsadfas', 0, '', 0, '', 0, '', 0, '', 0, '0', 0, '0', 0, '0');

-- --------------------------------------------------------

--
-- Table structure for table `rm_tanda_vital`
--

CREATE TABLE `rm_tanda_vital` (
  `id` int(11) NOT NULL,
  `id_kunjungan` varchar(30) NOT NULL,
  `id_antrian` varchar(30) NOT NULL,
  `id_pasien` varchar(30) NOT NULL,
  `kesadaran` text NOT NULL,
  `kondisi_umum` text NOT NULL,
  `tekanan_darah` text NOT NULL,
  `denyut_nadi` text NOT NULL,
  `pernafasan` text NOT NULL,
  `suhu` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rm_tanda_vital`
--

INSERT INTO `rm_tanda_vital` (`id`, `id_kunjungan`, `id_antrian`, `id_pasien`, `kesadaran`, `kondisi_umum`, `tekanan_darah`, `denyut_nadi`, `pernafasan`, `suhu`) VALUES
(3, '1515572197437', '1516117127920', '14', 'gg', 'gg', 'ggg', 'gg', 'ggg', 'gg');

-- --------------------------------------------------------

--
-- Table structure for table `tabel_kunjugan`
--

CREATE TABLE `tabel_kunjugan` (
  `id` int(11) NOT NULL,
  `id_kunjungan` varchar(200) NOT NULL,
  `id_antrian` varchar(200) NOT NULL,
  `id_klinik` int(200) NOT NULL,
  `dokter_pendamping` varchar(300) NOT NULL,
  `id_dokter` int(200) NOT NULL,
  `id_pasien` int(200) NOT NULL,
  `status` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tabel_kunjugan`
--

INSERT INTO `tabel_kunjugan` (`id`, `id_kunjungan`, `id_antrian`, `id_klinik`, `dokter_pendamping`, `id_dokter`, `id_pasien`, `status`) VALUES
(1, '1514355581213', '1514355581213', 9, 'Nagita Slavina', 1, 7, '2'),
(2, '1514435747068', '1514435747068', 9, 'Maruli Sirait', 4, 12, '2'),
(3, '1514435747068', '1514448970463', 6, 'Maruli Sirait', 2, 12, '1'),
(4, '1514355581213', '1514448993727', 8, 'Nagita Slavina', 2, 7, '1'),
(5, '1514449206314', '1514449206314', 3, 'IJECK', 1, 11, '2'),
(6, '1514616829448', '1514616829448', 9, 'Doni Mulyanto', 3, 10, '2'),
(7, '1514355581213', '1514616899066', 7, 'Nagita Slavina', 2, 7, '1'),
(8, '1514966341045', '1514966341045', 1, 'Matrino Lio', 3, 12, '1'),
(9, '1515423830705', '1515423830705', 1, 'Martin Luther', 2, 14, '2'),
(10, '1515570329227', '1515570329227', 1, 'Ahmad Albar', 1, 13, '1'),
(11, '1515572197437', '1515572197437', 2, 'Dedi', 3, 14, '2'),
(12, '1515572197437', '1515573075107', 1, 'Dedi', 1, 14, '1'),
(13, '1515574323896', '1515574323896', 9, 'Didi', 3, 9, '2'),
(14, '1515574339843', '1515574339843', 5, 'dedi', 1, 9, '1'),
(15, '1515572197437', '1516117127920', 2, 'Dedi', 1, 14, '1'),
(16, '1516829258082', '1516829258082', 9, 'Dedi Corbuzier', 2, 10, '2'),
(17, '1516882014306', '1516882014306', 9, 'JONO', 1, 7, '2'),
(18, '1516884068592', '1516884068592', 9, 'JONO', 3, 12, '2'),
(19, '1516940081668', '1516940081668', 2, 'Fahrul', 3, 14, '1'),
(20, '1516940593387', '1516940593387', 9, 'Dedi', 3, 14, '1');

-- --------------------------------------------------------

--
-- Table structure for table `tabel_layanan_kunjungan`
--

CREATE TABLE `tabel_layanan_kunjungan` (
  `id` int(10) NOT NULL,
  `id_pasien` varchar(10) NOT NULL,
  `nama_pasien` varchar(30) NOT NULL,
  `id_kunjungan` varchar(200) NOT NULL,
  `id_antrian` varchar(200) NOT NULL,
  `nama_layanan` text NOT NULL,
  `harga_bahan` varchar(100) NOT NULL,
  `harga_layanan` varchar(100) NOT NULL,
  `status` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tabel_layanan_kunjungan`
--

INSERT INTO `tabel_layanan_kunjungan` (`id`, `id_pasien`, `nama_pasien`, `id_kunjungan`, `id_antrian`, `nama_layanan`, `harga_bahan`, `harga_layanan`, `status`) VALUES
(2, ' 9', 'iqbal', '1513557483589', '', 'Pemolesan tindakan setelah skeling', '10000', '20000', '1'),
(3, ' 7', 'Fahrul Hidayat', '1513571203618', '', 'Pemolesan tindakan setelah skeling', '10000', '15000', '1'),
(15, ' 9', 'Mohammad Iqbal', '1513573922711', '', 'Pemolesan tindakan setelah skeling', '10000', '20000', '1'),
(16, ' 7', 'Fahrul Hidayat', '1513584794436', '', 'Pemolesan tindakan setelah skeling', '10000', '20000', '1'),
(17, ' 7', 'Fahrul Hidayat', '1513842542159', '', 'Pemolesan tindakan setelah skeling', '10000', '15000', '1'),
(18, ' 9', 'Mohammad Iqbal', '1513844347015', '', 'Pemolesan tindakan setelah skeling', '10000', '20000', '1'),
(19, ' 9', 'Mohammad Iqbal', '1513844347015', '', 'Pemeriksaan dan Penskeleran Rahang Atas  Rahang Bawah', '32000', '20000', '1'),
(20, ' 12', 'Melody Nurramdhani Laksani', '1514435747068', '', 'Pemolesan tindakan setelah skeling', '10000', '20000', '1'),
(21, ' 11', 'Shania Junianatha', '1514449206314', '', 'Pemolesan tindakan setelah skeling', '10000', '20000', '1'),
(22, ' 14', 'Martin Sinambela', '1515423830705', '', 'Topikal Aplikasi FlourAF RA dan RB', '0', '25000', '1'),
(23, ' 14', 'Martin Sinambela', '1515572197437', '', 'Pemolesan tindakan setelah skeling', '10000', '20000', '1'),
(24, ' 14', 'Martin Sinambela', '1515572197437', '', 'Curi Curi', '10000', '20000', '1'),
(25, ' 9', 'Mohammad Iqbal', '1515574323896', '', 'Foto Periapikal', '0', '15000', '1'),
(26, ' 7', '', '1516882014306', '', 'Foto Periapikal', '0', '35000', '1'),
(27, ' 10', '', '1516829258082', '', 'Foto Periapikal', '0', '35000', '1'),
(28, ' 10', '', '1514616829448', '', 'Foto Periapikal', '0', '35000', '1'),
(29, ' 12', '', '1516884068592', '', 'Foto Periapikal', '0', '35000', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tabel_obat_kunjungan`
--

CREATE TABLE `tabel_obat_kunjungan` (
  `id` int(10) NOT NULL,
  `id_pasien` varchar(10) NOT NULL,
  `nama_pasien` varchar(30) NOT NULL,
  `id_kunjungan` varchar(200) NOT NULL,
  `id_antrian` varchar(200) NOT NULL,
  `id_obat` varchar(10) NOT NULL,
  `nama_obat` text NOT NULL,
  `satuan` varchar(20) NOT NULL,
  `quantity` varchar(20) NOT NULL,
  `harga` varchar(100) NOT NULL,
  `status` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tabel_obat_kunjungan`
--

INSERT INTO `tabel_obat_kunjungan` (`id`, `id_pasien`, `nama_pasien`, `id_kunjungan`, `id_antrian`, `id_obat`, `nama_obat`, `satuan`, `quantity`, `harga`, `status`) VALUES
(8, ' 7', 'fahrul', '1513535380299', '', '1', 'Paracetamol', 'Papan', '1', '2000000', '1'),
(9, ' 9', 'Mohammad Iqbal', '1513573922711', '', '1', 'Paracetamol', 'Papan', '1', '2000000', '1'),
(11, ' 7', 'Fahrul Hidayat', '1513584794436', '', '1', 'Paracetamol', 'Papan', '1', '2000000', '1'),
(12, ' 7', 'Fahrul Hidayat', '1513842542159', '', '2', 'Panadol', 'Botol 500 Ml', '2', '300000', '1'),
(14, ' 9', 'Mohammad Iqbal', '1513844347015', '', '2', 'Panadol', 'Botol 500 Ml', '2', '300000', '1'),
(15, ' 9', 'Mohammad Iqbal', '1513844347015', '', '1', 'Paracetamol', 'Papan', '1', '2000000', '1'),
(16, ' 9', 'Mohammad Iqbal', '1513844347015', '', '4', 'Alkohol', 'Liter', '4', '5000000', '1'),
(17, ' 12', 'Melody Nurramdhani Laksani', '1514435747068', '', '1', 'Paracetamol', 'Papan', '1', '2000000', '1'),
(18, ' 11', 'Shania Junianatha', '1514449206314', '', '1', 'Paracetamol', 'Papan', '1', '2000000', '1'),
(19, ' 14', 'Martin Sinambela', '1515423830705', '', '1', 'Paracetamol', 'Papan', '1', '2000000', '1'),
(20, ' 14', 'Martin Sinambela', '1515572197437', '', '2', 'Panadol', 'Botol 500 Ml', '2', '300000', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tidakan_medis`
--

CREATE TABLE `tidakan_medis` (
  `id` int(11) NOT NULL,
  `nama_tindakan` text NOT NULL,
  `klinik` int(2) NOT NULL,
  `harga_bahan` int(255) NOT NULL,
  `harga_tindakan_medis_1` int(255) NOT NULL,
  `harga_tindakan_medis_2` int(255) NOT NULL,
  `harga_tindakan_medis_3` int(255) NOT NULL,
  `harga_tindakan_medis_4` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tidakan_medis`
--

INSERT INTO `tidakan_medis` (`id`, `nama_tindakan`, `klinik`, `harga_bahan`, `harga_tindakan_medis_1`, `harga_tindakan_medis_2`, `harga_tindakan_medis_3`, `harga_tindakan_medis_4`) VALUES
(1, 'Pemeriksaan dan Penskeleran Rahang Atas & Rahang Bawah (Full Mouth)', 1, 17000, 15000, 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_dokter`
--
ALTER TABLE `data_dokter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_layanan`
--
ALTER TABLE `data_layanan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_obat`
--
ALTER TABLE `data_obat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_pasien`
--
ALTER TABLE `data_pasien`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dca_users`
--
ALTER TABLE `dca_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ondontograma`
--
ALTER TABLE `ondontograma`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `perawatan`
--
ALTER TABLE `perawatan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rekam_medis`
--
ALTER TABLE `rekam_medis`
  ADD PRIMARY KEY (`id_kunjungan`);

--
-- Indexes for table `rm_jaringan_lunak_mulut`
--
ALTER TABLE `rm_jaringan_lunak_mulut`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rm_riwayat_penyakit`
--
ALTER TABLE `rm_riwayat_penyakit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rm_tanda_vital`
--
ALTER TABLE `rm_tanda_vital`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tabel_kunjugan`
--
ALTER TABLE `tabel_kunjugan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tabel_layanan_kunjungan`
--
ALTER TABLE `tabel_layanan_kunjungan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tabel_obat_kunjungan`
--
ALTER TABLE `tabel_obat_kunjungan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tidakan_medis`
--
ALTER TABLE `tidakan_medis`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_dokter`
--
ALTER TABLE `data_dokter`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `data_layanan`
--
ALTER TABLE `data_layanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `data_obat`
--
ALTER TABLE `data_obat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `data_pasien`
--
ALTER TABLE `data_pasien`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `dca_users`
--
ALTER TABLE `dca_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `ondontograma`
--
ALTER TABLE `ondontograma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `perawatan`
--
ALTER TABLE `perawatan`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `rm_jaringan_lunak_mulut`
--
ALTER TABLE `rm_jaringan_lunak_mulut`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `rm_riwayat_penyakit`
--
ALTER TABLE `rm_riwayat_penyakit`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `rm_tanda_vital`
--
ALTER TABLE `rm_tanda_vital`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tabel_kunjugan`
--
ALTER TABLE `tabel_kunjugan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `tabel_layanan_kunjungan`
--
ALTER TABLE `tabel_layanan_kunjungan`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `tabel_obat_kunjungan`
--
ALTER TABLE `tabel_obat_kunjungan`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `tidakan_medis`
--
ALTER TABLE `tidakan_medis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
