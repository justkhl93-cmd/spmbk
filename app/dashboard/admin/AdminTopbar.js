export default function AdminTopbar({ nama }) {
  const namaAdmin = nama || "Admin";
  const inisial = namaAdmin
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((k) => k[0].toUpperCase())
    .join("");

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        background: "#8ee88a",
        borderRadius: 0,
        borderBottom: "1px solid rgba(31,61,48,0.15)",
        padding: "14px 20px",
        margin: "-28px -20px 0",
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: 17, color: "#1f3d30" }}>
          Selamat datang kembali
        </h2>
        <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "#2f5a43" }}>
          Pantau dan kelola penerimaan murid baru hari ini.
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "#1f3d30",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {inisial}
        </div>
        <div style={{ lineHeight: 1.25 }}>
          <b style={{ display: "block", fontSize: 13, color: "#1f3d30" }}>
            {namaAdmin}
          </b>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#054a00",
              textTransform: "uppercase",
              letterSpacing: 0.4,
            }}
          >
            Admin SPMB
          </span>
        </div>
      </div>
    </header>
  );
}