#!/usr/bin/env node
/**
 * Import folderdatabase/klinikusu.sql ke TiDB.
 * Menggunakan DATABASE_URL dari .env (harus mengarah ke TiDB).
 *
 * Cara pakai:
 *   1. Isi .env dengan DATABASE_URL TiDB (mysql://user:pass@host:port/database?sslaccept=strict)
 *   2. Jika di TiDB sudah ada tabel (dari Prisma), kosongkan dulu atau gunakan database baru
 *   3. npm run import:klinikusu
 *
 * Catatan schema:
 *   - klinikusu.sql punya data_dokter dengan kolom "klinik"; Prisma schema saat ini tidak.
 *     Setelah import, tambahkan kolom klinik di prisma/schema.prisma jika dipakai.
 */

const path = require('path')
const fs = require('fs')

// Load .env from project root
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const mysql = require('mysql2/promise')

function parseDatabaseUrl(url) {
  if (!url || !url.startsWith('mysql')) {
    throw new Error('DATABASE_URL harus berformat mysql://...')
  }
  try {
    // Format: mysql://USER:PASSWORD@HOST:PORT/DATABASE?query (password boleh ada : dan @)
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
    return {
      host,
      port,
      user,
      password,
      database,
      ssl: { rejectUnauthorized: true },
    }
  } catch (e) {
    throw new Error('Parse DATABASE_URL gagal: ' + e.message)
  }
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

  let connection
  try {
    connection = await mysql.createConnection(config)
  } catch (err) {
    console.error('Koneksi gagal:', err.message)
    process.exit(1)
  }

  const sql = fs.readFileSync(sqlPath, 'utf8')

  // Izinkan tanggal 0000-00-00 dari dump lama
  await connection.query("SET SESSION sql_mode = 'NO_ENGINE_SUBSTITUTION'")

  // Hapus baris komentar dan SET yang bisa bikin error di TiDB, biarkan CREATE/INSERT
  const lines = sql.split('\n')
  const filtered = lines
    .filter((line) => {
      const t = line.trim()
      if (!t) return false
      if (t.startsWith('--')) return false
      if (t.startsWith('/*!') && t.endsWith('*/')) return false
      if (t === 'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";') return false
      if (t === 'SET AUTOCOMMIT = 0;') return false
      if (t.startsWith('SET time_zone')) return false
      if (t === 'START TRANSACTION;') return false
      if (t === 'COMMIT;') return false
      if (t.includes('CHARACTER_SET_CLIENT') || t.includes('COLLATION_CONNECTION')) return false
      return true
    })
    .join('\n')

  // Eksekusi per statement (split by semicolon + newline) agar tidak kena limit paket
  const statements = filtered
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith('--'))

  console.log('Jumlah statement:', statements.length)

  let ok = 0
  let fail = 0
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i] + ';'
    try {
      await connection.query(stmt)
      ok++
      if (stmt.toUpperCase().startsWith('CREATE')) {
        console.log('  OK:', stmt.slice(0, 60).replace(/\s+/g, ' ') + '...')
      }
    } catch (err) {
      fail++
      console.error('  GAGAL (#', i + 1, '):', err.message)
      console.error('  Statement:', stmt.slice(0, 120) + '...')
      // Tetap lanjut; bisa jadi tabel sudah ada
    }
  }

  await connection.end()
  console.log('\nSelesai. Berhasil:', ok, 'Gagal:', fail)
  process.exit(fail > 0 ? 1 : 0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
