import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Portal SPMB – SMK Citra Negara",
  description: "Sistem penerimaan siswa baru SMK Citra Negara",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={jakarta.className}>{children}</body>
    </html>
  );
}