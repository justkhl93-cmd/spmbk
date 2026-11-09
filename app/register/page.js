"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      router.push("/login");
    } else {
      alert(data.message);
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: "40px auto", padding: 16 }}>
      <h1>Daftar Calon Siswa</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={{ display: "block", width: "100%", padding: 8 }}
            required
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", width: "100%", padding: 8 }}
            required
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: "block", width: "100%", padding: 8 }}
            required
          />
        </div>

        <button type="submit" style={{ padding: "8px 16px" }}>
          Daftar
        </button>
      </form>
    </main>
  );
}