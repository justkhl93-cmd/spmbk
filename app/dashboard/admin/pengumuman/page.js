import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession, dashboardPath } from "@/lib/auth";
import AdminSidebar from "../AdminSidebar";
import AdminTopbar from "../AdminTopbar";
import "../admin.css";

const riwayat = [
  { judul: "Jadwal wawancara gelombang 1", tanggal: "20 Nov 2026" },
  { judul: "Perpanjangan batas unggah berkas", tanggal: "5 Des 2026" },
  { judul: "Pembukaan gelombang 2", tanggal: "15 Des 2026" },
];

export default async function PengumumanPage() {
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
      <AdminSidebar aktif="pengumuman" />

            <main className="ad-main">
        <AdminTopbar nama={session.nama} />
        <section className="ad-top">
          <h1>Pengumuman</h1>
          <p>Kelola informasi yang dikirim ke calon siswa.</p>
        </section>

        <section className="ad-card">
          <h2>Buat pengumuman baru</h2>
                    <button type="button" className="btn solid">
            <span className="btn-plus">+</span>Pengumuman baru
          </button>
        </section>

        <section className="ad-card">
          <h2>Riwayat pengumuman</h2>
          {riwayat.map((r) => (
            <div key={r.judul} className="ad-row">
              <div>
                <b>{r.judul}</b>
                <small>{r.tanggal}</small>
              </div>
              <button type="button" className="btn outline">Edit</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}