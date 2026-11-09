import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { timingSafeEqual } from "crypto";

function kodeCocok(input, benar) {
  const a = Buffer.from(String(input));
  const b = Buffer.from(String(benar));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const nama = body.nama?.trim();
    const email = body.email?.trim().toLowerCase();
    const telepon = body.telepon?.trim();
    const idPegawai = body.idPegawai?.trim();
    const kode = body.kode;
    const password = body.password;
    const konfirmasi = body.konfirmasi;

    if (
      !nama ||
      !email ||
      !telepon ||
      !idPegawai ||
      typeof kode !== "string" ||
      !kode ||
      typeof password !== "string" ||
      typeof konfirmasi !== "string"
    ) {
      return Response.json(
        { message: "Semua kolom wajib diisi." },
        { status: 400 }
      );
    }

    // Cek kode otorisasi di server, sebelum hal lain diproses.
    const kodeBenar = process.env.ADMIN_SIGNUP_CODE;

    if (!kodeBenar) {
      return Response.json(
        { message: "Pendaftaran admin belum diaktifkan." },
        { status: 500 }
      );
    }

    if (!kodeCocok(kode, kodeBenar)) {
      return Response.json(
        { message: "Kode otorisasi salah." },
        { status: 403 }
      );
    }

    if (nama.length > 100 || email.length > 150) {
      return Response.json(
        { message: "Nama atau email terlalu panjang." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { message: "Format email tidak valid." },
        { status: 400 }
      );
    }

    if (!/^08[0-9]{8,12}$/.test(telepon)) {
      return Response.json(
        { message: "Nomor telepon harus diawali 08 dan berisi angka." },
        { status: 400 }
      );
    }

    if (!/^[0-9]{8}$/.test(idPegawai)) {
      return Response.json(
        { message: "ID pegawai harus 8 digit angka." },
        { status: 400 }
      );
    }

    if (
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72 ||
      !/[A-Za-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      return Response.json(
        { message: "Kata sandi minimal 8 karakter, kombinasi huruf dan angka." },
        { status: 400 }
      );
    }

    if (password !== konfirmasi) {
      return Response.json(
        { message: "Konfirmasi kata sandi tidak sama." },
        { status: 400 }
      );
    }

    const [existing] = await pool.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return Response.json(
        { message: "Email sudah terdaftar." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await pool.execute(
      `INSERT INTO users (nama, email, password, role)
       VALUES (?, ?, ?, 'admin')`,
      [nama, email, hashedPassword]
    );

    return Response.json(
      { message: "Akun admin berhasil dibuat." },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return Response.json(
        { message: "Email sudah terdaftar." },
        { status: 409 }
      );
    }

    console.error("Admin register error:", error);

    return Response.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}