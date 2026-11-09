import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession, dashboardPath } from "@/lib/auth";
import AdminSidebar from "../AdminSidebar";
import AdminHeader from "../AdminHeader";
import "../admin.css";

const calonSiswa = [
  { nama: "Juan Kevin", nomor: "CN-2026-000731", jurusan: "PPLG", berkas: "Menunggu", bayar: "Belum", tes: "Belum", baru: true },
  { nama: "Aulia Rahma", nomor: "CN-2026-000730", jurusan: "DKV", berkas: "Menunggu", bayar: "Belum", tes: "Belum", baru: true },
  { nama: "Bagas Pratama", nomor: "CN-2026-000729", jurusan: "MPLB", berkas: "Menunggu", bayar: "Belum", tes: "Belum", baru: true },
  { nama: "Citra Lestari", nomor: "CN-2026-000728", jurusan: "TJKT", berkas: "Terverifikasi", bayar: "Lunas", tes: "Skor 81", baru: false },
  { nama: "Dimas Saputra", nomor: "CN-2026-000727", jurusan: "PM", berkas: "Terverifikasi", bayar: "Lunas", tes: "Skor 88", baru: false },
  { nama: "Eka Putri", nomor: "CN-2026-000726", jurusan: "PH", berkas: "Perlu perbaikan", bayar: "Menunggu", tes: "Belum", baru: false },
  { nama: "Farhan Hidayat", nomor: "CN-2026-000725", jurusan: "PPLG", berkas: "Terverifikasi", bayar: "Lunas", tes: "Skor 92", baru: false },
];

const warnaBerkas = { Terverifikasi: "g", Menunggu: "", "Perlu perbaikan": "r" };
const warnaBayar = { Lunas: "g", Menunggu: "", Belum: "n" };

export default async function DataCalonSiswaPage() {
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
      <AdminSidebar aktif="data" nama={session.nama} />

      <main className="ad-main">
        <AdminHeader
          judul="Data calon siswa"
          deskripsi="Pendaftar baru muncul otomatis di daftar ini."
        />

        <div className="ad-toolbar">
          <input
            className="ad-input grow"
            placeholder="Cari nama, NISN, atau nomor pendaftaran"
            aria-label="Cari calon siswa"
          />
          <select className="ad-input" aria-label="Filter jurusan">
            <option>Semua jurusan</option>
            <option>PPLG</option>
            <option>MPLB</option>
            <option>DKV</option>
            <option>TJKT</option>
            <option>PM</option>
            <option>PH</option>
          </select>
          <select className="ad-input" aria-label="Filter status">
            <option>Semua status</option>
            <option>Menunggu</option>
            <option>Terverifikasi</option>
            <option>Perlu perbaikan</option>
          </select>
          <button type="button" className="ad-btn outline">
            Ekspor Excel
          </button>
        </div>

        <div className="ad-banner">
          <span>
            <b>3 pendaftar baru</b> masuk sejak 07.05
          </span>
          <button type="button" className="ad-btn sm">
            Tampilkan
          </button>
        </div>

        <div className="ad-tablecard">
          <table className="ad-table">
            <thead>
              <tr>
                <th>Calon siswa</th>
                <th>Jurusan</th>
                <th>Berkas</th>
                <th>Bayar</th>
                <th>Tes TPA</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {calonSiswa.map((c) => (
                <tr key={c.nomor} className={c.baru ? "baru" : ""}>
                  <td>
                    <div className="ad-name">
                      <b>{c.nama}</b>{" "}
                      {c.baru && <span className="ad-chip g">Baru</span>}
                      <small>{c.nomor}</small>
                    </div>
                  </td>
                  <td>{c.jurusan}</td>
                  <td>
                    <span className={`ad-chip ${warnaBerkas[c.berkas]}`}>{c.berkas}</span>
                  </td>
                  <td>
                    <span className={`ad-chip ${warnaBayar[c.bayar]}`}>{c.bayar}</span>
                  </td>
                  <td>
                    <span className={`ad-chip ${c.tes === "Belum" ? "n" : "g"}`}>{c.tes}</span>
                  </td>
                  <td>
                    <span className="ad-link">Detail</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ad-pager">
            <span>Menampilkan 1 sampai 7 dari 544 pendaftar</span>
            <div className="ad-side-by">
              <button type="button" className="ad-btn outline sm">
                Sebelumnya
              </button>
              <button type="button" className="ad-btn sm">
                Berikutnya
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}