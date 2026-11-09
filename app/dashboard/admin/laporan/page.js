import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession, dashboardPath } from "@/lib/auth";
import AdminSidebar from "../AdminSidebar";
import AdminHeader from "../AdminHeader";
import "../admin.css";

const statistik = [
  { label: "Total pendaftar", angka: "544", ket: "Gelombang 1" },
  { label: "Berkas terverifikasi", angka: "442", ket: "81% dari pendaftar" },
  { label: "Pembayaran masuk", angka: "Rp 202,5 jt", ket: "405 pendaftar sudah bayar" },
];

const rekap = [
  { jurusan: "PPLG", daftar: 118, verif: 98, bayar: 90, tes: 80, kuota: 70 },
  { jurusan: "MPLB", daftar: 130, verif: 106, bayar: 100, tes: 90, kuota: 70 },
  { jurusan: "DKV", daftar: 95, verif: 78, bayar: 70, tes: 60, kuota: 60 },
  { jurusan: "TJKT", daftar: 82, verif: 66, bayar: 60, tes: 50, kuota: 60 },
  { jurusan: "PM", daftar: 58, verif: 47, bayar: 40, tes: 35, kuota: 50 },
  { jurusan: "PH", daftar: 61, verif: 47, bayar: 45, tes: 40, kuota: 50 },
];

const total = rekap.reduce(
  (t, r) => ({
    daftar: t.daftar + r.daftar,
    verif: t.verif + r.verif,
    bayar: t.bayar + r.bayar,
    tes: t.tes + r.tes,
    kuota: t.kuota + r.kuota,
  }),
  { daftar: 0, verif: 0, bayar: 0, tes: 0, kuota: 0 }
);

export default async function LaporanPage() {
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
      <AdminSidebar aktif="laporan" nama={session.nama} />

      <main className="ad-main">
        <AdminHeader
          judul="Laporan"
          deskripsi="Rekap pendaftaran gelombang 1."
        >
          <button type="button" className="ad-btn outline">
            Unduh Excel
          </button>
          <button type="button" className="ad-btn">
            Unduh PDF
          </button>
        </AdminHeader>

        <div className="ad-toolbar">
          <select className="ad-input" aria-label="Periode">
            <option>Gelombang 1 · 2026/2027</option>
          </select>
          <select className="ad-input" aria-label="Jurusan">
            <option>Semua jurusan</option>
            <option>PPLG</option>
            <option>MPLB</option>
            <option>DKV</option>
            <option>TJKT</option>
            <option>PM</option>
            <option>PH</option>
          </select>
        </div>

        <section className="ad-stats tiga">
          {statistik.map((s) => (
            <div key={s.label} className="ad-card ad-stat">
              <span>{s.label}</span>
              <b>{s.angka}</b>
              <span>{s.ket}</span>
            </div>
          ))}
        </section>

        <section className="ad-card">
          <h2>Rekap per jurusan</h2>

          <table className="ad-table">
            <thead>
              <tr>
                <th>Jurusan</th>
                <th>Pendaftar</th>
                <th>Terverifikasi</th>
                <th>Sudah bayar</th>
                <th>Sudah tes</th>
                <th>Kuota</th>
              </tr>
            </thead>
            <tbody>
              {rekap.map((r) => (
                <tr key={r.jurusan}>
                  <td>
                    <b>{r.jurusan}</b>
                  </td>
                  <td>{r.daftar}</td>
                  <td>{r.verif}</td>
                  <td>{r.bayar}</td>
                  <td>{r.tes}</td>
                  <td>{r.kuota}</td>
                </tr>
              ))}
              <tr className="total">
                <td>Total</td>
                <td>{total.daftar}</td>
                <td>{total.verif}</td>
                <td>{total.bayar}</td>
                <td>{total.tes}</td>
                <td>{total.kuota}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}