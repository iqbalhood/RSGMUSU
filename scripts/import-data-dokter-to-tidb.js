#!/usr/bin/env node
/**
 * Import hanya data dokter dari folderdatabase/klinikusu.sql ke TiDB.
 * Menggunakan DATABASE_URL dari .env.
 *
 * Cara pakai:
 *   1. Pastikan .env berisi DATABASE_URL TiDB.
 *   2. Jalankan: npm run import:data-dokter
 *
 * Skrip akan:
 *   - Menambah kolom `klinik` di data_dokter jika belum ada (untuk tabel buatan Prisma).
 *   - Menghapus isi data_dokter lalu mengisi ulang dari klinikusu.sql (91 dokter).
 */

const path = require('path')
const fs = require('fs')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })
const mysql = require('mysql2/promise')

function parseDatabaseUrl(url) {
  if (!url || !url.startsWith('mysql')) throw new Error('DATABASE_URL harus format mysql://...')
  const afterProtocol = url.replace(/^mysql:\/\//, '')
  const atIdx = afterProtocol.lastIndexOf('@')
  if (atIdx === -1) throw new Error('Tidak ada @ di URL')
  const userPart = afterProtocol.slice(0, atIdx)
  const hostPart = afterProtocol.slice(atIdx + 1)
  const colonIdx = userPart.indexOf(':')
  const user = colonIdx === -1 ? userPart : userPart.slice(0, colonIdx)
  const password = colonIdx === -1 ? '' : decodeURIComponent(userPart.slice(colonIdx + 1))
  const [hostPort, dbAndQuery] = hostPart.split('/')
  const [host, portStr] = hostPort.split(':')
  const database = (dbAndQuery || '').split('?')[0] || 'klinikusu'
  const port = parseInt(portStr || '3306', 10)
  return { host, port, user, password, database, ssl: { rejectUnauthorized: true } }
}

async function run() {
  const sqlPath = path.join(__dirname, '..', 'folderdatabase', 'klinikusu.sql')
  if (!fs.existsSync(sqlPath)) {
    console.error('File tidak ditemukan:', sqlPath)
    process.exit(1)
  }

  const url = process.env.DATABASE_URL
  if (!url) {
    console.error('DATABASE_URL tidak ada di .env')
    process.exit(1)
  }

  const config = parseDatabaseUrl(url)
  console.log('Menghubungkan ke TiDB:', config.host + ':' + config.port + '/' + config.database)

  const connection = await mysql.createConnection(config).catch((err) => {
    console.error('Koneksi gagal:', err.message)
    process.exit(1)
  })

  const fullSql = fs.readFileSync(sqlPath, 'utf8')

  // Ambil hanya blok INSERT INTO `data_dokter` ... sampai baris yang berakhir );
  const insertStart = fullSql.indexOf('INSERT INTO `data_dokter`')
  if (insertStart === -1) {
    console.error('Blok INSERT data_dokter tidak ditemukan di klinikusu.sql')
    await connection.end()
    process.exit(1)
  }
  const insertEnd = fullSql.indexOf(');', insertStart) + 2
  const insertSql = fullSql.slice(insertStart, insertEnd).trim()

  try {
    // Tambah kolom klinik jika belum ada (tabel dari Prisma biasanya belum punya)
    try {
      await connection.query(
        'ALTER TABLE `data_dokter` ADD COLUMN `klinik` VARCHAR(2) NULL DEFAULT NULL'
      )
      console.log('Kolom data_dokter.klinik ditambahkan.')
    } catch (e) {
      if (!/Duplicate column/i.test(e.message)) console.warn('ALTER TABLE:', e.message)
    }

    // Kosongkan tabel lalu isi dari dump
    await connection.query('DELETE FROM `data_dokter`')
    console.log('Tabel data_dokter dikosongkan.')

    await connection.query(insertSql)
    const [rows] = await connection.query('SELECT COUNT(*) AS n FROM `data_dokter`')
    console.log('Data dokter di-import. Total baris:', rows[0].n)
  } catch (err) {
    console.error('Import gagal:', err.message)
    await connection.end()
    process.exit(1)
  }

  await connection.end()
  console.log('Selesai.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
