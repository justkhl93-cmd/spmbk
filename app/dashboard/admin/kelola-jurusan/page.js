import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession, dashboardPath } from "@/lib/auth";
import AdminSidebar from "../AdminSidebar";
import AdminTopbar from "../AdminTopbar";
import "../admin.css";

const jurusan = [
  { nama: "Pengembangan Perangkat Lunak dan Gim", kode: "PPLG", kuota: 70, masuk: 118 },
  { nama: "Manajemen Perkantoran dan Layanan Bisnis", kode: "MPLB", kuota: 70, masuk: 130 },
  { nama: "Desain Komunikasi Visual", kode: "DKV", kuota: 70, masuk: 105 },
  { nama: "Teknik Jaringan Komputer dan Telekomunikasi", kode: "TJKT", kuota: 70, masuk: 120 },
  { nama: "Pemasaran", kode: "PM", kuota: 70, masuk: 90 },
  { nama: "Perhotelan", kode: "PH", kuota: 70, masuk: 60 },
];

export default async function KelolaJurusanPage() {
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
      <AdminSidebar aktif="jurusan" />

            <main className="ad-main">
        <AdminTopbar nama={session.nama} />
        <section className="ad-top">
          <h1>Kelola Jurusan</h1>
          <p>Atur kuota dan informasi jurusan yang dibuka.</p>
        </section>

        <div className="ad-jgrid">
          {jurusan.map((j) => {
            const penuh = j.masuk >= j.kuota;
            return (
              <section key={j.kode} className="ad-jcard">
                <h2>{j.nama}</h2>
                <div className="ad-jkode">Kode: {j.kode}</div>

                <div className="ad-jbaris">
                  <span>Kuota</span>
                  <b>{j.kuota}</b>
                </div>

                <div className="ad-jlabel">Pendaftar masuk</div>
                <div className="ad-jmasuk">
                  <b>{j.masuk}</b>
                  <span className={`ad-badge ${penuh ? "penuh" : "tersedia"}`}>
                    {penuh ? "Penuh" : "Tersedia"}
                  </span>
                </div>

                <div className="ad-jtombol">
                  <button type="button" className="btn solid">Edit kuota</button>
                  <button type="button" className="btn outline">Lihat pendaftar</button>
                </div>
              </section>
            );
          })}
        </div>

        <section className="ad-card">
          <h2>Tambah jurusan baru</h2>
          <button type="button" className="btn solid">
            <span className="btn-plus">+</span>Tambah jurusan
          </button>
        </section>
      </main>
    </div>
  );
}