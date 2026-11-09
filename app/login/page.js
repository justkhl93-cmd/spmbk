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

export default function LoginAdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lihat, setLihat] = useState(false);
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  async function masuk() {
    setPesan("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setPesan(data.message);
        return;
      }

      if (data.user.role !== "admin") {
        setPesan("Akun ini bukan akun admin.");
        return;
      }

      window.location.href = "/dashboard/admin";
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

      {/* Sisi kanan: kartu login */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div
          style={{
            width: "100%",
            maxWidth: 550,
            background: "#8ce88a",
            borderRadius: 24,
            padding: 44,
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
          <h1 style={{ fontSize: 28, margin: "16px 0 4px", color: "#0b2e0b" }}>Masuk sebagai Admin</h1>
          <p style={{ margin: "0 0 28px", color: "#3f7a3f", fontSize: 14 }}>
            Gunakan email atau username admin yang terdaftar.
          </p>

          <div style={{ marginBottom: 16 }}>
            <label style={label}>Email / Username</label>
            <input
              style={input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@citranegara.sch.id"
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={label}>Kata Sandi</label>
            <div style={{ position: "relative" }}>
              <input
                style={{ ...input, paddingRight: 84 }}
                type={lihat ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setLihat(!lihat)}
                style={{ position: "absolute", right: 10, top: 13, border: "none", background: "none", color: "#0a8f4a", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
              >
                {lihat ? "Sembunyikan" : "Tampilkan"}
              </button>
            </div>
          </div>

          <div style={{ textAlign: "right", marginBottom: 18 }}>
            <a href="#" style={{ color: "#0b2e0b", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
              Lupa Kata Sandi?
            </a>
          </div>

          {pesan && (
            <div
              style={{
                marginBottom: 14,
                padding: "10px 14px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                background: "#fde8e8",
                color: "#b42318",
              }}
            >
              {pesan}
            </div>
          )}

          <button
            type="button"
            onClick={masuk}
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
            {loading ? "Memproses..." : "Masuk"}
          </button>

          <p style={{ textAlign: "center", fontSize: 14, color: "#3f7a3f", margin: "18px 0 0" }}>
            Belum punya akun?{" "}
            <a href="/admin-register" style={{ color: "#0b2e0b", fontWeight: 700, textDecoration: "none" }}>
              Daftar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}