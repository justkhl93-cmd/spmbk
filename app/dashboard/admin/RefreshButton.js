"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function jamSekarang() {
  return new Date()
    .toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    .replace(":", ".");
}

export default function RefreshButton() {
  const router = useRouter();
  const [waktu, setWaktu] = useState("");
  const [memuat, setMemuat] = useState(false);

  useEffect(() => {
    setWaktu(jamSekarang());
  }, []);

  function muatUlang() {
    setMemuat(true);
    router.refresh();

    setTimeout(() => {
      setWaktu(jamSekarang());
      setMemuat(false);
    }, 600);
  }

  return (
    <>
      <span className="ad-upd">{waktu && `Diperbarui ${waktu}`}</span>
      <button
        type="button"
        className="ad-btn outline"
        onClick={muatUlang}
        disabled={memuat}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 12a8 8 0 1 1-2.6-5.9" />
          <path d="M20 4v5h-5" />
        </svg>
        {memuat ? "Memuat..." : "Muat ulang"}
      </button>
    </>
  );
}