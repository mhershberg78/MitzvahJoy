import Link from "next/link";

export default function Home() {
  return (
    <main className="container" style={{ padding: "2rem 0" }}>
      <section style={{ textAlign: "center", marginTop: 40 }}>
        <h1 style={{ fontSize: 36, lineHeight: 1.2, marginBottom: 12 }}>
          Welcome to MitzvahJoy 🎉
        </h1>
        <p style={{ color: "#6b7280", maxWidth: 680, margin: "0 auto 28px" }}>
          Easily gift money for bar/bat mitzvahs — <strong>90% to the child</strong>, <strong>10% to charity</strong>.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/dashboard" className="button">
            Go to Dashboard
          </Link>
          <Link href="/signin" className="button button-secondary">
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
