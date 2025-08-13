import { getServerSession } from "next-auth";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <a className="brand" href="/"><img src="/logo.svg" width={24} height={24} alt="MitzvahJoy Logo" /> MitzvahJoy</a>
          <div style={{ flex: 1 }} />
          {session ? (
            <>
              <a href="/dashboard">Dashboard</a>
              <a href="/admin/charities">Admin</a>
              <a href="/api/auth/signout">Sign out</a>
            </>
          ) : (
            <a href="/signin">Sign in</a>
          )}
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
