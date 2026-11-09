import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession, dashboardPath } from "@/lib/auth";
import AdminSidebar from "../AdminSidebar";
import AdminHeader from "../AdminHeader";
import "../admin.css";

const sesi = [
  { nama: "Sesi 1", tanggal: "Sabtu, 14 Nov 2026", mulai: "08.00", selesai: "09.00", peserta: "100 / 100", status: "Terjadwal" },
  { nama: "Sesi 2", tanggal: "Sabtu, 14 Nov 2026", mulai: "13.00", selesai: "14.00", peserta: "100 / 100", status: "Terjadwal" },
  { nama: "Sesi 3", tanggal: "Minggu, 15 Nov 2026", mulai: "08.00", selesai: "09.00", peserta: "62 / 100", status: "Draf" },
];

const ringkasan = [
  { label: "Sudah bayar", nilai: "405" },
  { label: "Sudah terjadwal", nilai: "262" },
  { label: "Sudah mengerjakan", nilai: "355" },
  { label: "Rata-rata skor", nilai: "78,5" },
];

const pengaturanSoal = [
  { label: "Jumlah soal", nilai: "40" },
  { label: "Durasi per peserta", nilai: "60 menit" },
  { label: "Acak urutan soal", nilai: "Ya" },
];

export default async function TesTpaAdminPage() {
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
      <AdminSidebar aktif="tpa" nama={session.nama} />

      <main className="ad-main">
        <AdminHeader
          judul="Tes TPA"
          deskripsi="Atur jadwal sesi, kuota, dan pantau peserta."
        />

        <div className="ad-two" style={{ gridTemplateColumns: "1fr 380px" }}>
          <div className="ad-col">
            <section className="ad-card">
              <div className="ad-cardhead" style={{ marginBottom: 12 }}>
                <h2>Jadwal sesi</h2>
                <button type="button" className="ad-btn outline sm">
                  + Tambah sesi
                </button>
              </div>

              <table className="ad-table">
                <thead>
                  <tr>
                    <th>Sesi</th>
                    <th>Tanggal</th>
                    <th>Mulai</th>
                    <th>Selesai</th>
                    <th>Peserta / kuota</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sesi.map((s) => (
                    <tr key={s.nama}>
                      <td>
                        <b>{s.nama}</b>
                      </td>
                      <td>{s.tanggal}</td>
                      <td>{s.mulai}</td>
                      <td>{s.selesai}</td>
                      <td>{s.peserta}</td>
                      <td>
                        <span className={`ad-chip ${s.status === "Terjadwal" ? "g" : "n"}`}>
                          {s.status}
                        </span>
                      </td>
                      <td>
                        <span className="ad-link">Ubah</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="ad-banner" style={{ marginTop: 16 }}>
                <span>
                  <b>143 peserta</b> sudah bayar, belum punya sesi
                </span>
                <button type="button" className="ad-btn sm">
                  Jadwalkan otomatis
                </button>
              </div>
            </section>

            <section className="ad-card">
              <h2>Atur sesi</h2>
              <p className="ad-sub">
                Isi untuk menambah sesi baru, atau pilih sesi di atas untuk mengubahnya.
              </p>

              <div className="ad-form">
                <div className="ad-field">
                  <label htmlFor="namaSesi">Nama sesi</label>
                  <input id="namaSesi" className="ad-input" defaultValue="Sesi 4" />
                </div>
                <div className="ad-field">
                  <label htmlFor="tanggal">Tanggal</label>
                  <input id="tanggal" className="ad-input" placeholder="dd/mm/yyyy" />
                </div>
                <div className="ad-field">
                  <label htmlFor="kuota">Kuota peserta</label>
                  <input id="kuota" className="ad-input" defaultValue="100" />
                </div>
                <div className="ad-field">
                  <label htmlFor="mulai">Jam mulai</label>
                  <input id="mulai" className="ad-input" defaultValue="08.00" />
                </div>
                <div className="ad-field">
                  <label htmlFor="selesai">Jam selesai</label>
                  <input id="selesai" className="ad-input" defaultValue="09.00" />
                </div>
                <div className="ad-field">
                  <label htmlFor="toleransi">Toleransi terlambat (menit)</label>
                  <input id="toleransi" className="ad-input" defaultValue="15" />
                </div>
              </div>

              <div style={{ margin: "16px 0" }}>
                <label className="ad-check">
                  <input type="checkbox" defaultChecked />
                  Buka otomatis saat jam mulai
                </label>
                <label className="ad-check">
                  <input type="checkbox" defaultChecked />
                  Hanya untuk peserta yang pembayarannya sudah dikonfirmasi
                </label>
              </div>

              <div className="ad-side-by">
                <button type="button" className="ad-btn">
                  Simpan sesi
                </button>
                <button type="button" className="ad-btn outline">
                  Batal
                </button>
              </div>
            </section>
          </div>

          <div className="ad-col">
            <section className="ad-card">
              <h2>Ringkasan peserta</h2>
              {ringkasan.map((r) => (
                <div key={r.label} className="ad-kv">
                  <span>{r.label}</span>
                  <b>{r.nilai}</b>
                </div>
              ))}
            </section>

            <section className="ad-card">
              <h2>Pengaturan soal</h2>
              {pengaturanSoal.map((r) => (
                <div key={r.label} className="ad-kv">
                  <span>{r.label}</span>
                  <b>{r.nilai}</b>
                </div>
              ))}
              <div className="ad-side-by" style={{ marginTop: 14 }}>
                <button type="button" className="ad-btn outline sm">
                  Kelola soal
                </button>
                <button type="button" className="ad-btn outline sm">
                  Ubah
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}