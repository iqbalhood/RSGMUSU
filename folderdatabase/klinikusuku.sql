-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 20, 2017 at 11:29 AM
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
  `catatan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_pasien`
--

INSERT INTO `data_pasien` (`id`, `no_registrasi`, `tgl_registrasi`, `nama`, `tempat_lahir`, `tanggal_lahir`, `jenis_kelamin`, `agama`, `alamat`, `rtrw`, `kelurahan`, `kecamatan`, `kabupaten`, `propinsi`, `nomor_hp`, `kewarganegaraan`, `noktp`, `pendidikan`, `pekerjaan`, `status_perkawinan`, `tgl_pertama_masuk`, `cara_bayar`, `tujuan_kunjungan_pertama`, `alergi`, `catatan`) VALUES
(7, '111', '2017-01-01', 'Fahrul Hidayat', 'Medan', '2017-01-01', '1', '', 'Jalan Sekolah Pembangunan no89', '', 'buntu', 't morawa', 'deli serdang', 'sumatera utara', '081112341234', 'wni', '11207865121', 's', 'developer', 'menikah', '2017-01-01', '', '', 'obat nyamuk', 'panjang'),
(8, '1212', '2017-01-01', 'Putri', 'Medan', '2017-01-01', '2', '', 'Jalan Sei Serayu No 85 Babura', '', 'Babura Sunggal', 'Medan Sunggal', 'Medan', 'sumut', '08112123121', 'indonesia', '11201212912', 'S', 'mahasiswa', 'kawin', '2017-01-01', '', '', 'cicak', 'y'),
(9, '1234', '2017-01-01', 'Mohammad Iqbal', 'Tebing Tinggi', '2017-01-01', '1', '1', 'Jalan Sekolah Pembangunan No7a Medan Sunggal', '1', 'anggrung', 'polonia', 'medan', 'sumatera utara', '081112345678', 'indonesia', '112934762329211', 'D3', 'developer', 'belum nika', '2017-01-01', '1', '1', 'tepung', 'coba');

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
(1, 'iqbal', 'password', 'admin'),
(2, 'joni', 'joni', 'perawat'),
(3, 'dokter', 'dokter', 'dokter');

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
('1513584794436 ', '7', '1', 'dr. Dian Nugraha', 'Contoh Anamnese', 'Contoh Diagnosa');

-- --------------------------------------------------------

--
-- Table structure for table `tabel_kunjugan`
--

CREATE TABLE `tabel_kunjugan` (
  `id_kunjungan` varchar(200) NOT NULL,
  `id_klinik` int(200) NOT NULL,
  `dokter_pendamping` varchar(300) NOT NULL,
  `id_dokter` int(200) NOT NULL,
  `id_pasien` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tabel_kunjugan`
--

INSERT INTO `tabel_kunjugan` (`id_kunjungan`, `id_klinik`, `dokter_pendamping`, `id_dokter`, `id_pasien`) VALUES
('1513571203618', 3, 'Martin Manullang', 2, 7),
('1513573922711', 1, 'Mayuko', 3, 9),
('1513584794436', 1, 'Deni Santoso', 1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `tabel_layanan_kunjungan`
--

CREATE TABLE `tabel_layanan_kunjungan` (
  `id` int(10) NOT NULL,
  `id_pasien` varchar(10) NOT NULL,
  `nama_pasien` varchar(30) NOT NULL,
  `id_kunjungan` varchar(200) NOT NULL,
  `nama_layanan` text NOT NULL,
  `harga_bahan` varchar(100) NOT NULL,
  `harga_layanan` varchar(100) NOT NULL,
  `status` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tabel_layanan_kunjungan`
--

INSERT INTO `tabel_layanan_kunjungan` (`id`, `id_pasien`, `nama_pasien`, `id_kunjungan`, `nama_layanan`, `harga_bahan`, `harga_layanan`, `status`) VALUES
(2, ' 9', 'iqbal', '1513557483589', 'Pemolesan tindakan setelah skeling', '10000', '20000', '1'),
(3, ' 7', 'Fahrul Hidayat', '1513571203618', 'Pemolesan tindakan setelah skeling', '10000', '15000', '1'),
(15, ' 9', 'Mohammad Iqbal', '1513573922711', 'Pemolesan tindakan setelah skeling', '10000', '20000', '1'),
(16, ' 7', 'Fahrul Hidayat', '1513584794436', 'Pemolesan tindakan setelah skeling', '10000', '20000', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tabel_obat_kunjungan`
--

CREATE TABLE `tabel_obat_kunjungan` (
  `id` int(10) NOT NULL,
  `id_pasien` varchar(10) NOT NULL,
  `nama_pasien` varchar(30) NOT NULL,
  `id_kunjungan` varchar(200) NOT NULL,
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

INSERT INTO `tabel_obat_kunjungan` (`id`, `id_pasien`, `nama_pasien`, `id_kunjungan`, `id_obat`, `nama_obat`, `satuan`, `quantity`, `harga`, `status`) VALUES
(8, ' 7', 'fahrul', '1513535380299', '1', 'Paracetamol', 'Papan', '1', '2000000', '1'),
(9, ' 9', 'Mohammad Iqbal', '1513573922711', '1', 'Paracetamol', 'Papan', '1', '2000000', '1'),
(10, ' 7', 'Fahrul Hidayat', '1513584794436', '2', 'Panadol', 'Botol 500 Ml', '2', '300000', '1'),
(11, ' 7', 'Fahrul Hidayat', '1513584794436', '1', 'Paracetamol', 'Papan', '1', '2000000', '1');

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
-- Indexes for table `rekam_medis`
--
ALTER TABLE `rekam_medis`
  ADD PRIMARY KEY (`id_kunjungan`);

--
-- Indexes for table `tabel_kunjugan`
--
ALTER TABLE `tabel_kunjugan`
  ADD PRIMARY KEY (`id_kunjungan`);

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
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `tabel_layanan_kunjungan`
--
ALTER TABLE `tabel_layanan_kunjungan`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `tabel_obat_kunjungan`
--
ALTER TABLE `tabel_obat_kunjungan`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `tidakan_medis`
--
ALTER TABLE `tidakan_medis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
