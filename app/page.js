"use client";
import { useState } from "react";
import Link from "next/link";

const stats = [["6", "Jurusan keahlian"], ["3 Thn", "Masa belajar"], ["1 Nov", "Gelombang 1 dibuka"], ["24 Jam", "Pendaftaran online"]];
const steps = [
  ["Buat Akun", "Daftar dengan NISN, tanggal lahir, dan kata sandi pilihanmu."],
  ["Lengkapi Profil", "Isi data diri, data orang tua, dan pilih jurusan yang diminati."],
  ["Unggah Berkas", "Unggah dokumen persyaratan lalu lakukan pembayaran."],
  ["Tes dan Pengumuman", "Ikuti tes TPA dan wawancara, lalu pantau hasil di portal."],
];
const docs = ["Ijazah / SKL SMP–MTs", "Kartu Keluarga", "Akta Kelahiran", "Pas Foto 3×4", "Rapor Semester 1–5"];
const jurusan = [
  ["pplg", "PPLG", "Pengembangan Perangkat Lunak dan Gim", "Belajar membuat aplikasi web, mobile, dan gim dasar.", ["Pemrograman web dan mobile", "Basis data", "Pengembangan gim"], "Programmer, web developer, game developer."],
  ["dkv", "DKV", "Desain Komunikasi Visual", "Belajar mengolah ide jadi karya visual yang menarik.", ["Desain grafis dan ilustrasi", "Fotografi dan videografi", "Animasi dan branding"], "Desainer grafis, editor video, ilustrator."],
  ["tjkt", "TJKT", "Teknik Jaringan Komputer dan Telekomunikasi", "Belajar membangun dan menjaga jaringan komputer.", ["Jaringan komputer", "Administrasi server", "Keamanan jaringan"], "Network engineer, teknisi jaringan, admin server."],
  ["pm", "PM", "Pemasaran", "Belajar menjual produk dan mengelola bisnis dengan strategi.", ["Pemasaran digital", "Teknik penjualan", "Kewirausahaan"], "Digital marketer, sales, wirausahawan."],
  ["perhotelan", "Perhotelan", "Akomodasi dan layanan hotel", "Belajar melayani tamu dengan standar industri perhotelan.", ["Front office", "Tata graha dan tata boga", "Pelayanan tamu"], "Resepsionis, staf restoran, staf hotel."],
  ["mplb", "MPLB", "Manajemen Perkantoran dan Layanan Bisnis", "Belajar mengelola administrasi dan melayani pelanggan.", ["Administrasi perkantoran", "Kearsipan digital", "Layanan pelanggan"], "Sekretaris, staf administrasi, customer service."],
];
const jadwal = [
  ["1", "Nov", "Pendaftaran Dibuka", "Gelombang 1 mulai diterima"],
  ["16", "Des", "Pendaftaran Ditutup", "Batas akhir gelombang 1"],
  ["10", "Jan", "Tes & Wawancara", "Tes TPA dan wawancara di sekolah"],
  ["24", "Jan", "Pengumuman Hasil", "Diumumkan lewat portal ini."],
];
const faq = [
  { q: "Dokumen apa saja yang harus diunggah?", a: "Ijazah atau surat keterangan lulus, kartu keluarga, akta kelahiran, dan pas foto terbaru berlatar merah ukuran 3×4." },
  { q: "Bagaimana jika saya salah mengisi data?", a: "Data profil masih bisa diubah selama pendaftaran belum ditutup. Masuk ke akunmu, buka Lengkapi Profil, lalu perbarui isiannya." },
  { q: "Kapan saya bisa melihat hasil seleksi?", a: "Hasil diumumkan pada 24 Januari lewat portal ini. Masuk ke akunmu untuk melihatnya." },
  { q: "Apakah ada biaya pendaftaran?", a: "Informasi biaya mengikuti ketentuan resmi sekolah. Hubungi kontak di samping untuk kepastian." },
  { q: "Bisakah saya mengubah jurusan pilihan?", a: "Jurusan pilihan bisa diubah selama pendaftaran masih dibuka, lewat menu Lengkapi Profil." },
];
const kontak = [["telepon", "Telepon", "(0251) 123–4567"], ["chat", "Live Chat", "Senin–Jumat, 08.00–16.00"], ["email", "Email", "spmb@citranegara.sch.id"]];
const nav = [["Beranda", "#beranda"], ["Jurusan", "#jurusan"], ["Jadwal", "#jadwal"], ["Bantuan", "#bantuan"]];

