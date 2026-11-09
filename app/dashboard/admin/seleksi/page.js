import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession, dashboardPath } from "@/lib/auth";
import AdminSidebar from "../AdminSidebar";
import AdminHeader from "../AdminHeader";
import "../admin.css";

const jurusan = ["PPLG", "MPLB", "DKV", "TJKT", "PM", "PH"];

const peringkat = [
  { no: 1, nama: "Hendra Wijaya", tpa: "96", rapor: "92,0", akhir: "94,4", hasil: "Diterima" },
  { no: 2, nama: "Aulia Rahma", tpa: "94", rapor: "94,5", akhir: "94,2", hasil: "Diterima" },
  { no: 3, nama: "Farhan Hidayat", tpa: "92", rapor: "91,0", akhir: "91,6", hasil: "Diterima" },
  { no: 4, nama: "Gita Maharani", tpa: "90", rapor: "93,0", akhir: "91,2", hasil: "Diterima" },
  { no: 5, nama: "Bagas Pratama", tpa: "88", rapor: "90,5", akhir: "89,0", hasil: "Diterima" },
  { no: 6, nama: "Citra Lestari", tpa: "85", rapor: "89,0", akhir: "86,6", hasil: "Dialihkan ke DKV" },
  { no: 7, nama: "Dimas Saputra", tpa: "80", rapor: "88,0", akhir: "83,2", hasil: "Dialihkan ke PM" },
];

export default async function SeleksiPage() {
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
      <AdminSidebar aktif="seleksi" nama={session.nama} />

      <main className="ad-main">
        <AdminHeader
          judul="Seleksi calon siswa"
          deskripsi="Tetapkan hasil: diterima di jurusan pilihan, atau dialihkan ke jurusan lain sesuai nilai."
        >
          <span className="ad-chip">Belum diumumkan</span>
        </AdminHeader>

        <div className="ad-toolbar">
          <div className="ad-side-by" style={{ flex: 1, flexWrap: "wrap" }}>
            {jurusan.map((j, i) => (
              <button
                key={j}
                type="button"
                className={`ad-btn sm ${i === 0 ? "" : "outline"}`}
              >
                {j}
              </button>
            ))}
          </div>
          <span className="ad-muted" style={{ fontSize: 14 }}>
            Bobot: TPA 60%, rapor 40% · Pengumuman 24 Jan 2027
          </span>
          <button type="button" className="ad-btn outline sm">
            Ubah
          </button>
        </div>

        <div className="ad-tablecard">
          <table className="ad-table">
            <thead>
              <tr>
                <th>Peringkat</th>
                <th>Calon siswa</th>
                <th>Skor TPA</th>
                <th>Rapor</th>
                <th>Skor akhir</th>
                <th>Hasil</th>
              </tr>
            </thead>
            <tbody>
              {peringkat.map((p) => (
                <tr key={p.no}>
                  <td>{p.no}</td>
                  <td>
                    <b>{p.nama}</b>
                  </td>
                  <td>{p.tpa}</td>
                  <td>{p.rapor}</td>
                  <td>
                    <b>{p.akhir}</b>
                  </td>
                  <td>
                    <span className={`ad-chip ${p.hasil === "Diterima" ? "g" : ""}`}>
                      {p.hasil} ▾
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ad-pager">
            <span>PPLG: 5 diterima, 2 dialihkan ke jurusan lain (contoh)</span>
            <div className="ad-side-by">
              <button type="button" className="ad-btn outline sm">
                Hitung peringkat
              </button>
              <button type="button" className="ad-btn sm">
                Tetapkan hasil
              </button>
              <button type="button" className="ad-btn sm">
                Umumkan hasil
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}