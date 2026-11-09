import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession, dashboardPath } from "@/lib/auth";
import AdminSidebar from "../AdminSidebar";
import AdminHeader from "../AdminHeader";
import "../admin.css";

const antrian = [
  { nama: "Juan Kevin", nomor: "CN-2026-000731", status: "Menunggu", warna: "", aktif: true },
  { nama: "Citra Lestari", nomor: "CN-2026-000728", status: "Menunggu", warna: "", aktif: false },
  { nama: "Farhan Hidayat", nomor: "CN-2026-000725", status: "Menunggu", warna: "", aktif: false },
  { nama: "Bagas Pratama", nomor: "CN-2026-000729", status: "Perbaikan", warna: "r", aktif: false },
  { nama: "Eka Putri", nomor: "CN-2026-000726", status: "Selesai", warna: "g", aktif: false },
];

const berkas = [
  { nama: "KK", warna: "g", pilih: false },
  { nama: "Akta Kelahiran", warna: "", pilih: true },
  { nama: "Ijazah atau SKL", warna: "", pilih: false },
  { nama: "Pas foto", warna: "g", pilih: false },
];

export default async function VerifikasiPage() {
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
      <AdminSidebar aktif="verifikasi" nama={session.nama} />

      <main className="ad-main">
        <AdminHeader
          judul="Verifikasi"
          deskripsi="Periksa berkas dan bukti pembayaran calon siswa."
        />

        <div className="ad-tabs">
          <button type="button" className="ad-btn">
            Berkas (64)
          </button>
          <button type="button" className="ad-btn outline">
            Pembayaran (23)
          </button>
        </div>

        <div className="ad-split">
          <section className="ad-card">
            {antrian.map((a) => (
              <div key={a.nomor} className={`ad-queue-item ${a.aktif ? "aktif" : ""}`}>
                <div>
                  <b>{a.nama}</b>
                  <small>{a.nomor}</small>
                </div>
                <span className={`ad-chip ${a.warna}`}>{a.status}</span>
              </div>
            ))}
          </section>

          <section className="ad-card">
            <div className="ad-detailhead">
              <div>
                <h2>Juan Kevin</h2>
                <span className="ad-muted">CN-2026-000731 · PPLG</span>
              </div>
              <span className="ad-chip">Menunggu</span>
            </div>

            <div className="ad-chips">
              {berkas.map((b) => (
                <span
                  key={b.nama}
                  className={`ad-chip ${b.warna} ${b.pilih ? "pilih" : ""}`}
                >
                  {b.nama}
                </span>
              ))}
            </div>

            <div className="ad-preview">Pratinjau Akta Kelahiran (PDF)</div>

            <input
              className="ad-input"
              style={{ width: "100%", marginTop: 16 }}
              placeholder="Catatan untuk siswa (wajib jika meminta perbaikan)"
              aria-label="Catatan untuk siswa"
            />

            <div className="ad-side-by" style={{ marginTop: 16 }}>
              <button type="button" className="ad-btn">
                Verifikasi berkas
              </button>
              <button type="button" className="ad-btn amber">
                Minta perbaikan
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}