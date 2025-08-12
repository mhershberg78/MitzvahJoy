import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MitzvahJoy – Celebrate & Give",
  description: "Easily gift money for bar/bat mitzvahs – 90% to the child, 10% to charity.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: { url: "/favicon-180.png" },
  },
  openGraph: {
    title: "MitzvahJoy – Celebrate & Give",
    description: "Easily gift money for bar/bat mitzvahs – 90% to the child, 10% to charity.",
    url: "https://mitzvahjoy.com",
    siteName: "MitzvahJoy",
    images: [{ url: "/mitzvahjoy-og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MitzvahJoy – Celebrate & Give",
    description: "Easily gift money for bar/bat mitzvahs – 90% to the child, 10% to charity.",
    images: ["/mitzvahjoy-og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <Link className="brand" href="/">
            <img src="/logo.svg" width={24} height={24} alt="MitzvahJoy Logo" /> MitzvahJoy
          </Link>
          <div style={{ flex: 1 }} />
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin/charities">Admin</Link>
          <a href="/api/auth/signout">Sign out</a>
        </nav>

        <div className="container">{children}</div>

        <footer style={{ marginTop: 40, padding: 24, color: "#6b7280", textAlign: "center" }}>
          <span className="badge">90% to the child · 10% to charity</span>
          <div style={{ marginTop: 8 }}>
            <a href="/fees">Fees</a> · <a href="/terms">Terms</a> · <a href="/privacy">Privacy</a> ·{" "}
            <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
