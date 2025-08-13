export default function Home() {
  return (
    <main style={{ padding: "56px 0" }}>
      <section style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, marginBottom: 12 }}>Celebrate a mitzvah, give with joy</h1>
        <p style={{ fontSize: 18, color: "#4b5563", marginBottom: 24 }}>
          Friends and family gift money in one place. 90% goes to the child, 10% goes to charity.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <a className="button" href="/events/new">Create an Event</a>
          <a className="button button-secondary" href="/events">Browse Events</a>
        </div>
        <p style={{ marginTop: 16, color: "#6b7280" }}>No fees to create. Share in seconds.</p>
      </section>
    </main>
  );
}
