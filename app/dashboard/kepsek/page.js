import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession, dashboardPath } from "@/lib/auth";

export default async function DashboardKepsekPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("spmb_session")?.value;
  const session = await getSession(token);

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "kepsek") {
    redirect(dashboardPath(session.role));
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard Kepala Sekolah</h1>
      <p>Halo, {session.nama}.</p>
      <p>Lihat laporan, rekap pendaftar, dan hasil seleksi.</p>
    </main>
  );
}