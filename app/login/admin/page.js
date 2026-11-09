'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '../../auth-admin.css';

export default function LoginAdmin() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [sandi, setSandi] = useState('');
  const [lihat, setLihat] = useState(false);
  const [error, setError] = useState('');

  function kirim(e) {
    e.preventDefault();
    if (!user.trim() || !sandi) {
      setError('Isi email/username dan kata sandi.');
      return;
    }
    // SEMENTARA: langsung masuk ke dashboard.
    // Nanti diganti dengan pengecekan ke database.
    router.push('/dashboard/admin');
  }

  return (
    <main className="aa">
      <div className="aa-photo" style={{ backgroundImage: 'url(/asset/login-bg.jpg)' }}>
        <div className="aa-cap">
          <img src="/asset/logo.png" alt="Logo SMK Citra Negara" />
          <b>Portal SPMB</b>
          <span>SMK Citra Negara</span>
        </div>
        <div className="aa-msg">
          <h2>Kelola penerimaan<br />murid baru dengan mudah.</h2>
          <p>Masuk untuk membuka dashboard Admin.</p>
        </div>
      </div>

      <div className="aa-side">
        <form className="aa-card" onSubmit={kirim} noValidate>
          <span className="aa-chip">ADMIN SPMB</span>
          <h1>Masuk sebagai Admin</h1>
          <p className="aa-muted">Gunakan email atau username admin yang terdaftar.</p>

          <label>
            <span>Email / Username</span>
            <div className="aa-inp">
              <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="admin@citranegara.sch.id" />
            </div>
          </label>

          <label>
            <span>Kata Sandi</span>
            <div className="aa-inp">
              <input type={lihat ? 'text' : 'password'} value={sandi} onChange={(e) => setSandi(e.target.value)} placeholder="••••••••" />
              <button type="button" onClick={() => setLihat(!lihat)}>{lihat ? 'Sembunyikan' : 'Tampilkan'}</button>
            </div>
          </label>

          <a className="aa-lupa" href="#">Lupa Kata Sandi?</a>
          {error && <span className="aa-err">{error}</span>}
          <button className="aa-btn">Masuk</button>
          <p className="aa-foot">Belum punya akun? <Link href="/admin-register">Daftar</Link></p>
        </form>
      </div>
    </main>
  );
}