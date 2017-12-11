-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 11, 2017 at 05:12 
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `data_layanan`
--


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
  `nama` varchar(200) NOT NULL,
  `jenis_kelamin` varchar(200) NOT NULL,
  `nomor_hp` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `data_pasien`
--

INSERT INTO `data_pasien` (`id`, `nama`, `jenis_kelamin`, `nomor_hp`) VALUES
(18, 'Markus Horison', '1', '082368008333'),
(19, 'Dwi Agustini Lubis', '2', '0897737373'),
(20, 'Dwi Andini', '2', '08973701175'),
(21, 'Bari Subarjo', '1', '0823680084444'),
(22, 'Muhammad Akbar Purba', '1', '0812689008999');

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `statistik`
--


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

INSERT INTO `tabel_kunjugan` (`id_kunjungan`, `id_klinik`, `dokter_pendamping`, `id_dokter`, `id_pasien`) VALUES
('1512037434874', 2, 'Martin Sitepu', 2, 18),
('1512037736591', 1, 'Jono Simanungkalit', 4, 19),
('1512038542475', 7, 'Fahrul Hidayat', 2, 18),
('1512363665534', 3, 'CR RONALDO', 1, 18),
('1512364739492', 2, 'Eko Surya', 3, 18),
('1512382606557', 5, 'Martin halawa', 1, 18),
('1512965300851', 1, 'Dr Wisnu', 4, 18),
('2147483647', 1, 'Wini Putri Lubis', 1, 18);
