export const metadata = { title: "Events · MitzvahJoy" };

export default function EventsPage() {
  return (
    <main>
      <h1>Events</h1>
      <p>This is a placeholder list of events.</p>
      <ul>
        <li><a href="/events/1">Ethan’s Bar Mitzvah</a></li>
        <li><a href="/events/2">Maya’s Bat Mitzvah</a></li>
      </ul>

      <p style={{ marginTop: 16 }}>
        <a className="button" href="/events/new">Create a new event</a>
      </p>
    </main>
  );
}
