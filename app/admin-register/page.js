"use client";

import { useState } from "react";

const label = { fontSize: 13, fontWeight: 600, color: "#0b2e0b", marginBottom: 6, display: "block" };
const input = {
  width: "100%",
  height: 46,
  padding: "0 14px",
  borderRadius: 10,
  border: "1px solid #d9efd9",
  background: "#fff",
  fontSize: 14,
  boxSizing: "border-box",
  outline: "none",
};
const baris = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 };

export default function AdminRegisterPage() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    idPegawai: "",
    kode: "",
    password: "",
    konfirmasi: "",
  });
  const [lihatPass, setLihatPass] = useState(false);
  const [lihatKonf, setLihatKonf] = useState(false);
  const [pesan, setPesan] = useState("");
  const [berhasil, setBerhasil] = useState(false);
  const [loading, setLoading] = useState(false);

  function ubah(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function kirim() {
    setPesan("");
    setBerhasil(false);
    setLoading(true);

    try {
      const res = await fetch("/api/admin-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      setPesan(data.message);
      setBerhasil(res.ok);

      if (res.ok) {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } catch (err) {
      setPesan("Tidak bisa terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#465c4c" }}>
      {/* Sisi kiri: foto sekolah */}
      <div
        style={{
          width: "41%",
          position: "relative",
          color: "#fff",
          backgroundImage:
            "linear-gradient(to top, rgba(10,70,30,0.85), rgba(0,0,0,0) 55%), url('/asset/login-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/asset/logo.png" alt="Logo sekolah" style={{ width: 56, height: 56, objectFit: "contain" }} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Portal SPMB</div>
            <div style={{ fontSize: 14 }}>SMK Citra Negara</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.15 }}>
            Kelola penerimaan
            <br />
            murid baru dengan mudah.
          </div>
          <div style={{ fontSize: 14, marginTop: 12 }}>
            Masuk untuk membuka dashboard Admin.
          </div>
        </div>
      </div>

      {/* Sisi kanan: kartu form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div
          style={{
            width: "100%",
            maxWidth: 524,
            background: "#7fca7f",
            borderRadius: 24,
            padding: 36,
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              background: "#054a00",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              padding: "6px 14px",
              borderRadius: 999,
            }}
          >
            ADMIN SPMB
          </span>
          <h1 style={{ fontSize: 28, margin: "16px 0 4px", color: "#0b2e0b" }}>Buat akun Admin</h1>
          <p style={{ margin: "0 0 24px", color: "#3f7a3f", fontSize: 14 }}>
            Lengkapi data untuk mengajukan akses panel.
          </p>

          <div style={{ marginBottom: 16 }}>
            <label style={label}>Nama Lengkap</label>
            <input style={input} name="nama" value={form.nama} onChange={ubah} placeholder="Rina Kusumawati" />
          </div>

          <div style={baris}>
            <div>
              <label style={label}>Email</label>
              <input style={input} name="email" value={form.email} onChange={ubah} placeholder="nama@citranegara.sch.id" />
            </div>
            <div>
              <label style={label}>Nomor Telepon</label>
              <input style={input} name="telepon" value={form.telepon} onChange={ubah} placeholder="08xxxxxxxxxx" />
            </div>
          </div>

          <div style={baris}>
            <div>
              <label style={label}>ID Pegawai</label>
              <input style={input} name="idPegawai" value={form.idPegawai} onChange={ubah} placeholder="8 digit ID pegawai" />
            </div>
            <div>
              <label style={label}>Kode Otorisasi</label>
              <input style={input} name="kode" value={form.kode} onChange={ubah} placeholder="Kode dari sekolah" />
            </div>
          </div>

          <div style={{ ...baris, marginBottom: 8 }}>
            <div>
              <label style={label}>Kata Sandi</label>
              <div style={{ position: "relative" }}>
                <input
                  style={{ ...input, paddingRight: 84 }}
                  type={lihatPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={ubah}
                  placeholder="Buat kata sandi"
                />
                <button
                  type="button"
                  onClick={() => setLihatPass(!lihatPass)}
                  style={{ position: "absolute", right: 10, top: 13, border: "none", background: "none", color: "#0a8f4a", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                >
                  {lihatPass ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>
            </div>
            <div>
              <label style={label}>Konfirmasi Sandi</label>
              <div style={{ position: "relative" }}>
                <input
                  style={{ ...input, paddingRight: 84 }}
                  type={lihatKonf ? "text" : "password"}
                  name="konfirmasi"
                  value={form.konfirmasi}
                  onChange={ubah}
                  placeholder="Ulangi kata sandi"
                />
                <button
                  type="button"
                  onClick={() => setLihatKonf(!lihatKonf)}
                  style={{ position: "absolute", right: 10, top: 13, border: "none", background: "none", color: "#0a8f4a", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                >
                  {lihatKonf ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>
            </div>
          </div>

          <p style={{ fontSize: 12, color: "#3f7a3f", margin: "0 0 18px" }}>
            Minimal 8 karakter, kombinasi huruf dan angka.
          </p>

                    {pesan && (
            <div
              style={{
                marginBottom: 14,
                padding: "10px 14px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                background: berhasil ? "#e3f7e3" : "#fde8e8",
                color: berhasil ? "#0b5a1a" : "#b42318",
              }}
            >
              {pesan}
            </div>
          )}

          <button
            type="button"
            onClick={kirim}
            disabled={loading}
            style={{
              width: "100%",
              height: 54,
              borderRadius: 12,
              border: "none",
              background: "#054a00",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>

          <p style={{ textAlign: "center", fontSize: 14, color: "#3f7a3f", margin: "18px 0 0" }}>
            Sudah punya akun?{" "}
            <a href="/login" style={{ color: "#0b2e0b", fontWeight: 700, textDecoration: "none" }}>
              Kembali ke Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}