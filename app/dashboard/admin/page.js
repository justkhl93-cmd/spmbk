import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession, dashboardPath } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import "./admin.css";

const statistik = [
  { label: "Total pendaftar", angka: "544", ket: "Gelombang 1" },
  { label: "Menunggu verifikasi", angka: "64", ket: "Berkas" },
  { label: "Sudah bayar", angka: "405", ket: "Rp 202.500.000" },
  { label: "Sudah tes TPA", angka: "355", ket: "dari 405 yang bayar" },
];

const pendaftarBaru = [
  { nama: "Juan Kevin", jurusan: "PPLG", waktu: "baru saja", baru: true },
  { nama: "Aulia Rahma", jurusan: "DKV", waktu: "2 menit lalu", baru: true },
  { nama: "Bagas Pratama", jurusan: "MPLB", waktu: "5 menit lalu", baru: true },
  { nama: "Citra Lestari", jurusan: "TJKT", waktu: "12 menit lalu", baru: false },
  { nama: "Dimas Saputra", jurusan: "PM", waktu: "20 menit lalu", baru: false },
  { nama: "Eka Putri", jurusan: "PH", waktu: "31 menit lalu", baru: false },
];

const tindakan = [
  { angka: "64", teks: "berkas menunggu verifikasi", href: "/dashboard/admin/verifikasi" },
  { angka: "23", teks: "bukti bayar menunggu konfirmasi", href: "/dashboard/admin/verifikasi" },
  { angka: "143", teks: "peserta belum punya jadwal tes", href: "/dashboard/admin/tes-tpa" },
];

export default async function DashboardAdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("spmb_session")?.value;
  const session = await getSession(token);

  if (!session) {
    redirect("/login/admin");
  }

  if (session.role !== "admin") {
    redirect(dashboardPath(session.role));
  }

  return (
    <div className="ad">
      <AdminSidebar aktif="dashboard" nama={session.nama} />

      <main className="ad-main">
        <AdminHeader
          judul="Dashboard"
          deskripsi="Ringkasan pendaftaran gelombang 1."
        />

        <section className="ad-stats">
          {statistik.map((s) => (
            <div key={s.label} className="ad-card ad-stat">
              <span>{s.label}</span>
              <b>{s.angka}</b>
              <span>{s.ket}</span>
            </div>
          ))}
        </section>

        <div className="ad-two">
          <section className="ad-card">
            <div className="ad-cardhead">
              <h2>Pendaftar terbaru</h2>
              <span className="ad-live">Otomatis diperbarui</span>
            </div>

            {pendaftarBaru.map((p) => (
              <div key={p.nama} className="ad-row">
                <div>
                  <b>{p.nama}</b>
                  <small>{p.jurusan}</small>
                </div>
                <div className="ad-side-by">
                  {p.baru && <span className="ad-chip g">Baru</span>}
                  <span className="ad-muted">{p.waktu}</span>
                </div>
              </div>
            ))}
          </section>

          <section className="ad-card">
            <h2>Perlu tindakan</h2>

            {tindakan.map((t) => (
              <div key={t.teks} className="ad-row">
                <div>
                  <strong style={{ fontSize: 20, fontWeight: 800 }}>{t.angka}</strong>{" "}
                  <span className="ad-muted">{t.teks}</span>
                </div>
                <Link href={t.href} className="ad-btn outline sm">
                  Buka
                </Link>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}