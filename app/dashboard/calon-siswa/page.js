import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession, dashboardPath } from "@/lib/auth";
import "./dashboard-siswa.css";

const menu = [
  { ikon: "🏠", nama: "Dashboard", aktif: true },
  { ikon: "👤", nama: "Profil Saya" },
  { ikon: "🧩", nama: "Tes TPA" },
  { ikon: "📄", nama: "Dokumen" },
  { ikon: "🛡️", nama: "Verifikasi" },
  { ikon: "❓", nama: "Bantuan" },
  { ikon: "💳", nama: "Pembayaran" },
];

const langkah = [
  { nama: "Registrasi", status: "selesai", teks: "Selesai" },
  { nama: "Lengkapi Profil", status: "aktif", teks: "Sedang diisi" },
  { nama: "Pilih Jurusan", status: "", teks: "Belum dimulai" },
  { nama: "Tes TPA", status: "", teks: "Belum dimulai" },
  { nama: "Verifikasi", status: "", teks: "Belum dimulai" },
  { nama: "Pembayaran", status: "", teks: "Belum dimulai" },
];

const jadwal = [
  { tgl: "1 Nov", judul: "Pendaftaran dibuka", ket: "Gelombang 1" },
  { tgl: "15 Des", judul: "Pendaftaran dibuka", ket: "Gelombang 2" },
  { tgl: "24 Jan", judul: "Pengumuman hasil", ket: "Lewat portal ini" },
];

const syarat = [
  "Ijazah atau SKL SMP/MTs",
  "Kartu Keluarga",
  "Akta Kelahiran",
  "Pas Foto 3×4",
];

const jurusan = [
  {
    nama: "Pengembangan Perangkat Lunak dan Gim",
    deskripsi: "Belajar membuat aplikasi dan web lewat proyek nyata.",
    gambar: "/asset/jurusan-pplg.png",
    warna: "hijau",
  },
  {
    nama: "Manajemen Perkantoran dan Layanan Bisnis",
    deskripsi: "Belajar administrasi kantor dan bisnis modern lewat proyek nyata.",
    gambar: "/asset/jurusan-mplb.png",
    warna: "kuning",
  },
];

function inisial(nama) {
  return nama
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((k) => k[0].toUpperCase())
    .join("");
}

export default async function DashboardCalonSiswaPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("spmb_session")?.value;
  const session = await getSession(token);

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "calon_siswa") {
    redirect(dashboardPath(session.role));
  }

  return (
    <div className="ds">
      <aside className="ds-side">
        <div className="ds-brand">
          <img src="/asset/logo.png" alt="Logo SMK Citra Negara" />
          <div>
            <b>SMK Citra Negara</b>
            <span>Portal SPMB</span>
          </div>
        </div>

        <nav className="ds-nav">
          {menu.map((m) => (
            <a key={m.nama} href="#" className={m.aktif ? "active" : ""}>
              <span>{m.ikon}</span>
              {m.nama}
            </a>
          ))}
        </nav>

        <div className="ds-user">
          <div className="ds-avatar">{inisial(session.nama)}</div>
          <div>
            <b>{session.nama}</b>
            <span>Calon Siswa</span>
          </div>
        </div>
      </aside>

      <main className="ds-main">
        <section className="ds-banner">
          <h1>Halo, {session.nama}! Selamat Datang di Portal SPMB</h1>
          <p>Lengkapi profilmu untuk lanjut ke pemilihan jurusan.</p>
        </section>

        <section className="ds-stats">
          <div className="ds-card ds-stat">
            <div className="ds-ico hijau">✓</div>
            <div>
              <big>2 / 6</big>
              <b>Langkah selesai</b>
              <span>Lengkapi profil berikutnya</span>
            </div>
          </div>
          <div className="ds-card ds-stat">
            <div className="ds-ico kuning">📋</div>
            <div>
              <big>0 / 4</big>
              <b>Dokumen diunggah</b>
              <span>Ijazah, KK, Akta, Pas Foto</span>
            </div>
          </div>
          <div className="ds-card ds-stat">
            <div className="ds-ico biru">🕒</div>
            <div>
              <big>1 Nov</big>
              <b>Pendaftaran dibuka</b>
              <span>Gelombang 1</span>
            </div>
          </div>
        </section>

        <div className="ds-grid">
          <div className="ds-col">
            <section className="ds-card">
              <div className="ds-head">
                <h2>Status Pendaftaran</h2>
                <span>Langkah 2 dari 6</span>
              </div>
              <div className="ds-steps">
                {langkah.map((l, i) => (
                  <div key={l.nama} className={`ds-step ${l.status}`}>
                    <div className="no">{l.status === "selesai" ? "✓" : i + 1}</div>
                    <b>{l.nama}</b>
                    <span>{l.teks}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="ds-card">
              <div className="ds-head">
                <h2>Jelajahi Jurusan</h2>
                <a href="#">Lihat semua</a>
              </div>
              <div className="ds-jurusan">
                {jurusan.map((j) => (
                  <div key={j.nama} className="ds-jcard">
                    <div className={`ds-jimg ${j.warna}`}>
                      <img src={j.gambar} alt={j.nama} />
                    </div>
                    <div className="ds-jbody">
                      <h3>{j.nama}</h3>
                      <p>{j.deskripsi}</p>
                      <div className="ds-kuota">Kuota 70 siswa</div>
                      <a href="#" className="ds-btn">Lihat detail</a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="ds-col">
            <section className="ds-card">
              <div className="ds-head">
                <h2>Jadwal Penting</h2>
              </div>
              <div className="ds-jadwal">
                {jadwal.map((j) => (
                  <div key={j.tgl} className="ds-jrow">
                    <b>{j.tgl}</b>
                    <div>
                      <strong>{j.judul}</strong>
                      <span>{j.ket}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="ds-card">
              <div className="ds-head">
                <h2>Syarat &amp; Dokumen</h2>
              </div>
              <ul className="ds-syarat">
                {syarat.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <a href="#" className="ds-btn">Unggah Dokumen</a>
            </section>

            <section className="ds-bantuan">
              <div>
                <b>Butuh bantuan?</b>
                <span>Hubungi panitia SPMB</span>
              </div>
              <a href="#">Bantuan</a>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}