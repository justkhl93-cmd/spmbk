"use client";

import { useState } from "react";
import Link from "next/link";

const menu = [
  { kunci: "dashboard", nama: "Dashboard", href: "/dashboard/admin" },
  { kunci: "data", nama: "Data Calon Siswa", href: "/dashboard/admin/data-calon-siswa" },
  { kunci: "tpa", nama: "Tes TPA", href: "/dashboard/admin/tes-tpa" },
  { kunci: "seleksi", nama: "Seleksi", href: "/dashboard/admin/seleksi" },
  { kunci: "verifikasi", nama: "Verifikasi", href: "/dashboard/admin/verifikasi" },
  { kunci: "laporan", nama: "Laporan", href: "/dashboard/admin/laporan" },
];

export default function AdminSidebar({ aktif, nama = "Admin" }) {
  const [keluar, setKeluar] = useState(false);

  const inisial = nama
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((k) => k[0].toUpperCase())
    .join("");

  async function logout() {
    setKeluar(true);

    try {
      await fetch("/api/logout", { method: "POST" });
    } finally {
      window.location.href = "/login/admin";
    }
  }

  return (
    <aside className="ad-side">
      <div className="ad-brand">
        <img src="/asset/logo.png" alt="Logo SMK Citra Negara" />
        <div>
          <b>SMK Citra Negara</b>
          <span>Kepala Sekolah</span>
        </div>
      </div>

      <nav className="ad-nav">
        {menu.map((m) => (
          <Link
            key={m.kunci}
            href={m.href}
            className={m.kunci === aktif ? "active" : ""}
          >
            {m.nama}
          </Link>
        ))}
      </nav>

      <div className="ad-user">
        <div className="ad-avatar">{inisial}</div>
        <div>
          <b>{nama}</b>
          <span>Admin SPMB</span>
        </div>
      </div>

      <button
        type="button"
        className="ad-out"
        onClick={logout}
        disabled={keluar}
      >
        {keluar ? "Keluar..." : "Keluar akun"}
      </button>
    </aside>
  );
}