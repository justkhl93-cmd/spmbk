import RefreshButton from "./RefreshButton";

export default function AdminHeader({ judul, deskripsi, children }) {
  return (
    <header className="ad-head">
      <div>
        <h1>{judul}</h1>
        <p>{deskripsi}</p>
      </div>

      <div className="ad-tools">
        {children}
        <RefreshButton />
      </div>
    </header>
  );
}