export default function Home() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <header className="nav">
        <div className="wrap">
          <Link href="/" className="brand">
            <img src="/asset/logo.png" alt="Logo SMK Citra Negara" />
            <span>Sistem penerimaan siswa baru<br />SMK Citra Negara</span>
          </Link>
          <nav className="links">{nav.map(([t, h]) => <a key={t} href={h}>{t}</a>)}</nav>
          <Link href="/login" className="btn-login">Masuk</Link>
        </div>
      </header>

      <section id="beranda" className="hero">
        <div className="wrap">
          <h1>Selamat Datang di<br />SMK CITRA NEGARA</h1>
          <p>Daftar sebagai murid baru secara online — isi data, unggah berkas, dan pantau hasil seleksi kapan saja.</p>
          <Link href="/register" className="btn-hero">Daftar Sekarang</Link>
          <div className="stats">
            {stats.map(([n, l]) => <div key={l} className="stat"><b>{n}</b><span>{l}</span></div>)}
          </div>
        </div>
      </section>

      <section className="alur">
        <div className="wrap">
          <h2 className="h2 center">Alur Pendaftaran</h2>
          <p className="sub center">Ikuti empat langkah mudah berikut untuk menjadi murid baru SMK Citra Negara.</p>
          <div className="grid g4">
            {steps.map(([t, d], i) => (
              <div key={t} className="card"><span className="badge">{i + 1}</span><b className="t">{t}</b><p className="muted">{d}</p></div>
            ))}
          </div>
          <div className="card docs">
            <div>
              <b>Dokumen yang perlu disiapkan</b>
              <p className="muted">Unggah dalam format PDF atau JPG, maksimal 2 MB per berkas.</p>
              <div className="chips">{docs.map((d) => <span key={d} className="chip">{d}</span>)}</div>
            </div>
            <Link href="/register" className="btn-dark">Mulai Daftar</Link>
          </div>
        </div>
      </section>

      <section id="jurusan" className="jurusan">
        <div className="wrap">
          <h2 className="h2">Pilih jurusanmu</h2>
          <p style={{ maxWidth: 520, marginTop: 12 }}>Enam jurusan dengan prospek kerja dan kuliah yang jelas. Kenali apa yang dipelajari sebelum memilih.</p>
          <div className="grid g3">
            {jurusan.map(([slug, kode, nama, desc, belajar, karier]) => (
              <article key={slug} className="card">
                <img src={`/asset/jurusan-${slug}.png`} alt={`Logo ${kode}`} />
                <h3>{kode}</h3>
                <p className="nama">{nama}</p>
                <p className="muted">{desc}</p>
                <b className="lbl">Yang dipelajari</b>
                <ul>{belajar.map((b) => <li key={b}>{b}</li>)}</ul>
                <b className="lbl">Prospek karier</b>
                <p className="muted" style={{ marginTop: 4 }}>{karier}</p>
                <Link href="#" className="detail">Lihat detail jurusan</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="jadwal" className="jadwal">
        <div className="wrap">
          <h2 className="h2 center">Jadwal Penting Pendaftaran</h2>
          <p className="sub center">Catat tanggal-tanggal berikut agar tidak ketinggalan setiap tahap SPMB.</p>
          <div className="grid g4">
            {jadwal.map(([tgl, bln, t, d]) => (
              <div key={t} className="card">
                <span className="tgl"><b>{tgl}</b><span>{bln}</span></span>
                <b style={{ display: "block", marginTop: 8, fontSize: 14 }}>{t}</b>
                <p className="muted" style={{ marginTop: 4 }}>{d}</p>
              </div>
            ))}
          </div>
          <p className="note">Jadwal dapat berubah sewaktu-waktu. Pantau pengumuman resmi di portal ini.</p>
        </div>
      </section>

      <section id="bantuan" className="bantuan">
        <div className="wrap">
          <h2 className="h2 center">Butuh Bantuan?</h2>
          <p className="sub center">Tim kami siap membantu proses pendaftaranmu.</p>
          <div className="help">
            <div className="faq">
              {faq.map((it, i) => (
                <div key={it.q} className="faq-item">
                  <button className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                    {it.q}<span>{open === i ? "−" : "+"}</span>
                  </button>
                  {open === i && <p className="faq-a">{it.a}</p>}
                </div>
              ))}
            </div>
            <div className="kontak">
              {kontak.map(([ic, t, v]) => (
                <div key={t} className="card">
                  <img src={`/icon/${ic}.svg`} alt="" /><b>{t}</b><p className="muted" style={{ marginTop: 2 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <div className="f-grid">
            <div>
              <div className="f-brand"><img src="/asset/logo.png" alt="" /><div><b>SMK Citra Negara</b><br /><span style={{ fontSize: 12 }}>Portal SPMB</span></div></div>
              <p>Sistem penerimaan murid baru online SMK Citra Negara. Daftar, unggah berkas, dan pantau hasil seleksi dengan mudah.</p>
            </div>
            <div><b>Tautan</b><ul>{nav.map(([t, h]) => <li key={t}><a href={h}>{t}</a></li>)}</ul></div>
            <div><b>Kontak</b><ul><li>(0251) 123–4567</li><li>spmb@citranegara.sch.id</li><li>Senin–Jumat, 08.00–16.00</li></ul></div>
          </div>
          <div className="copy"><span>© 2026 SMK Citra Negara — Portal SPMB</span><span>Tahun Ajaran 2026/2027</span></div>
        </div>
      </footer>
    </>
  );
}